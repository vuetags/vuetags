import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import Vue from 'unplugin-vue/rolldown';
import { configDefaults, defineConfig } from 'vite-plus';
import { playwright } from 'vite-plus/test/browser-playwright';

export default defineConfig({
    plugins: [vue()],
    pack: {
        entry: './src/index.ts',
        exports: true,
        plugins: [Vue({ isProduction: true })],
        dts: { vue: true },
        deps: { neverBundle: ['vue', '@vueuse/core'] },
        copy: ['README.md', 'CHANGELOG.md', { from: '../../LICENSE', to: 'dist/' }]
    },
    test: {
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    environment: 'jsdom',
                    include: ['./**/*.test.ts']
                }
            },
            {
                extends: true,
                test: {
                    name: 'browser',
                    environment: 'jsdom',
                    include: ['./**/*.test.browser.ts'],
                    browser: {
                        provider: playwright(),
                        enabled: true,
                        headless: true,
                        screenshotFailures: false,
                        instances: [{ browser: 'chromium' }]
                    }
                }
            }
        ],
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/**'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        coverage: {
            exclude: [
                ...(configDefaults.coverage.exclude ?? []),
                '**/*.test.browser.ts',
                '**/index.ts',
                '**/types.ts',
                '**/dist',
                '**/test'
            ]
        }
    }
});
