import TextInput from '@/components/text-input.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { beforeAll, beforeEach, describe, expect, it } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';

let wrapper: VueWrapper;

beforeAll(() => {
    expect(TextInput).toBeTruthy();
    wrapper = mountComponent();
});

beforeEach(async () => {
    await userEvent.fill(page.getByPlaceholder('test'), '');
});

describe('Filtering keys', () => {
    it('should filter not-allowed characters', async () => {
        const input = page.getByPlaceholder('test');

        await input.click();
        await expect.element(input).toHaveFocus();

        await userEvent.keyboard('abc123def');
        expect(input.element().classList.contains('focused')).toBe(true);
        expect(input.element().classList.contains('focused')).toBe(true);

        await expect.element(input).toHaveValue('abcdef');
        await expect.element(input).toHaveDisplayValue('abcdef');
    });
});

describe('Filtering paste', () => {
    it('should filter not-allowed characters', async () => {
        await wrapper.setProps({ filters: null });

        const input = page.getByPlaceholder('test');

        await input.click();
        await expect.element(input).toHaveFocus();

        await userEvent.fill(input, 'abc123def');
        await expect.element(input).toHaveDisplayValue('abc123def');

        await userEvent.dblClick(input);
        await userEvent.cut();
        await expect.element(input).toHaveDisplayValue('');

        await wrapper.setProps({ filters: 'numbers' });

        await userEvent.paste();
        await expect.element(input).toHaveDisplayValue('123');
    });
});

function mountComponent(): VueWrapper {
    return mount(TextInput, {
        props: {
            name: 'testing-text-input',
            placeholder: 'test',
            filters: 'letters'
        },
        attachTo: document.body
    });
}
