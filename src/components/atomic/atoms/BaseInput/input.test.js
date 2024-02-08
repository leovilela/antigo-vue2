import { shallowMount } from "@vue/test-utils";
import Input from "../BaseInput/input";

describe("Component BaseInput - <input>", () => {
  let wrapper;

  afterEach(() => wrapper.destroy());

  describe("Mount the component", () => {
    wrapper = shallowMount(Input);

    test("should have render the main component", () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
      expect(wrapper.classes()).toContain("base-input");
    });
  });

  describe("Change component type", () => {
    test("should have the component type is text", () => {
      wrapper = shallowMount(Input, {
        propsData: {
          type: "text",
        },
      });

      expect(wrapper.classes()).toContain("base-input--text");
    });

    test("should have the component type is number", () => {
      wrapper = shallowMount(Input, {
        propsData: {
          type: "number",
        },
      });

      expect(wrapper.classes()).toContain("base-input--number");
    });

    test("should have the component type is email", () => {
      wrapper = shallowMount(Input, {
        propsData: {
          type: "email",
        },
      });

      expect(wrapper.classes()).toContain("base-input--email");
    });

    test("should have the component type is password", () => {
      wrapper = shallowMount(Input, {
        propsData: {
          type: "password",
        },
      });

      expect(wrapper.classes()).toContain("base-input--password");
    });
  });
});
