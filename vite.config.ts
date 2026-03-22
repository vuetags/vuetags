import { defineConfig } from 'vite-plus';

export default defineConfig({
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
