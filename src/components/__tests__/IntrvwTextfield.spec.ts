import IntrvwTextfield from '@/components/IntrvwTextfield.vue';
import { describe, expect, test } from 'vitest';
import { shallowMount } from "@vue/test-utils";

const wrapper = shallowMount(IntrvwTextfield, {
    props: {
        placeholder: 'Search...',
        modelValue: '',
        icon: 'icon-test'
    }
})

describe('IntrvwTextfield', () => {
    test('IntrvwTextfield mounted', async () => {
        expect(wrapper.exists()).toBe(true)
    });
    test('IntrvwTextfield props', async () => {
        const props = {
            placeholder: 'New Search...',
            modelValue: '',
            icon: 'icon-new-test'
        }
        await wrapper.setProps(props);
        const placeholder = wrapper.find('.intervw-textfield__placeholder');
        expect(placeholder.element.textContent).toBe(props.placeholder);
    })
    test('IntrvwTextfield focus', async () => {
        const icon = wrapper.find('.intervw-textfield__icon');
        const input = wrapper.find('input');
        await input.trigger('focus');
        expect(icon.classes()).toContain('intervw-textfield__icon--focus');
    });
    test('IntrvwTextfield emit', async () => {
        const input = wrapper.find('input');
        const eventValue = 'New value'
        await input.setValue(eventValue);
        const eventName = 'update:modelValue';
        expect(wrapper.emitted()[eventName][0]).toContain(eventValue);
    })

});