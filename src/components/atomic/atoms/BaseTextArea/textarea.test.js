import { shallowMount } from "@vue/test-utils";
import TextArea from "../BaseTextArea/textarea";

const factory = () => shallowMount(TextArea, {});

describe("TextArea", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
