import { shallowMount } from "@vue/test-utils";
import reportList from "./index";

import BaseReport from "../../atoms/BaseReport";

describe("Component reportList - <Base-ReportList>", () => {
  const wrapper = shallowMount(reportList, {
    stubs: {
      'Base-Report': BaseReport,
    },
    propsData: {
      list: ["title", "name"],
    }
  });

  afterEach(() => wrapper.destroy());

  describe("Mount the component", () => {
    test("should have render the main component", () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
      expect(wrapper.classes()).toContain("base-report-list");
    });
  });

  // describe("Set a props", () => {
  //   test("should have the title props", () => {
  //     expect(wrapper.props("list")).toHaveLength(2);
  //   });
  // });
});