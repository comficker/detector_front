<template>
  <div>
    <header class="py-1 px-4 bg-stone-800 text-white">
      <div class="mx-auto max-w-2xl uppercase font-bold py-2">
        <nuxt-link class="py-2 text-sm" to="/">Home</nuxt-link>
      </div>
    </header>
    <div v-if="$route.path !== '/'" class="bg-yellow-500 py-1.5 text-xs uppercase font-bold px-4">
      <div class="max-w-2xl mx-auto flex gap-3 items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <span>/</span>
        <div>Google.com</div>
      </div>
    </div>
    <main class="px-4">
      <nuxt/>
    </main>
    <footer class="py-4 text-xs text-center bg-gray-50 border-t">
      <p class="text-gray-500">© 2022 issomethingdown.com. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>

export default {
  name: "LayoutDefault",
  components: {},
  head() {
    return {
      title: "Is Something Down?",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "desc"
        },
        {
          property: 'og:title',
          hid: 'og:title',
          name: 'og:title',
          content: 'Is Something Down? | IsSomethingDown.com',
        },
        {
          property: 'og:description',
          hid: 'og:description',
          name: 'og:description',
          content: 'Is something down for everyone or just me? Check your favorite services are down or having problems.',
        },
      ]
    }
  }
}
</script>

<style>
main {
  min-height: calc(100vh - 98px);
}
</style>
