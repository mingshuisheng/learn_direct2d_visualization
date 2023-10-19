import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [solid(), UnoCSS(),],
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
})
