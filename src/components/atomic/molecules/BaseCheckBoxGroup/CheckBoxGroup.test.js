import { shallowMount } from "@vue/test-utils";
import CheckBoxGroup from "../BaseCheckBoxGroup/CheckBoxGroup";

const factory = () => shallowMount(CheckBoxGroup, {
  stubs: ["Base-Checkbox"],
});

describe("CheckBoxGroup", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
