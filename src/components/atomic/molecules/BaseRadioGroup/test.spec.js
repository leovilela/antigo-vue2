import { shallowMount } from "@vue/test-utils"
import LRadioGroup from "./index"
let wrapper

describe("Component BaseRadioGroup <base-radio-group />", () => {
  beforeEach(() => {
    wrapper = shallowMount(LRadioGroup, {
      stubs: {
        'Base-Radio': '<div class="base-radio" />'
      },
      propsData: {
        radios: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" }
        ]
      }
    })
  })

  afterEach(() => {
    wrapper.destroy();
  })

  it("is called", () => {
    expect(wrapper.name()).toBe("LRadioGroup")
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it("render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("has exact same number of elements of radios prop", () => {
    const radiosWrapper = wrapper.findAll(".base-radio")
    expect(wrapper.vm.radios).toHaveLength(3)
    expect(radiosWrapper).toHaveLength(3)
  })
})
