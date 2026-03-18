import { toArray } from '@/util/arrays';
import { expect, it } from 'vite-plus/test';

it('should transform non-array values', () => {
    expect(toArray('something')).toEqual(['something']);
    expect(toArray(42)).toEqual([42]);
    expect(toArray(true)).toEqual([true]);
});

it('should not transform array values', () => {
    expect(toArray(['something'])).toEqual(['something']);
    expect(toArray([42])).toEqual([42]);
    expect(toArray([true])).toEqual([true]);
});
