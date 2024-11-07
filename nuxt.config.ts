// filename - nuxt.config.ts
import { nodePolyfills } from '@bangjelkoski/vite-plugin-node-polyfills'

export default defineNuxtConfig({
  ssr: false, // whether to pre-render your application
  modules: ['@pinia/nuxt', '@nuxtjs/device', '@nuxtjs/tailwindcss'],
  device: {
    refreshOnResize: true
  },
  components: [
    '~/components',
    {
      path: '~/libs/sdk-ts/packages/ui/components',
      prefix: 'Base'
    }
  ],
  typescript: {
    typeCheck: 'build', // we recommend build so you do typescript checks only on build type
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  },
  css: ['~/assets/css/main.scss', '~/assets/css/main.css'],
  imports: {
    // automatic imports of store definitions (if you use pinia)
    dirs: ['composables/**', 'store/**']
  },
  app: {
    head: {
      title: 'My Nuxt App',
      htmlAttrs: {
        class: 'dark',
        'data-mode': 'dark'
      },
      script: [
        //add script with content is var exports = {};
        {
          innerHTML: `var exports = {};`
        }
      ]
    }
  },
  plugins: [
    {
      // import the buffer plugin we've made
      src: './plugins/buffer.client.ts',
      ssr: false
    },
    {
      src: '~/libs/sdk-ts/packages/ui/main'
    }
  ],
  sourcemap: {
    server: false,
    client: true
  },

  // Vite related config
  vite: {
    define: {
      'process.env': JSON.stringify({}),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    },

    plugins: [
      // setting up node + crypto polyfils
      nodePolyfills({ protocolImports: false })
    ],

    build: {
      sourcemap: false, // we don't generate

      // default rollup options
      rollupOptions: {
        cache: false,
        output: {
          manualChunks: (id: string) => {
            //
          }
        }
      }
    },

    // needed for some Vite related issue for the
    // @bangjelkoski/vite-plugin-node-polyfills plugin
    optimizeDeps: {
      exclude: ['fsevents']
    }
  }
})
