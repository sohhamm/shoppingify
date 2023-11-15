import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'
import checker from 'vite-plugin-checker'
import solidSvg from 'vite-plugin-solid-svg'

export default defineConfig({
  plugins: [
    solid({typescript: {onlyRemoveTypeImports: false}}),
    checker({
      typescript: true,
    }),
    solidSvg(),
  ],
})
