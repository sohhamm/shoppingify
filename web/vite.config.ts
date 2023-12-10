import solid from 'vite-plugin-solid'

import solidSvg from 'vite-plugin-solid-svg'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [solid({typescript: {onlyRemoveTypeImports: false}}), solidSvg()],
})
