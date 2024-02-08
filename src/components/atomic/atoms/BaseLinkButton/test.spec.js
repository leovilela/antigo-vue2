import { shallowMount } from "@vue/test-utils";
import BaseLinkButton from "./index";

describe("Component BaseLinkButton <base-link-button />", () => {
  const wrapper = shallowMount(BaseLinkButton, {
    propsData: {
      label: "Alterar foto",
    },
  });

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-link-button");
  });

  describe("should have a pass component props", () => {
    test("should have a pass props label", () => {
      expect(wrapper.props("label")).toEqual(wrapper.text());
    });
  });

  describe("should have a emmited event click", () => {
    wrapper.trigger("click");
    expect(wrapper.emitted().click[0]).toContain(wrapper.props("label"));
  });
});
