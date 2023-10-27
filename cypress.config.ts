import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'gymwkz',
  e2e: {
    baseUrl:'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    test_email: 'YOUR EMAIL',
    test_password: 'YOUR PASSWORD',
  },
});
