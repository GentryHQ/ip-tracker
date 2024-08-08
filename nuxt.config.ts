// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.scss'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    ipfyApiKey: process.env.IPFY_API_KEY,
  },
  modules: [
    "@nuxtjs/google-fonts",
  ],
  app: {
    head: {
      title: 'IP Address Tracker',
      meta: [
        { name: 'description', content: 'IP Address Tracker by Afolabi John - Gentry' }
      ],
      link: [
        {
          rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=', crossorigin: ''
        }
      ],
      script: [
        {
          src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=', defer: 'true', crossorigin: ''
        }
      ]
    }
  },
  googleFonts: {
    families: {
      Rubik: [400, 500, 700]
    },
    display: "swap",
    useStylesheet: true,
    preconnect: true,
  }
})