<template>
    <text-input
        ref="element"
        v-bind="$props"
        :filters="adjustedFilters"
        :modifiers="adjustedModifiers"
    />
</template>

<script setup lang="ts">
import TextInput from '@/components/text-input.vue';
import type { MaybeArray } from '@/components/types';
import type { TransformFunction } from '@/util/model';
import { filterPresets } from '@/util/model';
import type { ValidationFunction, ValidationPresets } from '@/util/validation';
import type { InputHTMLAttributes } from 'vue';
import { computed, useTemplateRef } from 'vue';

/* Custom prop for validators */
type ValidatableProp = { validators?: MaybeArray<ValidationPresets | ValidationFunction> };

/* Custom prop for filters without presets */
type FilterableProp = { filters?: MaybeArray<RegExp | TransformFunction> };

/* Custom prop for modifiers without presets */
type ModifiableProp = { modifiers?: MaybeArray<TransformFunction> };

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> &
    FilterableProp &
    ModifiableProp &
    ValidatableProp & { allowedCharacters?: string };

type Filter = RegExp | TransformFunction;

const { filters = [], modifiers = [], allowedCharacters = '' } = defineProps<Props>();

const element = useTemplateRef<InstanceType<typeof TextInput>>('element');

const adjustedFilters = computed<Filter[]>(() =>
    [new RegExp(`[0-9${allowedCharacters}]`, 'g'), filterPresets<Filter>(filters)].flat()
);

const adjustedModifiers = computed<TransformFunction[]>(() =>
    filterPresets<TransformFunction>(modifiers).flat()
);

defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    validate: () => element.value?.validate()
});
</script>
