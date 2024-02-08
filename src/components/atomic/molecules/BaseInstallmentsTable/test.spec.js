import { shallowMount } from "@vue/test-utils"
import BaseInstallmentsTable from "./index"
let wrapper

describe("Component BaseInstallmentsTable <base-installment-table />", () => {
  beforeEach(() => {
    wrapper = shallowMount(BaseInstallmentsTable)
  })

  afterEach(() => {
    wrapper.destroy();
  })

  it('is called', () => {
    expect(wrapper.name()).toBe('LInstallmentTable')
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

})
