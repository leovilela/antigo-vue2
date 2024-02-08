import { shallowMount } from "@vue/test-utils";
import Checkbox from "../BaseCheckbox/checkbox";

const factory = () => shallowMount(Checkbox, {
  stubs: ["Base-Input"],
});

describe("Checkbox", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
