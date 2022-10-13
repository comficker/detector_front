<template>
  <div class="max-w-2xl mx-auto md:flex gap-4 py-4 md:py-6">
    <div class="space-y-4">
      <div class="flex space-x-3 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
        <div>
          <h1 class="text-xl text-green-900 font-extrabold leading-none">Is <span class="text-red-500">something</span> down?</h1>
        </div>
      </div>
      <div class="border space-y-3 bg-white shadow-sm rounded">
        <div class="p-3 border-b">
          <div class="border p-4 flex space-x-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              class="w-full outline-none text-xl"
              placeholder="Something"
            >
          </div>
        </div>
        <div class="px-3">
          <h2 class="flex items-center text-stone-700">
            <svg
              xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <span class="text-xs uppercase font-bold">Recent</span>
          </h2>
        </div>
        <div class="px-3 pb-3 grid grid-cols-2 md:grid-cols-3 text-green-700">
          <nuxt-link
            v-for="item in r1.results"
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
      <div class="py-3 border space-y-3 bg-white shadow-sm rounded">
        <div class="px-3">
          <h2 class="flex items-center text-stone-700">
            <svg
              xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <span class="text-xs uppercase font-bold">Popular</span>
          </h2>
        </div>
        <div class="px-3 grid grid-cols-2 md:grid-cols-3 text-green-700">
          <nuxt-link
            v-for="item in r2.results"
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
      <div class="py-3 border space-y-3 bg-white shadow-sm rounded">
        <div class="px-3">
          <h2 class="flex items-center text-stone-700">
            <svg
              xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <span class="text-xs uppercase font-bold">New</span>
          </h2>
        </div>
        <div class="px-3 grid grid-cols-2 md:grid-cols-3 text-green-700">
          <nuxt-link
            v-for="item in r3.results"
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
      <p class="italic text-sm">Is something down? Check whether any service is down right now or having outage problems for everyone or just for you.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      r1: {
        results: [],
        count: 0
      },
      r2: {
        results: [],
        count: 0
      },
      r3: {
        results: [],
        count: 0
      }
    }
  },
  async fetch() {
    const r = await Promise.all([
      this.$axios.$get('/app/instances/', {
        params: {
          page_size: 12,
          ordering: '-last_check'
        }
      }),
      this.$axios.$get('/app/instances/', {
        params: {
          page_size: 12,
          ordering: '-today_report'
        }
      }),
      this.$axios.$get('/app/instances/', {
        params: {
          page_size: 12,
          ordering: 'created'
        }
      })
    ])
    this.r1 = r[0]
    this.r2 = r[1]
    this.r3 = r[2]
  }
}
</script>
