import { shallowMount } from "@vue/test-utils";
import BaseTab from "./index";

describe("Component BaseTab <base-tab />", () => {
  const build = () => {
    const wrapper = shallowMount(BaseTab);

    return {
      wrapper,
      title: wrapper.find("ul"),
      content: wrapper.find("section"),
    };
  };

  const { wrapper, title, content } = build();

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe("should have a pass component props", () => {
    test("should have a component base title", () => {
      expect(title.exists()).toBe(true);
    });

    test("should have a component base title", () => {
      expect(content.exists()).toBe(true);
    });
  });
});
