import { defineConfig } from "vite";

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        //setupFiles: ['./src/test/setupTests.ts'],
        exclude: ['node_modules'],
    },
});

