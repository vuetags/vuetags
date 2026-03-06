import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';

export default defineConfig({
    entry: './src/index.ts',
    plugins: [Vue({ isProduction: true })],
    external: ['vue', '@vueuse/core'],
    dts: { vue: true },
    copy: ['README.md', 'CHANGELOG.md', { from: '../../LICENSE', to: 'dist/' }]
});
