
import { shallowMount } from "@vue/test-utils";
import BaseExpedient from "./index";

describe("Component BaseExpedient <expedient />", () => {
  const build = (props) => {
    const wrapper = shallowMount(BaseExpedient, {
      propsData: { ...props },
    });

    return {
      wrapper,
    };
  };

  const weekHours = "2ª à 6ª, das 8h às 20h";
  const weekendHours = "Sábados. das 8h às 20h";

  const { wrapper } = build();
  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-expedient");
    expect(wrapper.contains("p")).toBe(true);
  });

  describe("should have a pass component props", () => {
    test("should have a pass props expedientWeek", () => {
      const { wrapper } = build({ weekHours, weekendHours });
      expect(wrapper.props("expedientWeek")).toEqual(wrapper.find("p:first-of-type").text());
    });
    test("should have a pass props expedientWeekend", () => {
      const { wrapper } = build({ weekHours, weekendHours });
      expect(wrapper.props("expedientWeekend")).toEqual(wrapper.find("p:last-of-type").text());
    });
  });
});
