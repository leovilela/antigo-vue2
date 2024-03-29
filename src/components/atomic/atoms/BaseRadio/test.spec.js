import { shallowMount } from '@vue/test-utils'
import LRadio from './index'

let wrapper

describe('Component BaseRadio <base-radio />', () => {
  beforeEach(() => {
    wrapper = shallowMount(LRadio)
  })
  afterEach(() => {
    wrapper.destroy()
  })

  it('is called', () => {
    expect(wrapper.name()).toBe('LRadio')
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has an input radio', () => {
    expect(wrapper.contains('label input[type=radio]')).toBeTruthy()
  })

  it('emit input event with value when value change', () => {
    wrapper.setProps({ value: true })
    expect(wrapper.vm.value).toBeTruthy()
    wrapper.vm.computedValue = false
    const valueEmitted = wrapper.emitted()['input'][0]
    expect(valueEmitted).toContainEqual(false)
  })

  it('method focus() gives focus to the input element', (done) => {
    wrapper.vm.$refs.input.focus = jest.fn()
    wrapper.vm.focus()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled()
      done()
    })
  })
})
