<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { Github, Linkedin, Menu, Moon, Sun, X } from 'lucide-vue-next'
import { useDark, useToggle, onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'


import { Button } from '@/shared/ui/button'
import { RouteNames } from '@/app/router'
import { Separator } from '@/shared/ui/separator'

const headerRef = useTemplateRef<HTMLDivElement>('headerRef')
const route = useRoute()
const open = ref(false)

type NavItem = {
  label: string
  to: RouteLocationRaw
  /** `home` = no hash on `/`; otherwise exact `route.hash` */
  section: 'home' | string
}

const nav = computed((): NavItem[] => [
  { label: 'home', to: { name: RouteNames.HOME }, section: 'home' },
  { label: 'skills', to: { name: RouteNames.HOME, hash: '#skills' }, section: '#skills' },
  { label: 'projects', to: { name: RouteNames.HOME, hash: '#projects' }, section: '#projects' },
  { label: 'experience', to: { name: RouteNames.HOME, hash: '#experience' }, section: '#experience' },
  { label: 'contact', to: { name: RouteNames.HOME, hash: '#contact' }, section: '#contact' },
])

const pages = [
  { label: 'all projects', to: { name: RouteNames.PROJECTS } },
  { label: 'all skills', to: { name: RouteNames.SKILLS } },
  { label: 'profile', to: { name: RouteNames.PROFILE } },
]

function isSectionActive(section: NavItem['section']) {
  if (route.name !== RouteNames.HOME) return false
  const h = route.hash || ''
  if (section === 'home') return h === '' || h === '#'
  return h === section
}

const isDark = useDark()
const toggleDark = useToggle(isDark);

function closeMenu() {
  open.value = false
}

onClickOutside(headerRef, () => {
  if (open.value) {
    open.value = false
  }
  console.log('clicked outside')
})
</script>

<template>
  <header ref="headerRef" class="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
      <RouterLink to="/"
        class="font-display text-xl font-bold tracking-widest text-foreground uppercase flex items-center gap-2 group">
        <span
          class="size-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))] transition-transform group-hover:scale-125"></span>
        PORTFOLIO
      </RouterLink>

      <nav
        class="hidden items-center grow-0 md:grow-[1] lg:grow-0 md:gap-2 lg:gap-8 md:flex flex-col md:flex-col lg:flex-row"
        aria-label="Primary">
        <section class="flex items-center gap-4">
          <RouterLink v-for="item in nav" :key="item.label" :to="item.to"
            class="text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            :class="isSectionActive(item.section) && 'text-primary'">
            {{ item.label }}
          </RouterLink>
        </section>

        <span class="w-3/4 max-w-md h-px bg-border lg:w-px lg:h-5" />

        <section class="flex items-center gap-4">
          <RouterLink v-for="p in pages" :key="p.to.name" :to="p.to"
            class="text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            :class="route.name === p.to.name && 'text-primary'">
            {{ p.label }}
          </RouterLink>
        </section>

        <div class="hidden items-center gap-1 lg:flex">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"
            class="inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <Github class="size-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
            class="inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <Linkedin class="size-5" />
          </a>
        </div>
      </nav>

      <Button variant="outline" size="icon" class="md:hidden cursor-pointer" aria-label="Menu" @click="open = !open">
        <Menu v-if="!open" class="size-5" />
        <X v-else class="size-5" />
      </Button>
    </div>

    <div v-if="open"
      class="absolute top-full left-0 w-full bg-background border-t shadow-md border-border/60 px-4 py-4 md:hidden">
      <div class="flex flex-col gap-3 [&>a:hover]:text-primary">
        <RouterLink v-for="item in nav" :key="`m-${item.label}`" :to="item.to"
          class="text-sm font-medium uppercase tracking-widest text-muted-foreground" @click="closeMenu">
          {{ item.label }}
        </RouterLink>
        <Separator />
        <RouterLink v-for="p in pages" :key="`mp-${p.to.name}`" :to="p.to"
          class="text-sm font-medium uppercase tracking-widest text-muted-foreground" @click="closeMenu">
          {{ p.label }}
        </RouterLink>
        <Button variant="outline" size="icon" class="relative cursor-pointer" aria-label="Theme Toggle"
          @click="toggleDark()">
          <Sun class="size-5 transition-all duration-200"
            :class="isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'" />
          <Moon class="absolute size-5 transition-all duration-200"
            :class="isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'" />
        </Button>
      </div>
    </div>
  </header>
</template>
