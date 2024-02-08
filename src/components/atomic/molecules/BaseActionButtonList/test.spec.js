import { shallowMount } from "@vue/test-utils";
import BaseActionButtonList from "./index";
import BaseIconButton from "../../atoms/BaseIconButton";

describe("Component BaseIconButton <base-IconButton />", () => {
  const build = () => {
    const wrapper = shallowMount(BaseActionButtonList);

    return {
      wrapper,
      button: () => wrapper.find(BaseIconButton),
    };
  };

  const { wrapper, button } = build();

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("action-button-list");
  });
});
