import { defineConfig } from 'vite-plus';

export default defineConfig({
    lint: {
        jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
        rules: { 'vite-plus/prefer-vite-plus-imports': 'error' }
    },
    fmt: {
        semi: true,
        singleQuote: true,
        tabWidth: 4,
        trailingComma: 'none'
    },
    staged: {
        '*': 'vp check --fix'
    }
});
