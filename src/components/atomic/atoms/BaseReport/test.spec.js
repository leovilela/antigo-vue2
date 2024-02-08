import { shallowMount } from "@vue/test-utils";
import report from "./index";

describe("Component report - <Base-Report>", () => {
  const wrapper = shallowMount(report, {
    propsData: {
      title: "Razão Social",
      content: "Izac Auto Peças"
    }
  });

  afterEach(() => wrapper.destroy());

  describe("Mount the component", () => {
    test("should have render the main component", () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
      expect(wrapper.classes()).toContain("base-report");
    });
  });

  describe("Set a props", () => {
    test("should have the title props", () => {
      const title = wrapper.find(".base-report__title");

      expect(wrapper.props("title")).toEqual(title.text());
    });

    test("should have the content props", () => {
      const content = wrapper.find(".base-report__content");

      expect(wrapper.props("content")).toEqual(content.text());
    });
  });
});