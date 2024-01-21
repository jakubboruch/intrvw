import IntrvwSortBtn from '@/components/IntrvwSortBtn.vue';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import { shallowMount } from "@vue/test-utils";

const wrapper = shallowMount(IntrvwSortBtn, {
    props: {
        modelValue: 0
    }
})

describe('IntrvwSortBtn', () => {
    test('IntrvwSortBtn - mounted', async () => {
        expect(wrapper.exists()).toBe(true)
    });
    test('IntrvwSortBtn - emit state change', async () => {
        const props0 = {
            modelValue: 0
        }
        await wrapper.setProps(props0);
        await nextTick();
        const icon = wrapper.find('.intrvw-sort-btn');
        const eventName = 'update:modelValue';
        await icon.trigger('click');
        expect(wrapper.emitted()[eventName][0]).toContain(1);
        const props1 = {
            modelValue: 1
        }
        await wrapper.setProps(props1);
        await nextTick();
        await icon.trigger('click');
        expect(wrapper.emitted()[eventName][1]).toContain(-1);
        const props2 = {
            modelValue: -1
        }
        await wrapper.setProps(props2);
        await nextTick();
        await icon.trigger('click');
        expect(wrapper.emitted()[eventName][2]).toContain(0);
    });
    test('IntrvwSortBtn - icon change', async () => {
        const props0 = {
            modelValue: 0
        }
        await wrapper.setProps(props0);
        await nextTick();
        const icon = wrapper.find('.intrvw-sort-btn');
        expect(icon.classes()).toContain('icon-sort');
        await icon.trigger('click');
        const props1 = {
            modelValue: 1
        }
        await wrapper.setProps(props1);
        await nextTick();
        await icon.trigger('click');
        expect(icon.classes()).toContain('icon-sort-up');
        const props2 = {
            modelValue: -1
        }
        await wrapper.setProps(props2);
        await nextTick();
        expect(icon.classes()).toContain('icon-sort-down');
    })
});