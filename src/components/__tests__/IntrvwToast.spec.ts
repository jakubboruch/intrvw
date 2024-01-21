import IntrvwToast from '@/components/IntrvwToast.vue';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import { shallowMount } from "@vue/test-utils";

const wrapper = shallowMount(IntrvwToast, {
    props: {
        type: 'success'
    },
    slots: {
        default: 'Message'
    }
})

describe('IntrvwToast', () => {
    test('IntrvwToast - mounted', async () => {
        expect(wrapper.exists()).toBe(true)
    });
    test('IntrvwToast - display success message', async () => {
        const content = wrapper.find('.intrvw-toast');
        expect(content.element.textContent).toContain('Message');
        expect(content.classes('intrvw-toast--success')).toBeTruthy();
    });

    test('IntrvwToast - display error message', async () => {
        const props = {
            type: 'error'
        }
        await wrapper.setProps(props);
        await nextTick();
        const content = wrapper.find('.intrvw-toast');
        expect(content.element.textContent).toContain('Message');
        expect(content.classes('intrvw-toast--error')).toBeTruthy();
    });

    test('IntrvwToast - display info message', async () => {
        const props = {
            type: 'info'
        }
        await wrapper.setProps(props);
        await nextTick();
        const content = wrapper.find('.intrvw-toast');
        expect(content.element.textContent).toContain('Message');
        expect(content.classes('intrvw-toast--info')).toBeTruthy();
    });
});