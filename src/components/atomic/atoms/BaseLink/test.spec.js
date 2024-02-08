import { shallowMount } from "@vue/test-utils";
import BaseLink from "./index";


describe("Component BaseLink <base-link />", () => {
  const build = (props) => {
    const wrapper = shallowMount(BaseLink, {
      propsData: {
        label: "Sou Listo",
        url: "https://soulisto.com.br",
        ...props,
      },
    });

    return { wrapper };
  };

  const { wrapper } = build({});

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-link");
  });

  describe("should have a set props values", () => {
    test("should have a pass label props", () => {
      expect(wrapper.props("label")).toEqual(wrapper.text());
      expect(wrapper.props("label")).toEqual(wrapper.attributes("title"));
    });

    test("should have a pass url props", () => {
      expect(wrapper.props("url")).toEqual(wrapper.attributes("href"));
    });

    test("should have a pass target props", () => {
      const { wrapper } = build({ target: true });

      expect(wrapper.props("target")).toBe(true);
      expect(wrapper.attributes("target")).toEqual("_blank");
    });
  });
});
