import type { Filter, Modifier } from '@/util/model';

/**
 * Properties for filter functionality
 */
export type FilterableInputProp = {
    filters?: MaybeArray<Filter>;
};

/**
 * Properties for modify functionality
 */
export type ModifiableInputProp = {
    modifiers?: MaybeArray<Modifier>;
};

/**
 * Properties for the text-input and text-area inputs
 */
export type TransformableInputProps = FilterableInputProp & ModifiableInputProp;

/**
 * Focus emits
 */
export type FocusableEmits = {
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
};

/**
 * Emits for validatable components
 */
export type ValidationResult = {
    valid: boolean;
    failed: string[];
};

/**
 * A single or array of the provided type
 */
export type MaybeArray<T> = T | T[];
