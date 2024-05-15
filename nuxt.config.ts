// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
	components: true,
	ssr: false,
	typescript: { shim: false },
	build: {
		transpile: ["vuetify"],
	},
	vite: {
		// @ts-ignore
		// curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
		ssr: {
			noExternal: ["vuetify"], // add the vuetify vite plugin
		},
	},
	modules: [
		// ...
		"@pinia/nuxt",
		'maz-ui/nuxt',
		'nuxt-mapbox',
		'@pinia-plugin-persistedstate/nuxt',
	],
	piniaPersistedstate: {
		storage: 'localStorage'
	  },
	runtimeConfig: {
		public: {
			stripePK: process.env.NUXT_ENV_STRIPE_PUBLIC_KEY
		}
	},
	mapbox: {
		accessToken: process.env.MAP_BOX_TOKEN
	  },
	mazUi: {
		injectComponents: true,
		injectCss: true,
		injectAos: {
		  injectCss: true,
		},
		injectUseToast: true,
		injectUseThemeHandler: true,
		devtools: true,
	  },
	css: ["~/assets/css/fonts.css",
		  "~/assets/css/main.css", 
		  "vuetify/lib/styles/main.sass", 
		  "@mdi/font/css/materialdesignicons.min.css",
		  'flag-icons/css/flag-icons.css',
		  "/node_modules/flag-icons/css/flag-icons.min.css"
		  ],
});
