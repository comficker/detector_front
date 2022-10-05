<template>
  <div v-if="instance" class="space-y-8 py-4 md:py-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-5xl text-green-900 font-extrabold">Is {{ instance.name }} Down?</h1>
      <p class="text-xl text-gray-400"><b>Yes</b>, current {{ instance.name }} status is
        <span
          class="text-green-500 font-bold"
          :class="{'text-red-500': instance.is_down}"
        >{{ instance.is_down ? 'down' : 'up' }}</span>!
      </p>
    </div>
    <div class="max-w-2xl mx-auto space-y-3">
      <div class="border-2 bg-white shadow-sm rounded">
        <div class="p-3 border-b-2 bg-gray-50 text-xs uppercase font-bold">{{ instance.name }} status history</div>
        <div class="grid md:grid-cols-2 md:divide-x-2 border-b-2">
          <div class="p-3 space-y-3">
            <div class="text-xs">Last 30 days status: 0.0% up</div>
            <client-only>
              <calendar-chart :rp="instance.rp || {}"/>
            </client-only>
          </div>
          <div class="p-3 space-y-3">
            <div class="text-xs">Is {{ instance.name }} down for everyone or just me?</div>
            <div class="text-2xl uppercase">
              <b>{{ today.down.toLocaleString() }} / {{ (today.down + today.up).toLocaleString() }}</b>
              <span class="text-gray-500">said down</span>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 text-center font-bold">
          <div class="p-3">
            <ShareNetwork
              class="block cursor-pointer w-full p-2 bg-blue-500 rounded text-white"
              network="facebook"
              :url="social.url"
              :title="social.title"
              :description="social.desc"
              :quote="social.quote"
              :hashtags="social.tags"
            >
              Share on facebook
            </ShareNetwork>
          </div>
          <div class="p-3">
            <ShareNetwork
              class="block cursor-pointer w-full p-2 bg-blue-400 rounded text-white"
              network="twitter"
              :url="social.url"
              :title="social.title"
              :description="social.desc"
              :quote="social.quote"
              :hashtags="social.tags"
            >
              Share on twitter
            </ShareNetwork>
          </div>
        </div>
      </div>
      <p class="text-sm text-gray-400">{{ instance.desc }}</p>
      <div class="space-y-2">
        <h2 class="flex items-center text-stone-700">
          <svg
            xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span class="text-xs uppercase font-bold">Check also</span>
        </h2>
        <div class="flex gap-1.5 flex-wrap text-green-700">
          <nuxt-link
            v-for="item in res.results"
            :key="item.id"
            class="flex items-center py-1"
            :to="`/${item.id_string}`"
          >
            <img
              class="w-3 h-3"
              :src="item.external_ico"
              alt=""
            >
            <div class="px-2 font-bold">
              <span>{{ item.name }}</span>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="max-w-2xl mx-auto">
      <comment-box :instance="instance" :results="results" @load="handleLoad"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    const fr = new Date()
    const to = new Date()
    fr.setMonth(to.getMonth() - 1)
    fr.setZero()
    to.setZero()
    return {
      fr,
      to,
      instance: null,
      results: [],
      query: {
        page: 1,
        instance__id_string: this.$route.params.page,
        page_size: 5,
        created_after: fr.normalize(),
        created_before: to.normalize()
      },
      now: new Date(),
      today: {
        up: 0,
        down: 0
      },
      res: {
        results: [],
        count: 0
      }
    }
  },
  async fetch() {
    const res = await Promise.all([
      this.$axios.$get(`/app/instances/${this.$route.params.page}/`)
    ])
    this.instance = res[0]
    if (this.instance.rp && this.instance.rp[this.now.normalize()]) {
      this.today = this.instance.rp[this.now.normalize()]
    }
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.desc,
        },
        {
          property: 'og:title',
          hid: 'og:title',
          name: 'og:title',
          content: this.meta.title,
        },
        {
          property: 'og:description',
          hid: 'og:description',
          name: 'og:description',
          content: this.meta.desc,
        },
      ]
    }
  },
  computed: {
    meta() {
      if (!this.instance) return {}
      return {
        title: `Is ${this.instance.name} down? Check ${this.instance.name} outage.`,
        desc: `Is ${this.instance.name} down right now? Check whether ${this.instance.name} is down right now for everyone or just for you.`
      }
    },
    social() {
      return {
        title: this.meta.title,
        desc: this.meta.desc,
        quote: this.instance?.desc,
        url: `https://issomethingdown.com/${this.instance?.id_string}`,
        tags: `${this.instance?.name},Outage`
      }
    }
  },
  methods: {
    async handleLoad(page) {
      if (!page) {
        this.query.page = this.query.page + 1
      }
      this.results = await this.$axios.$get(`/app/reports/`, {
        params: this.query
      })
    },
    async clientFetch() {
      const res = await Promise.all([
        this.$axios.$get(`/app/reports/`, {
          params: this.query
        }).then(res => res.results),
        this.$axios.$get(`/app/instances/`, {
          params: {
            // related: this.$route.params.page,
            page_size: 5
          }
        }),
      ])
      this.results = res[0]
      this.res = res[1]
    }
  },
  mounted() {
    this.clientFetch()
  }
}
</script>

<style scoped>

</style>
