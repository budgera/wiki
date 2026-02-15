// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxt/content', 'nuxt-studio'],
  compatibilityDate: '2025-05-15',
  app: {
    baseURL: '/wiki/',
  },
  site: {
    name: 'Budgera',
  },
  studio: {
    // Studio admin login route
    route: '/admin', // default
    // Your configuration
    repository: {
      private: false,
      provider: 'github', // default: only GitHub supported currently
      owner: 'budgera', // your GitHub owner
      repo: 'wiki', // your GitHub repository name
      branch: 'master',
      rootDir: '', // optional: location of your content app
    },
    i18n: {
      defaultLocale: 'ru',
    },
  },
  ogImage: {
    fonts: ['Manrope:700'],
  },
})
