import { boot } from 'quasar/wrappers';

import { Plugin } from 'vue-responsive-video-background-player';

/**
 * Background video player
 *
 * @see https://www.npmjs.com/package/vue-responsive-video-background-player
 */
export default boot(({ app }) => {
  app.use(Plugin);
});
