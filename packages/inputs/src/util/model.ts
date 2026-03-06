import { MaybeArray } from '@/components/types';
import { toArray } from '@/util/arrays';

export type TransformFunction = (value: string) => string;

export type Filter = FilterPreset | RegExp | TransformFunction;

export type Modifier = ModifierPreset | TransformFunction;

export const FilterPresets = ['letters', 'numbers'] as const;
export type FilterPreset = (typeof FilterPresets)[number];

const FilterPresetFunctions: Record<FilterPreset, TransformFunction> = {
    letters: (value: string) => (value.match(/[A-Za-z]/g) || []).join(''),
    numbers: (value: string) => (value.match(/[0-9]/g) || []).join('')
};

export const ModifierPresets = ['uppercase', 'lowercase'] as const;
export type ModifierPreset = (typeof ModifierPresets)[number];

const ModifierPresetFunctions: Record<ModifierPreset, TransformFunction> = {
    uppercase: (value: string) => value.toUpperCase(),
    lowercase: (value: string) => value.toLowerCase()
};

/**
 * Create filter functions from the provided filters
 *
 * @param filters one or multiple presets, regular expressions or functions
 * @returns an array of filter functions
 */
export function createFilters(filters: MaybeArray<Filter>): TransformFunction[] {
    return createTransformers(filters, FilterPresetFunctions, 'filter');
}

/**
 * Create modifier functions from the provided modifiers
 *
 * @param modifiers one or multiple presets or functions
 * @returns an array of modifier functions
 */
export function createModifiers(modifiers: MaybeArray<Modifier>): TransformFunction[] {
    return createTransformers(modifiers, ModifierPresetFunctions, 'modify');
}

/**
 * Create transform functions from the provided filters or modifiers
 *
 * @param transformers one or multiple presets and/or functions
 * @returns an array of transform functions
 */
function createTransformers<T extends Filter | Modifier, P extends FilterPreset | ModifierPreset>(
    transformers: MaybeArray<T>,
    presets: Record<P, TransformFunction>,
    type: 'filter' | 'modify'
): TransformFunction[] {
    if (!transformers) {
        return [];
    }

    const transformerArray = toArray(transformers);
    if (!transformerArray.length) {
        return [];
    }

    const transformFunctions = [];

    for (const transformer of transformerArray) {
        if (transformer instanceof Function) {
            transformFunctions.push(transformer);
            continue;
        }

        if (transformer instanceof RegExp) {
            transformFunctions.push((value: string) => (value.match(transformer) || []).join(''));
            continue;
        }

        if (typeof transformer === 'string') {
            if (!Object.keys(presets).includes(transformer)) {
                console.warn(`Unknown ${type} preset provided`);
                continue;
            }

            transformFunctions.push(presets[transformer as string as P]);
            continue;
        }

        console.warn(`Unknown ${type} provided`);
    }

    return transformFunctions;
}

/**
 * Transform a value using the provided functions
 *
 * @param value the value to transform
 * @param transformers the array or transformers to execute
 * @returns the transformed value
 */
export function transform(value: string | undefined, ...transformers: TransformFunction[]): string {
    if (!value) {
        return '';
    }

    const filtered = transformers.filter((transformer) => !!transformer);
    if (!filtered || !filtered.length) {
        return value;
    }

    let transformed = value;
    for (const transformer of filtered) {
        transformed = transformer(transformed);
    }

    return transformed;
}

/**
 * Filter out presets from the transformers
 *
 * @param transformers the collection of presets, regular expressions and/or transform functions
 * @returns the filtered array of transformers
 */
export function filterPresets<Transformer>(transformers: Transformer | Transformer[]): Transformer[] {
    const items = Array.isArray(transformers) ? transformers : [transformers];

    return items.filter((filter) => typeof filter !== 'string');
}
