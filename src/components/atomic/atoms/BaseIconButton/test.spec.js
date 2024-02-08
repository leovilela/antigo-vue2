import { shallowMount } from "@vue/test-utils";
import BaseIconButton from "./index";

describe("Component BaseIconButton <base-IconButton />", () => {
  const build = (props) => {
    const wrapper = shallowMount(BaseIconButton, {
      propsData: {
        label: "Enviar",
        ...props,
      },
    });

    return { wrapper };
  };

  const { wrapper } = build();

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("icon-button");
  });

  describe("Component props", () => {
    test("should have a pass label props", () => {
      expect(wrapper.props("label")).toEqual(wrapper.text());
    });

    test("should have a pass icon equal print", () => {
      const { wrapper } = build({ icon: "print" });

      expect(wrapper.props("icon")).toEqual("print");
      expect(wrapper.classes()).toContain("icon-button__print");
    });

    test("should have a pass icon equal email", () => {
      const { wrapper } = build({ icon: "email" });

      expect(wrapper.props("icon")).toEqual("email");
      expect(wrapper.classes()).toContain("icon-button__email");
    });

    test("should have a pass icon equal simulation", () => {
      const { wrapper } = build({ icon: "simulation" });

      expect(wrapper.props("icon")).toEqual("simulation");
      expect(wrapper.classes()).toContain("icon-button__simulation");
    });

    test("should have a pass icon equal financial", () => {
      const { wrapper } = build({ icon: "financial" });

      expect(wrapper.props("icon")).toEqual("financial");
      expect(wrapper.classes()).toContain("icon-button__financial");
    });
  });
});
