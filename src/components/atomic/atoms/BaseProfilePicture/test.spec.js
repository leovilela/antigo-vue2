import { shallowMount } from "@vue/test-utils";
import BaseProfilePicture from "./index";

describe("Component BaseProfilePicture <base-profile-picture />", () => {
  const build = (props) => {
    const wrapper = shallowMount(BaseProfilePicture, {
      propsData: { ...props },
    });

    return {
      wrapper,
      image: wrapper.find("img"),
      caption: wrapper.find("figcaption"),
    };
  };

  const source = "https://soulisto.com.br/picture.png";
  const alt = "Logotipo";

  const { wrapper, image } = build({ source });

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-profile-picture");
  });

  describe("should have a pass component props", () => {
    test("should have a pass props source", () => {
      expect(wrapper.props("source")).toEqual(image.attributes("src"));
      expect(image.classes()).toContain("base-profile-picture__image");
    });

    test("should have a pass props source", () => {
      const { wrapper, image, caption } = build({ source, alt });

      expect(wrapper.props("alt")).toEqual(image.attributes("alt"));
      expect(wrapper.props("alt")).toEqual(caption.text());
    });
  });
});
