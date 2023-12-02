import solid from 'vite-plugin-solid'
import checker from 'vite-plugin-checker'
import solidSvg from 'vite-plugin-solid-svg'
import tsconfigPaths from 'vite-tsconfig-paths'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    solid({typescript: {onlyRemoveTypeImports: false}}),
    checker({
      typescript: true,
      root: './src',
    }),
    solidSvg(),
    // tsconfigPaths(),
  ],
})
