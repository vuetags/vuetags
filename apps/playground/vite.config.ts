import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite-plus';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@vuetags/inputs': path.resolve(__dirname, '../../packages/inputs/src'),
            '@': path.resolve(__dirname, '../../packages/inputs/src')
        }
    }
});
