import { boot } from 'quasar/wrappers'

import { createI18n } from 'vue-i18n'

import { loadLocaleMessages }  from '../i18n'

// Create I18n instance
export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: loadLocaleMessages()
})

export default boot(({ app }) => {
  // Tell app to use the I18n instance
  app.use(i18n)
})