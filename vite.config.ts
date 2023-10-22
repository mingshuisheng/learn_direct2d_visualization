import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  plugins: [
    suidPlugin(),
    solid(),
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
})
