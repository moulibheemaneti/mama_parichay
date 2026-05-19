<script setup lang="ts">
import type { WizardStep } from '~/types/biodata'

const props = defineProps<{
  currentStep: WizardStep
}>()

const emit = defineEmits<{
  navigate: [step: WizardStep]
}>()

const steps = [
  { id: 1 as WizardStep, label: 'Personal Details' },
  { id: 2 as WizardStep, label: 'Choose Template' },
  { id: 3 as WizardStep, label: 'Preview & Download' },
]

function stepClass(stepId: WizardStep) {
  return {
    active: props.currentStep === stepId,
    done: props.currentStep > stepId,
  }
}
</script>

<template>
  <nav class="steps-bar" aria-label="Biodata creation steps">
    <button
      v-for="step in steps"
      :key="step.id"
      type="button"
      class="step-item"
      :class="stepClass(step.id)"
      @click="emit('navigate', step.id)"
    >
      <span class="num">{{ step.id }}</span>
      {{ step.label }}
    </button>
  </nav>
</template>
