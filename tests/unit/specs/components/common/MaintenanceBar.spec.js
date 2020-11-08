import { shallowMount } from "@vue/test-utils"
import MaintenanceBar from "common/MaintenanceBar"

describe(`MaintenanceBar`, () => {
  let wrapper
  beforeEach(async () => {
    wrapper = shallowMount(MaintenanceBar)
  })

  it(`has the expected html structure`, () => {
    wrapper.setData({
      maintenance: [
        {
          message: "success test message",
          barType: "success",
          show: true,
        },
      ],
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it(`show success message`, () => {
    wrapper.setData({
      maintenance: [
        {
          message: "success test message",
          barType: "success",
          show: true,
        },
      ],
    })
    expect(wrapper.text()).toBe("success test message")
  })

  it(`show warning message`, () => {
    wrapper.setData({
      maintenance: [
        {
          message: "warning test message",
          barType: "warning",
          show: true,
        },
      ],
    })
    expect(wrapper.text()).toBe("warning test message")
  })

  it(`show danger message`, () => {
    wrapper.setData({
      maintenance: [
        {
          message: "danger test message",
          barType: "danger",
          show: true,
        },
      ],
    })
    expect(wrapper.text()).toBe("danger test message")
  })
})
