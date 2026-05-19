<script setup lang="ts">
import type { TemplateId } from '~/types/biodata'
import { TEMPLATE_LABELS } from '~/constants/form-options'

const props = defineProps<{
  templateId: TemplateId
  selected: boolean
}>()

const emit = defineEmits<{
  select: [id: TemplateId]
}>()
</script>

<template>
  <button
    type="button"
    class="template-card"
    :class="{ selected }"
    @click="emit('select', templateId)"
  >
    <span class="template-card__badge">✓ Selected</span>
    <div class="template-card__preview">
      <TemplatePreviewSvg :template-id="templateId" />
    </div>
    <div class="template-card__label">{{ TEMPLATE_LABELS[templateId] }}</div>
  </button>
</template>
