import { shallowMount } from "@vue/test-utils";
import BaseInput from '../../atoms/BaseInput'

describe("Component BaseFormCustomGroup <base-form-custom-group />", () => {
  const build = () => {
    const wrapper = shallowMount(BaseFormCustomGroup, {
      propsData: {
        inputs: [{value: 'a'}]
      },
    });

    return {
      wrapper,
      input: () => wrapper.find(BaseInput),
      increseButton: () => wrapper.find()
    };
  };

  const { wrapper} = build();

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-form-custom-group");
  });

  describe("should have a use components base", () => {
    test("should have a component input", () => {
      const { input } = build();
      expect(input().exists()).toBe(true);
    });
  });
  describe("should emit events", () => {
    test("should emit input", () => {
      const { input } = build();
      expect(input().exists()).toBe(true);
      input().trigger('input', 'kiko')
      const valueEmitted = wrapper.emitted()['input'][0]
      expect(valueEmitted).toDeepEqual([{value: 'a'}])
    });
  });
});
