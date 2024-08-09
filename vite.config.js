import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import replaceImportsPlugin from './globalConfiguration/replaceImportsPlugin';
import { visualizer } from 'rollup-plugin-visualizer';
import json5 from 'vite-plugin-json5';
import base64FontsPlugin from './vitePlugins/vite-plugin-base64-fonts';

const APP_KEY = process.env.APP_KEY;
const CONFIG_KEY = process.env.CONFIG_KEY;

// Read the JSON file
const globalConfigPath = path.resolve(__dirname, `globalConfiguration/${CONFIG_KEY}.json`);
const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'));

const appConfigPath = path.resolve(__dirname, `src/apps/${APP_KEY}/configuration/${CONFIG_KEY}.json`);
const appConfig = JSON.parse(fs.readFileSync(appConfigPath, 'utf-8'));

const CONFIG = {
  APP_KEY,
  CONFIG_KEY,
  globalConfig,
  appConfig,
};

// Custom plugin to handle alias replacements in HTML files
function htmlAliasPlugin() {
  return {
    name: 'html-alias-plugin',
    transformIndexHtml(html) {
      return html.replace(/@app\//g, '/src/');
    },
  };
}

// Determine if HTTPS should be used
const useHttps = process.env.HTTPS === 'true';

const serverConfig = {
  port: 3000, // Default port
  open: true, // Automatically open the browser on server start
  https: useHttps ? {
    key: './cert/key.pem',
    cert: './cert/cert.pem',
  } : undefined,
};

export default defineConfig({
  build: {
    assetsInlineLimit: 12288, // Set the threshold to 8KB
  },
  server: serverConfig,
  publicDir: path.resolve(__dirname, `src/apps/${APP_KEY}/public`),
  plugins: [
    base64FontsPlugin(),
    replaceImportsPlugin(CONFIG),
    htmlAliasPlugin(),
    react(),
    visualizer({
      filename: './bundle-stats.html',
      open: true,
    }),
    json5(),
  ],
  define: {
    CONFIG: JSON.stringify(CONFIG),
  },
  optimizeDeps: {
    include: [],
  },
  resolve: {
    alias: {
      '@': '/src',
      '@globalStyles': `/src/styles`,
      '@globalHelpers': `/src/helpers`,
      '@providers': `/src/apps/${APP_KEY}/providers`,
      '@app': `/src/apps/${APP_KEY}`,
      '@assets': `/src/apps/${APP_KEY}/assets`,
      '@configuration': `/src/apps/${APP_KEY}/configuration`,
      '@styles': `/src/apps/${APP_KEY}/styles`,
      '@pages': `/src/apps/${APP_KEY}/pages`,
      '@translations': `/src/apps/${APP_KEY}/translations`,
      '@components': '/src/components',
      '@services': `/src/apps/${APP_KEY}/providers/services`,
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local', // or 'global'
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        //additionalData: `@import "src/apps/${APP_KEY}/styles/Variables.scss";`, // Optional: Include global SCSS variables
      },
    },
  },
});
