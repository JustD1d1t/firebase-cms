// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ["@nuxt/ui", "nuxt-tiptap-editor", "@nuxtjs/tailwindcss"],
  plugins: ["~/plugins/firebase"],
  css: ["@/assets/scss/main.scss"],
  compatibilityDate: "2024-07-08",
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
})
