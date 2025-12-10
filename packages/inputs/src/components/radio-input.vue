<template>
    <input
        ref="element"
        v-model="model"
        :value="value"
        :class="{ focused }"
        type="radio"
        @focus="onFocus"
        @blur="onBlur"
    />
</template>

<script lang="ts" setup>
import type { FocusableEmits, MaybeArray, ValidationResult } from '@/components/types';
import { useFocusable } from '@/composables/focus';
import { toArray } from '@/util/arrays';
import type { ValidationFunction, ValidationPresets } from '@/util/validation';
import { replaceRequiredPreset, validate } from '@/util/validation';
import type { InputHTMLAttributes } from 'vue';
import { computed, useTemplateRef } from 'vue';

type RadioValidationFunction = ValidationFunction<string | unknown>;
type ValidatableProp = { validators?: MaybeArray<ValidationPresets | RadioValidationFunction> };

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> & ValidatableProp & { value?: string | unknown };

const { value, validators = [] } = defineProps<Props>();

const emit = defineEmits<FocusableEmits>();

// As objects and other values are allowed, specifically typing these is not possible.
const model = defineModel<string | unknown>();

const element = useTemplateRef<HTMLInputElement>('element');

/**
 * Composable for all inputs that have a "focused" state and corresponding emits.
 */
const { focused, focus, blur, onBlur, onFocus } = useFocusable(element, emit);
/**
 * Validator function for 'required' preset.
 */
const required: RadioValidationFunction = (modelValue: string | unknown): boolean =>
    modelValue !== null && modelValue !== undefined;

/**
 * Reactive list of validators to execute when the model is changed.
 */
const validatorFunctions = computed<RadioValidationFunction[]>(() =>
    replaceRequiredPreset(toArray(validators), required)
);

/**
 * Validate the model against the provided validators.
 */
function validateModel(): ValidationResult {
    return validate(model.value, ...validatorFunctions.value);
}

/**
 * Set the model value according to the model type to check the checkbox.
 */
function check(): void {
    model.value = value;
}

/**
 * Unset the model value according to the model type to uncheck the checkbox.
 */
function uncheck(): void {
    model.value = undefined;
}

/**
 * Expose the focus, blur, check and uncheck methods so they can be used directly via template references.
 */
defineExpose({
    focus,
    blur,
    check,
    uncheck,
    validate: validateModel
});
</script>
