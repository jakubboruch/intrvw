import IntrvwDataInline from '@/components/IntrvwDataInline.vue';
import { describe, expect, it, test } from 'vitest';
import { shallowMount } from "@vue/test-utils";

const wrapper = shallowMount(IntrvwDataInline, {
    props: {
        modelValue: '',
        title: '',
        items: []
    }
})

describe('IntrvwDataInline', () => {
    test('IntrvwDataInline mounted', async () => {
        expect(wrapper.exists()).toBe(true)
    });
});