import { shallowMount } from "@vue/test-utils";
import BaseBanner from "./index";
import BaseButton from "../../atoms/BaseButton";

describe("Component BaseBanner <Base-Banner>", () => {
  const wrapper = shallowMount(BaseBanner, {
    stubs: {
      'Base-Button': BaseButton,
    },
  });

  beforeEach(() => wrapper.destroy());

  test("Mount base component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("banner");
  });

  describe("Check a childs", () => {
    test("should have a exist button", () => {
      const button = () => wrapper.find(BaseButton);

      expect(button()).toBeTruthy()
    });
  });

  describe("Check a informations", () => {
    test("should have a validate informations", () => {
      expect(wrapper.find(".banner__paragraph").exists()).toBe(true);
      expect(wrapper.find(".banner__strong").exists()).toBe(true);
      expect(wrapper.find(".banner__info").exists()).toBe(true);
    });
  });
});

