<script setup lang="ts">
import type { BiodataData, TemplateId } from '~/types/biodata'

defineProps<{
  previewHtml: string
  biodataData: BiodataData
  selectedTemplate: TemplateId
  photoDataUrl: string | null
  isDownloading: boolean
}>()

const emit = defineEmits<{
  back: []
  download: []
}>()
</script>

<template>
  <div class="preview-panel">
    <h2 class="page-title">Preview & Download</h2>
    <p class="page-subtitle">Your biodata is ready — review and download as PDF</p>

    <div class="preview-actions">
      <button type="button" class="btn btn--outline" @click="emit('back')">← Change Template</button>
      <button
        type="button"
        class="btn btn--download"
        :disabled="isDownloading"
        @click="emit('download')"
      >
        {{ isDownloading ? 'Generating…' : '⬇ Download PDF' }}
      </button>
    </div>

    <div class="preview-wrapper">
      <div class="biodata-preview" v-html="previewHtml" />
    </div>
  </div>
</template>
