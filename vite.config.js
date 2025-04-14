import { defineConfig } from "vite";
import path from 'path'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        exclude: ['node_modules'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    },
});

