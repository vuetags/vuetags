<template>
    <text-input ref="element" v-bind="$props" :type="type" />
</template>

<script setup lang="ts">
import TextInput from '@/components/text-input.vue';
import type { MaybeArray, ModifiableInputProp } from '@/components/types';
import type { TransformFunction } from '@/util/model';
import type { ValidationFunction, ValidationPresets } from '@/util/validation';
import type { InputHTMLAttributes } from 'vue';
import { ref, useTemplateRef, watch } from 'vue';

/* Custom prop for validators */
type ValidatableProp = { validators?: MaybeArray<ValidationPresets | ValidationFunction<string>> };

/* Custom prop for filters without presets */
type FilterableProp = { filters?: MaybeArray<RegExp | TransformFunction> };

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> &
    FilterableProp &
    ModifiableInputProp &
    ValidatableProp & { showPassword?: boolean };

const { showPassword = false } = defineProps<Props>();

const element = useTemplateRef<InstanceType<typeof TextInput>>('element');

const type = ref<'password' | 'text'>('password');

watch(
    () => showPassword,
    (show: boolean) => (type.value = show ? 'text' : 'password')
);

/**
 * Set the type to 'text' to display the value.
 */
function show(): void {
    type.value = 'text';
}

/**
 * Set the type (back) to 'password' to obfuscate the value.
 */
function hide(): void {
    type.value = 'password';
}

defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    validate: () => element.value?.validate(),
    showPassword: show,
    hidePassword: hide
});
</script>
