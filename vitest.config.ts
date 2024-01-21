import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
const path = require('path')

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('-'),
                },
            },
        }),
    ],
    test: {
        globals: true,
        coverage: {
            reporter: ['text', 'html'],
        },
    }
})