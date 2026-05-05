import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'

import App from '@/app/App.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/projects', name: 'projects', component: { template: '<div>Projects</div>' } },
  ],
})

describe('App', () => {
  it('mounts with header and outlet', async () => {
    const pinia = createPinia()
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [pinia, router],
      },
    })

    expect(wrapper.text()).toContain('portfolio')
    expect(wrapper.find('header').exists()).toBe(true)
  })
})
