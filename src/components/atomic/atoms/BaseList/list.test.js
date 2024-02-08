import { shallowMount } from "@vue/test-utils";
import List from "../BaseList/list";

const factory = () => shallowMount(List, {
  stubs: ["Base-List"],
});

describe("List", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
