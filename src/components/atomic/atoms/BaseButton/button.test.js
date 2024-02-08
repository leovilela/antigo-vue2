import {
  shallowMount,
} from "@vue/test-utils";
import Button from "../BaseButton/button";

const factory = () => shallowMount(Button, {});

describe("Button", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
