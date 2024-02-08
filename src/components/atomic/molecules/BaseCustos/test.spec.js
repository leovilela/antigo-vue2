import { shallowMount } from "@vue/test-utils"
import BaseCustos from "./index"

let wrapper

describe("Component BaseCustos <base-custos />", () => {
  beforeEach(() => {
    wrapper = shallowMount(BaseCustos)
  })

  afterEach(() => {
    wrapper.destroy();
  })


  it('is called', () => {
    expect(wrapper.name()).toBe('LCustos')
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })


})
