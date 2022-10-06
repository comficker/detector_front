<template>
  <div class="space-y-3">
    <div class="flex text-xs uppercase font-bold gap-1 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <div class="">Community feedback on {{ instance?.name || 'Something' }}'s status</div>
    </div>
    <div class="space-y-1.5">
      <textarea
        v-model="content"
        placeholder="I had an issue!"
        class="p-3 text-sm border rounded w-full shadow-inner"
      />
      <div class="md:flex justify-between font-bold">
        <div class="flex space-x-3">
          <div class="flex justify-center space-x-1 items-center text-xs">
            <button
              class="bg-green-500 relative outline-none inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-lg cursor-pointer transition-colors ease-in-out duration-200"
              :class="{ 'bg-gray-300': !is_down }"
              @click="is_down = !is_down"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none inline-block h-5 w-5 rounded-md bg-white shadow transform ring-0 transition ease-in-out duration-200"
                :class="{'translate-x-5': is_down, 'translate-x-0': !is_down}"
              ></span>
            </button>
            <div class="rounded-full cursor-pointer">
              <span>Current down</span>
            </div>
          </div>
        </div>
        <div class="flex space-x-3 justify-between">
          <div class="flex justify-center space-x-1 items-center text-xs">
            <button
              class="bg-green-500 relative outline-none inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-lg cursor-pointer transition-colors ease-in-out duration-200"
              :class="{ 'bg-gray-300': !hasLocate }"
              @click="getLocate"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none inline-block h-5 w-5 rounded-md bg-white shadow transform ring-0 transition ease-in-out duration-200"
                :class="{'translate-x-5': hasLocate, 'translate-x-0': !hasLocate}"
              ></span>
            </button>
            <div class="rounded-full cursor-pointer">
              <span>Share location</span>
            </div>
          </div>
          <div class="cursor-pointer px-6 text-xs p-2 bg-green-500 rounded-full text-white font-bold" @click="send">Send
            report
          </div>
        </div>
      </div>
    </div>
    <div class="flow-root space-y-4">
      <ul role="list">
        <li v-for="(item, i) in results" :key="item.id">
          <div class="relative pb-6">
            <span
              v-if="i < results.length - 1"
              class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div class="relative flex items-start space-x-3">
              <div>
                <div class="relative px-1">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                    <svg
                      class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor" aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                        clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 py-1.5 text-xs">
                <div class=" text-gray-500">
                  <span class="font-medium text-gray-900">{{ item.user?.username || 'Anonymous' }}</span> said
                  <b
                    class="font-medium text-red-500"
                    :class="{'text-green-500': !item.is_down}"
                  >{{ item.is_down ? 'down' : 'up' }}</b>
                  <span class="whitespace-nowrap">{{ timeSince(item.created) }}</span>
                </div>
                <div v-if="item.content" class="mt-2 text-sm text-gray-700">
                  <p>{{ item.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="flex justify-center">
        <div
          class="text-xs cursor-pointer px-4 py-1 rounded border"
          @click="$emit('load')"
        >Load more
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentBox",
  props: {
    instance: {
      type: Object,
      default: null
    },
    results: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      content: null,
      is_down: true,
      location: {
        lat: 0,
        log: 0
      }
    }
  },
  computed: {
    hasLocate() {
      return Boolean(this.location.lat && this.location.log)
    }
  },
  methods: {
    showPosition(position) {
      if (position) {
        this.location.lat = position.coords.latitude
        this.location.log = position.coords.longitude
      }
    },
    getLocate() {
      if (this.hasLocate) {
        this.location = {
          lat: 0,
          log: 0
        }
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      }
    },
    send() {
      this.$axios.$post('/app/reports/', {
        is_down: this.is_down,
        content: this.content,
        instance: this.instance.id,
        ...this.hasLocate ? this.location : {}
      }).then((res) => {
        this.$emit('sent', res)
      })
    }
  }
}
</script>
