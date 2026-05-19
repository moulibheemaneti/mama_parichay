<script setup lang="ts">
defineProps<{
  label: string
  id: string
}>()
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <slot />
  </div>
</template>
