import { shallowMount } from "@vue/test-utils";
import BaseUserDataGroup from "./index";
import BaseProfilePicture from "../../atoms/BaseProfilePicture";
import BaseLinkButton from "../../atoms/BaseLinkButton";

describe("Component BaseUserDataGroup <base-user-data-group />", () => {
  const build = () => {
    const wrapper = shallowMount(BaseUserDataGroup, {
      mocks: {
        $t: () => {},
      },
      propsData: {
        id: "1000",
        name: "Lindomar Clebersom",
        user: "lindomar.cleber",
        picture: {
          source: "http://www.diabo.com/candle_data/images/14121715180.142416507545025.jpg",
          alt: "Usuario",
        },
      },
    });

    return {
      wrapper,
      image: () => wrapper.find(BaseProfilePicture),
      button: () => wrapper.find(BaseLinkButton),
      id: wrapper.find(".base-user-data-group__id"),
      name: wrapper.find(".base-user-data-group__name"),
      user: wrapper.find(".base-user-data-group__user"),
    };
  };

  const { wrapper } = build();

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-user-data-group");
  });

  describe("should have a use components base", () => {
    test("should have a component image", () => {
      const { image } = build();
      expect(image().exists()).toBe(true);
    });

    test("should have a component button", () => {
      const { button } = build();
      expect(button().exists()).toBe(true);
    });
  });

  describe("should have a set props values", () => {
    test("should have a data client props", () => {
      const { id, name, user } = build();

      expect(wrapper.props("name")).toEqual(name.text());
      expect(wrapper.props("id")).toEqual(id.text());
      expect(wrapper.props("user")).toEqual(user.text());
    });

    test("should a picture props", () => {
      expect(wrapper.props("picture")).toHaveProperty("source");
      expect(wrapper.props("picture")).toHaveProperty("alt");
    });
  });
});
