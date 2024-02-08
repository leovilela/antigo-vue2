import { mount } from "@vue/test-utils";
import Select from "../BaseSelect/select";

const factory = () => mount(Select, {
  propsData: {
    selectgroup: {
      id: 1,
      options: [],
    },
  },
});

describe("Select", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
