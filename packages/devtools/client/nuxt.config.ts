import { resolve } from 'node:path'
import DevTools from '../src/module'
import DevToolsUiKit from '../../devtools-ui-kit/src/module'

function r(p: string) {
  return resolve(__dirname, p)
}

export default defineNuxtConfig({
  modules: [
    'nuxt-vitest',
    '~/modules/markdown',
    DevToolsUiKit,
    DevTools,
  ],
  ssr: false,
  nitro: {
    output: {
      publicDir: r('../dist/client'),
    },
    devStorage: {
      test: {
        driver: 'fs',
        base: r('./.data/test'),
      },
    },
    hooks: {
      'prerender:routes': function (routes) {
        // Disable prerendering as it's an SPA
        routes.clear()
      },
    },
  },
  alias: {
    '@nuxt/devtools-kit/iframe-client': r('../../devtools-kit/src/runtime/iframe-client'),
    '@nuxt/devtools-kit/types': r('../../devtools-kit/src/types'),
    '@nuxt/devtools-kit': r('../../devtools-kit/src/index'),
  },
  appConfig: {
    fixture2: 'from nuxt.config.ts',
  },
  runtimeConfig: {
    'fixture3': 'private runtime config from nuxt.config.ts',
    'api-key': 'null',
    'public': {
      fixture4: 'public runtime config from nuxt.config.ts',
    },
  },
  app: {
    baseURL: '/__nuxt_devtools__/client/',
  },
  experimental: {
    watcher: 'parcel',
  },
  vite: {
    build: {
      target: 'esnext',
    },
    optimizeDeps: {
      include: [
        'vis-network',
        'vis-data',
      ],
    },
    server: {
      hmr: {
        clientPort: process.env.PORT ? +process.env.PORT : undefined,
      },
    },
  },
  typescript: {
    includeWorkspace: true,
  },
  // Production Overrides
  $production: {
    app: {
      // We set a placeholder for the middleware to be replaced with the correct base URL
      baseURL: '/__NUXT_DEVTOOLS_BASE__/',
    },
  },
})
