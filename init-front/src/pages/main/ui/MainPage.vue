<script setup lang="ts">
import HeroSection from '@/widgets/hero-section/ui/HeroSection.vue'
import SkillsSection from '@/widgets/skills-section/ui/SkillsSection.vue'
import ProjectsSection from '@/widgets/projects-section/ui/ProjectsSection.vue'
import ExperienceSection from '@/widgets/experience-section/ui/ExperienceSection.vue'
import ContactSection from '@/widgets/contact-section/ui/ContactSection.vue'
</script>

<template>
  <div>
    <main>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
    <footer class="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
      Built with Vue 3 · Pinia · Tailwind · json-server
    </footer>
  </div>
</template>
