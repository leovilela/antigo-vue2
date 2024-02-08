import { shallowMount } from "@vue/test-utils";
import BaseRtypeList from "./index";

describe("Component BaseRtypeList <base-rtypelist />", () => {
  const build = () => {
    const wrapper = shallowMount(BaseRtypeList);

    return {
      wrapper,
    };
  };

  const { wrapper } = build();

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("rtype-list");
  });
});
