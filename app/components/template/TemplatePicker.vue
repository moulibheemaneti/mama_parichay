<script setup lang="ts">
import type { TemplateId } from '~/types/biodata'

defineProps<{
  selectedTemplate: TemplateId
  hasPhoto: boolean
  subtitle: string
}>()

const emit = defineEmits<{
  select: [id: TemplateId]
  back: []
  preview: []
}>()

const noPhotoTemplates: TemplateId[] = [1, 2, 3]
const photoTemplates: TemplateId[] = [4, 5, 6]
</script>

<template>
  <div class="template-picker">
    <h2 class="page-title">Choose a Template</h2>
    <p class="page-subtitle">{{ subtitle }}</p>

    <div v-if="hasPhoto" class="template-group-label">Without Photo</div>
    <div class="templates-grid">
      <TemplateCard
        v-for="id in noPhotoTemplates"
        :key="id"
        :template-id="id"
        :selected="selectedTemplate === id"
        @select="emit('select', $event)"
      />
    </div>

    <template v-if="hasPhoto">
      <div class="template-group-label template-group-label--highlight">With Photo</div>
      <div class="templates-grid">
        <TemplateCard
          v-for="id in photoTemplates"
          :key="id"
          :template-id="id"
          :selected="selectedTemplate === id"
          @select="emit('select', $event)"
        />
      </div>
    </template>

    <div class="btn-row">
      <button type="button" class="btn btn--outline" @click="emit('back')">← Back</button>
      <button type="button" class="btn btn--primary" @click="emit('preview')">Preview Biodata →</button>
    </div>
  </div>
</template>
