<script setup lang="ts">
import HeaderWidget from '@/widgets/header/ui/HeaderWidget.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <HeaderWidget />
    <RouterView />
  </div>
</template>
