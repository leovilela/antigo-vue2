import { shallowMount } from "@vue/test-utils";
import BaseUserSupport from "./index";

describe("Component BaseUserSupport <base-user-support />", () => {
  const wrapper = shallowMount(BaseUserSupport, {
    mocks: {
      $t: () => { },
    },
  });

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-user-support");
  });
});
