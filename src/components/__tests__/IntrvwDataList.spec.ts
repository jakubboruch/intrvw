import IntrvwDataList from '@/components/IntrvwDataList.vue';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import { shallowMount } from "@vue/test-utils";

const wrapper = shallowMount(IntrvwDataList, {
    props: {
        modelValue: '',
        items: [],
        selectable: false,
        placeholder: ''
    }
})

describe('IntrvwDataList', () => {
    test('IntrvwDataList - mounted', async () => {
        expect(wrapper.exists()).toBe(true)
    });
    test('IntrvwDataList - all items rendered', async () => {
        const props = {
            modelValue: '',
            items: ['item 1', 'item 2', 'item 3'],
            selectable: false,
            placeholder: ''
        }
        await wrapper.setProps(props);
        await nextTick();
        const content = wrapper.find('.intervw-data-list__list');
        expect(content.element.textContent).toContain(props.items.join(''));
    });
    test('IntrvwDataList - items are not selectable if selectable = false', async () => {
        const props = {
            modelValue: '',
            items: ['item 1', 'item 2', 'item 3'],
            selectable: false,
            placeholder: ''
        }
        await wrapper.setProps(props);
        await nextTick();
        const btn = wrapper.findAll('.intervw-data-list__item').at(0);
        const eventName = 'update:modelValue';
        await btn?.trigger('click')
        expect(wrapper.emitted()[eventName]?.length || 0).toBe(0)
    })
    test('IntrvwDataList - items are selectable if selectable = true', async () => {
        const props = {
            modelValue: '',
            items: ['item 1', 'item 2', 'item 3'],
            selectable: true,
            placeholder: ''
        }
        await wrapper.setProps(props);
        await nextTick();
        const btn = wrapper.findAll('.intervw-data-list__item').at(0);
        const eventName = 'update:modelValue';
        await btn?.trigger('click')
        expect(wrapper.emitted()[eventName][0]).toContain(props.items[0])
    })
    test('IntrvwDataList - don\'t display placeholder if placeholder prop don\nt contains value', async () => {
        const props = {
            modelValue: '',
            items: ['item 1', 'item 2', 'item 3'],
            selectable: true,
            placeholder: ''
        }
        await wrapper.setProps(props);
        await nextTick();
        const placeholder = wrapper.find('.intervw-data-list__placeholder');
        expect(placeholder.exists()).toBeFalsy();
    })

    test('IntrvwDataList - display placeholder if placeholder prop contains value', async () => {
        const props = {
            modelValue: '',
            items: ['item 1', 'item 2', 'item 3'],
            selectable: true,
            placeholder: 'Select something'
        }
        await wrapper.setProps(props);
        await nextTick();
        const placeholder = wrapper.find('.intervw-data-list__placeholder');
        expect(placeholder.exists()).toBeTruthy();
        expect(placeholder.element.textContent).toContain(props.placeholder);
    })

});