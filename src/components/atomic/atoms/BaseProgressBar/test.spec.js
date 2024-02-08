import { mount } from "@vue/test-utils";
import BaseProgress from "./index";

describe("Component BaseProgress <base-progress />", () => {
  const build = (props) => {
    const wrapper = mount(BaseProgress, {
      propsData: { ...props },
    });

    return {
      wrapper,
    };
  };

  const type = "creditLimit";
  const { wrapper } = build();

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
