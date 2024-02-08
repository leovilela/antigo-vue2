import { shallowMount } from "@vue/test-utils";
import AutoComplete from "../BaseAutoComplete/autocomplete";

const factory = () => shallowMount(AutoComplete, {
  propsData: {
    list: [],
  },
  stubs: ["Base-Input"],
});

describe("AutoComplete", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
