import { defineConfig } from 'cypress';
export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			return require('./cypress/plugins/index.ts')(on, config);
		},
		specPattern: 'cypress/**/*.{js,jsx,ts,tsx}',
		defaultCommandTimeout: 10000,
	},
});
