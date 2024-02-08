import { mount } from "@vue/test-utils";
import SelectGroup from "../BaseSelectGroup/SelectGroup";

const factory = () => mount(SelectGroup, {
  propsData: {
    selectgroup: {
      id: 1,
      options: [],
    },
  },
  stubs: ["Base-Select"],
});

describe("SelectGroup", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
