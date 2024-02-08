import { shallowMount } from "@vue/test-utils";
import Modal from "../BaseModal/modal";

const factory = () => shallowMount(Modal, {
  stubs: ["Base-Modal"],
});

describe("Modal", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
