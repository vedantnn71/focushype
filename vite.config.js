import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import path from "path";


export default defineConfig({
  resolve: {
    alias: {
     dialog: path.resolve("./js/dialog.js")
    }
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
  ]
})