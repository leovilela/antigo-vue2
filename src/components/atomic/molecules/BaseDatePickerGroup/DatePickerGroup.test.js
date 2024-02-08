import { shallowMount } from "@vue/test-utils";
import DatePickerGroup from "../BaseDatePickerGroup/DatePickerGroup";

const factory = () => shallowMount(DatePickerGroup, {
  stubs: ["date-picker"],
});

describe("DatePickerGroup", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
