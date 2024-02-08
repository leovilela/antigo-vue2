import { shallowMount } from "@vue/test-utils";
import FormGroup from "../BaseFormGroup/FormGroup";

const factory = () => shallowMount(FormGroup, {
  stubs: ["Base-Input"],
});

describe("FormGroup", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
