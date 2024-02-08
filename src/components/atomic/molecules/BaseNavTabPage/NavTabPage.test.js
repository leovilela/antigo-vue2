import { mount } from "@vue/test-utils";
import BaseProgress from "./index";

describe("Component BaseNavTabPage <base-nav-tab-page />", () => {
  const build = (props) => {
    const wrapper = mount(BaseProgress, {
      propsData: { ...props },
    });

    return {
      wrapper,
    };
  };

  const components = [
      {
          name: "teste-1",
          alias: "test"
      },
      {
          name: "teste-2",
          alias: "test",
          show: true,
      },
      {
          name: "teste-3",
          alias: "test"
      },

  ];
  const { wrapper } = build();

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-nav-tab-page");
    expect(wrapper.find(".base-nav-tab-page__navigation").exists()).toBe(true);
    expect(wrapper.find(".base-nav-tab-page__content").exists()).toBe(true);
  });
  describe("should have a pass component props", () => {
    const { wrapper } = build({components});
    test("should have a pass prop components", () => {
      expect(Array.isArray(wrapper.props("components"))).toBe(true);
    });

    test("should exact same number of elements of components prop", () => {
      expect(wrapper.props("components")).toHaveLength(3)
    });
    
  });
});
