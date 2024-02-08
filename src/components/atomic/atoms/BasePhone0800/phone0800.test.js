import { shallowMount } from "@vue/test-utils";
import BasePhone0800 from "./index";

describe("Component BasePhone0800 - <phone0800>", () => {
  const build = (props) => {
    const wrapper = shallowMount(BasePhone0800, {
      propsData: { ...props },
    });

    return {
      wrapper,
      
    };
  };

  const phone0800 = "0800.942.1835";

  const { wrapper } = build();
  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-phone0800");
  });

  describe("should have a pass component props", () => {
    test("should have a pass props phoneNumber", () => {
      const { wrapper } = build({ phone0800 });
      expect(wrapper.props("phoneNumber")).toEqual(wrapper.text());
    });
  });
});

