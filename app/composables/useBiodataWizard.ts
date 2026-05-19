import { createEmptyForm, formToBiodataData } from '~/utils/biodata/format'
import { buildBiodata } from '~/utils/biodata/builders'
import type { BiodataForm, TemplateId, WizardStep } from '~/types/biodata'

export function useBiodataWizard() {
  const currentStep = ref<WizardStep>(1)
  const selectedTemplate = ref<TemplateId>(1)
  const photoDataUrl = ref<string | null>(null)
  const form = reactive<BiodataForm>(createEmptyForm())

  const hasPhoto = computed(() => Boolean(photoDataUrl.value))

  const templateSubtitle = computed(() =>
    hasPhoto.value
      ? 'Choose from 6 designs — 3 with your photo, 3 without'
      : 'Three South Indian wedding-style designs — each with its own grace',
  )

  const biodataData = computed(() => formToBiodataData(form))

  const previewHtml = computed(() =>
    buildBiodata(biodataData.value, selectedTemplate.value, photoDataUrl.value),
  )

  function validateName(): boolean {
    if (!form.name.trim()) {
      if (import.meta.client) {
        window.alert("Please enter at least the candidate's name to continue.")
      }
      return false
    }
    return true
  }

  function goToStep(step: WizardStep) {
    if (step > 1 && !validateName()) return

    if (step === 2 && selectedTemplate.value > 3 && !hasPhoto.value) {
      selectedTemplate.value = 1
    }

    currentStep.value = step
    if (import.meta.client) {
      window.scrollTo(0, 0)
    }
  }

  function selectTemplate(id: TemplateId) {
    selectedTemplate.value = id
  }

  function setPhoto(dataUrl: string) {
    photoDataUrl.value = dataUrl
  }

  function removePhoto() {
    photoDataUrl.value = null
    if (selectedTemplate.value > 3) {
      selectedTemplate.value = 1
    }
  }

  function generatePreview() {
    goToStep(3)
  }

  return {
    currentStep,
    selectedTemplate,
    photoDataUrl,
    previewHtml,
    form,
    hasPhoto,
    templateSubtitle,
    biodataData,
    goToStep,
    selectTemplate,
    setPhoto,
    removePhoto,
    generatePreview,
    validateName,
  }
}
