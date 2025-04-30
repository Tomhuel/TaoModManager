import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
		kit: {
			vite: {
				resolve: {
					alias: {
						$components: path.resolve('./src/renderer/src/components'),
					}
				}
			}
		}
}
