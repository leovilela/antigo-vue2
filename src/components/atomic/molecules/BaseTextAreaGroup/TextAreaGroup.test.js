import { shallowMount } from "@vue/test-utils";
import TextAreaGroup from "../BaseTextAreaGroup/TextAreaGroup";

const factory = () => shallowMount(TextAreaGroup, {
  stubs: ["Base-Textarea"],
});

describe("TextAreaGroup", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
