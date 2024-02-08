import { shallowMount } from "@vue/test-utils";
import BaseCommercialGroup from "./index";
import BaseLink from "../../atoms/BaseLink";


describe("Component BaseCommercialGroup <base-comercial-container />", () => {
  const build = () => {
    const wrapper = shallowMount(BaseCommercialGroup, {
      propsData: {
        email: "lindomar@soulisto.com",
        phone: "1160607070",
      },
    });

    return {
      wrapper,
      link: () => wrapper.find(BaseLink),
    };
  };

  const { wrapper, email, phone } = build();

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-commercial-group");
  });

  describe("should have a use components base", () => {
    test("should have a component link", () => {
      const { link } = build();
      expect(link().exists()).toBe(true);
    });
  });
});
