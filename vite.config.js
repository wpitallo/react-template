import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import fs from 'fs'
import path from 'path'

const APP_KEY = process.env.APP_KEY
const CONFIG_KEY = process.env.CONFIG_KEY

// Read the JSON file
const globalConfigPath = path.resolve(__dirname, `globalConfiguration/${CONFIG_KEY}.json`)
const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'))

const appConfigPath = path.resolve(__dirname, `src/apps/${APP_KEY}/configuration/${CONFIG_KEY}.json`)
const appConfig = JSON.parse(fs.readFileSync(appConfigPath, 'utf-8'))

const CONFIG = {
  APP_KEY,
  CONFIG_KEY,
  globalConfig,
  appConfig
}

export default defineConfig({
  plugins: [react()],
  define: {
    CONFIG: JSON.stringify(CONFIG),
  },
  optimizeDeps: {
    include: [
      'json5', // Include json5 library for parsing JSON5 files
    ]
  },
  resolve: {
    alias: {
      '@': '/src',
      '@globalStyles': `/src/styles`,
      '@app': `/src/apps/${APP_KEY}`,
      '@styles': `/src/apps/${APP_KEY}/styles`,
      '@pages': `/src/apps/${APP_KEY}/pages`,
      '@components': '/src/components',
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local', // or 'global'
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/apps/${APP_KEY}/styles/Variables.scss";`, // Optional: Include global SCSS variables
      },
    },
  },
})