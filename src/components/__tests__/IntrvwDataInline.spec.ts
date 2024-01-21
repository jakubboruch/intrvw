import IntrvwDataInline from '@/components/IntrvwDataInline.vue';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import { shallowMount } from "@vue/test-utils";

const wrapper = shallowMount(IntrvwDataInline, {
    props: {
        modelValue: '',
        title: '',
        items: []
    }
})

describe('IntrvwDataInline', () => {
    test('IntrvwDataInline - mounted', async () => {
        expect(wrapper.exists()).toBe(true)
    });
    test('IntrvwDataInline - all items rendered', async () => {
        const props = {
            title: '',
            modelValue: '',
            items: ['item1', 'item2', 'item3']
        }
        await wrapper.setProps(props);
        await nextTick();
        const content = wrapper.find('.intervw-data-inline__content');
        expect(content.element.textContent).toContain(props.items.join(''));
    });
    test('IntrvwDataInline - emit contains clicked item', async () => {
        const props = {
            title: '',
            modelValue: '',
            items: ['item1', 'item2', 'item3']
        }
        await wrapper.setProps(props);
        await nextTick();
        const btn = wrapper.findAll('.intervw-data-inline__btn').at(0);
        const eventName = 'update:modelValue';
        await btn?.trigger('click')
        expect(wrapper.emitted()[eventName][0]).toContain(props.items[0]);
    })
});