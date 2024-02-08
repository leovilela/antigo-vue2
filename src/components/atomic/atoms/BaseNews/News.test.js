import { mount } from "@vue/test-utils";
import BaseNews from "./index";

describe("Component BaseNews <base-news />", () => {
  const build = (props) => {
    const wrapper = mount(BaseNews, {
      propsData: { ...props },
    });

    return {
      wrapper,
    };
  };

  const newsDate = "10.09.2019 - 18h15";
  const newTitle = "Novidades Listo Fácil.";
  const newsContent = "Curabitur eu purus in turpis auctor tincidunt id at metus. Sed euismod ut lorem in tempus. Donec placerat, . Saiba mais.";
  const newsUrl = "https://www.listofacil.com.br/";

  const { wrapper } = build({ newsDate, newTitle, newsContent, newsUrl });

  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-news");
    expect(wrapper.contains("span")).toBe(true);
    expect(wrapper.contains("h2")).toBe(true);
    expect(wrapper.contains("p")).toBe(true);
    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.find("span").classes()).toContain("base-news__date");
    expect(wrapper.find("h2").classes()).toContain("base-news__title");
    expect(wrapper.find("p:first-of-type").classes()).toContain("base-news__content", "base-news__content-short");
    expect(wrapper.find("a").classes()).toContain("base-news__readmore");
    expect(wrapper.find("p:last-of-type").classes()).toContain("base-news__content", "base-news__content-full");
  });

  describe("should have a pass component props", () => {
    test("should have a pass props date", () => {
      expect(wrapper.props("date")).toEqual(wrapper.find(".base-news__date").text());
    });
    test("should have a pass props title", () => {
      expect(wrapper.props("title")).toEqual(wrapper.find(".base-news__title").text());
    });

    test("should have a pass props content", () => {
      expect(wrapper.find(".base-news__content").text()).toContain(wrapper.props("content"));
    });
  });

});
