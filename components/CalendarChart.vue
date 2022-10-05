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
          <div class="font-bold">{{ d.date }}</div>
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
    rp: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      date_arr: []
    }
  },
  methods: {
    init() {
      let fr = new Date()
      fr.setZero()
      fr.setMonth(fr.getMonth() - 1)
      const to = new Date()
      to.setZero()
      let date_arr = []
      while (fr.getTime() < to.getTime()) {
        fr = fr.addDays(1)
        date_arr.push(this.rp[fr.normalize()] ? this.rp[fr.normalize()]: {d: fr.normalize(), up: 0, down: 0})
      }
      this.date_arr = date_arr;
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
