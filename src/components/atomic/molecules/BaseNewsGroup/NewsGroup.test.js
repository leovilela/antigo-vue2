import { mount } from "@vue/test-utils"
import BaseNewsGroup from "./index"
let wrapper

describe("Component BaseNewsGroup <base-news-group />", () => {
  beforeEach(() => {
    wrapper = mount(BaseNewsGroup);
  })

  afterEach(() => {
    wrapper.destroy();
  });

  it("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-news-group");
  });
})
