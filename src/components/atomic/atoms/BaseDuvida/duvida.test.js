import { shallowMount } from "@vue/test-utils";
import BaseDuvida from "./index";

describe("Component BaseDuvida - <duvida>", () => {
  const build = (props) => {
    const wrapper = shallowMount(BaseDuvida, {
      propsData: { ...props },
    });

    return {
      wrapper,
    };
  };

  const text = "Dúvidas?";

  const { wrapper } = build();
  beforeEach(() => wrapper.destroy());

  test("mount the component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain("base-duvida");
    expect(wrapper.contains("p")).toBe(true);
    expect(wrapper.find("p").classes()).toContain("base-duvida__text");

  });

  describe("should have a pass component props", () => {
    test("should have a pass props text", () => {
      const { wrapper } = build({ text });
      expect(wrapper.props("text")).toEqual(wrapper.find("p").text());
    });
  });
});


// describe("Component BaseDuvida - <duvida>", () => {
//   const build = () => {
//     const wrapper = shallowMount(Duvida, {
//       mocks: {
//         $t: () => "Duvidas?",
//       },
//     });

//     return {
//       wrapper,
//     };
//   };

//   const { wrapper } = build();

//   afterEach(() => wrapper.destroy());

//   describe("Mount the component", () => {
//     test("should have render the main component", () => {
//       expect(wrapper.isVueInstance()).toBeTruthy();
//       expect(wrapper.classes()).toContain("base-duvida");
//     });
//     test("should have render the p child element of the main component", () => {
//       expect(wrapper.find("p").exists()).toBe(true);
//       expect(wrapper.find("p").classes()).toContain("base-duvida__text");
//     });

//     test("should not have render the empty content", () => {
//       expect(wrapper.text().length).toBeGreaterThan(1);
//     });
//   });
// });
