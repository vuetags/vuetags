import type { ShallowRef } from 'vue';
import { readonly, ref } from 'vue';

type FocusableEmits = ((name: 'focus', event: FocusEvent) => void) &
    ((name: 'blur', event: FocusEvent) => void);

export const useFocusable = <T extends HTMLElement>(
    element: Readonly<ShallowRef<T | null>>,
    emit: FocusableEmits
) => {
    const focused = ref<boolean>();

    /**
     * Trigger the HTML native "focus" function
     */
    function focus(): void {
        element.value?.focus();
    }

    /**
     * Trigger the HTML native "blur" function
     */
    function blur(): void {
        element.value?.blur();
    }

    /**
     * Trigger the "focused" class and emit the focus event when focused.
     *
     * @param event The native focus event.
     */
    function onFocus(event: FocusEvent): void {
        focused.value = true;
        emit('focus', event);
    }

    /**
     * Remove the "focused" class and emit the blur event when blurred.
     *
     * @param event The native focus event.
     */
    function onBlur(event: FocusEvent): void {
        focused.value = false;
        emit('blur', event);
    }

    return {
        focused: readonly(focused),
        focus,
        blur,
        onFocus,
        onBlur
    };
};
