import IntrvwDataInline from '@/components/IntrvwLoadingBar.vue';
import { describe, expect, test } from 'vitest';
import { shallowMount } from "@vue/test-utils";

const wrapper = shallowMount(IntrvwDataInline)

describe('IntrvwLoadingBar', () => {
    test('IntrvwLoadingBar - mounted', async () => {
        expect(wrapper.exists()).toBe(true)
    });
});