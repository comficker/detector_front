<template>
  <div>
    <header class="py-1 px-4 bg-stone-800 text-white">
      <div class="mx-auto max-w-2xl uppercase font-bold py-2">
        <nuxt-link class="py-2 text-sm" to="/">Home</nuxt-link>
      </div>
    </header>
    <main class="px-4">
      <nuxt/>
    </main>
    <footer class="p-4 text-xs bg-gray-50 border-t">
      <div class="mx-auto max-w-2xl md:flex justify-between">
        <p class="text-gray-500">© 2022 <b>isSomethingDown.com</b>, all rights reserved.</p>
        <a target="_blank" class="font-bold" href="/project-sitemap.xml">sitemap</a>
      </div>

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
