import { shallowMount } from "@vue/test-utils";
import DadosListo from "./DadosListo";

describe("Component BaseDadosListo - <dados-listo>", () => {
    const build = () => {
        const wrapper = shallowMount(DadosListo, {
            mocks: {
                $t: () => { },
            },
        });
        return {
            wrapper
        };
    };
    const { wrapper } = build();
    afterEach(() => wrapper.destroy());
    describe("Mount the component", () => {
        test("should have render the main component", () => {
            expect(wrapper.isVueInstance()).toBeTruthy();
            expect(wrapper.classes()).toContain("dados-listo");
        });
    });
});
