<template>
  <div class="flex gap-1 text-xs">
    <template v-for="(d, i) in date_arr">
      <tippy class="flex-1" :key="i" arrow>
        <template v-slot:trigger>
          <div
            class="h-8 flex-1 text-center cursor-pointer rounded-sm"
            :class="{
              'bg-red-600': d.down > d.up,
              'bg-green-400': d.down <= d.up,
            }"
          ></div>
        </template>
        <div class="text-left text-xs">
          <div class="font-bold">{{ d.title }}</div>
          <div>{{ d.up }} reports up</div>
          <div>{{ d.down }} reports down</div>
        </div>
      </tippy>
    </template>
  </div>
</template>

<script>
export default {
  name: "CalendarChart",
  props: {
    results: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      date_arr: {}
    }
  },
  methods: {
    init() {
      let fr = new Date()
      fr.setZero()
      fr.setMonth(fr.getMonth() - 1)
      const to = new Date()
      to.setZero()
      let date_arr = {}
      while (fr.getTime() < to.getTime()) {
        fr = fr.addDays(1)
        date_arr[fr.normalize()] = {
          title: fr.str(),
          up: 0,
          down: 0
        }
      }
      this.date_arr = date_arr;
      this.results.forEach(item => {
        const d = new Date(item.created)
        if (!date_arr[d.normalize()]) {
          date_arr[d.normalize()] = {
            title: d.str(),
            up: 0,
            down: 0
          }
        }
        if (item.is_down) {
          date_arr[d.normalize()].down = date_arr[d.normalize()].down + 1
        } else {
          date_arr[d.normalize()].up = date_arr[d.normalize()].up + 1
        }
      })
    },
  },
  watch: {
    "results"() {
      this.init()
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped>

</style>
