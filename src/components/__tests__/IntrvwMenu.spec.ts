import IntrvwMenu from '@/components/IntrvwMenu.vue';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import { shallowMount } from "@vue/test-utils";
import {IMenuItem} from "@/interfaces/menu";

const wrapper = shallowMount(IntrvwMenu, {
    props: {
        menuItems: []
    }
})

describe('IntrvwMenu', () => {
    test('IntrvwMenu - mounted', async () => {
        expect(wrapper.exists()).toBe(true)
    });
    test('IntrvwMenu - all menu items rendered', async () => {
        const props = {
            menuItems: [{ path: '/1', name: '1'}, { path: '/2', name: '2'}] as IMenuItem[]
        }
        await wrapper.setProps(props);
        await nextTick();
        const content = wrapper.find('.intervw-menu');
        expect(content.element.textContent).toContain(props.menuItems.map((item: IMenuItem) => item.name).join(''));
    });
});