export default {
	components: true,
	head: {
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{
				charset: 'utf-8',
			},
		],
	},
	router: {
		prefetchLinks: false,
	},
	//the new 'map' plugin is created with the name of
	//maps.client.js because nuxt will use it only on the client
	plugins: ['~/plugins/maps.client', '~/plugins/auth2.client', '~/plugins/dataApi'],
	modules: ['~/modules/auth', '~/modules/algolia', '~/modules/cloudinary', '@nuxtjs/cloudinary'],
	cloudinary: {
		cloudName: 'simuniver',
	},
	image: {
		cloudinary: {
			baseURL: 'https://res.cloudinary.com/simuniver/image/upload/',
		},
	},
	devServerHandlers: [],
	buildModules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
	css: ['~/assets/sass/app.scss'],
	build: {
		//remove inline styles and
		// base64 encoding
		extractCSS: true,
		loaders: {
			limit: 0,
		},
	},
	// Environment variables
	//env variables now stored on nuxt's runtime config
	publicRuntimeConfig: {
		algolia: {
			algolia_app_id: process.env.ALGOLIA_APP_ID,
			algolia_search_key: process.env.ALGOLIA_SEARCH_KEY,
		},
		maps_api_key: process.env.MAPS_API_KEY,
		auth: {
			cookieName: 'idToken',
			clientId: process.env.GOOGLE_AUTH_ID,
		},
		cloudinary: {
			apiKey: process.env.CLOUDINARY_API_KEY,
		},
	},
	privateRuntimeConfig: {
		algolia: {
			algolia_app_id: process.env.ALGOLIA_APP_ID,
			algolia_api_key: process.env.ALGOLIA_API_KEY,
		},
		cloudinary: {
			apiSecret: process.env.CLOUDINARY_API_SECRET,
		},
	},
};
