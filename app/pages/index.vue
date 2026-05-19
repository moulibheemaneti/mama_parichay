<script setup lang="ts">
import type { WizardStep } from '~/types/biodata'
import AppHeader from '~/components/AppHeader.vue'
import StepsBar from '~/components/StepsBar.vue'
import ProfileDetailsForm from '~/components/form/ProfileDetailsForm.vue'
import TemplatePicker from '~/components/template/TemplatePicker.vue'
import PreviewPanel from '~/components/PreviewPanel.vue'
import { useBiodataWizard } from '~/composables/useBiodataWizard'
import { usePdfDownload } from '~/composables/usePdfDownload'

const {
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
  generatePreview,
} = useBiodataWizard()

const { isDownloading, downloadPdf } = usePdfDownload()

function onNavigate(step: WizardStep) {
  goToStep(step)
}

async function onDownload() {
  await downloadPdf(biodataData.value, selectedTemplate.value, photoDataUrl.value)
}
</script>

<template>
  <div class="wizard">
    <AppHeader />
    <StepsBar :current-step="currentStep" @navigate="onNavigate" />

    <main class="main">
      <section v-show="currentStep === 1" class="page" :class="{ active: currentStep === 1 }">
        <ProfileDetailsForm v-model="form" v-model:photo-data-url="photoDataUrl" />
        <div class="btn-row">
          <button type="button" class="btn btn--primary" @click="goToStep(2)">Choose Template →</button>
        </div>
      </section>

      <section v-show="currentStep === 2" class="page" :class="{ active: currentStep === 2 }">
        <TemplatePicker
          :selected-template="selectedTemplate"
          :has-photo="hasPhoto"
          :subtitle="templateSubtitle"
          @select="selectTemplate"
          @back="goToStep(1)"
          @preview="generatePreview"
        />
      </section>

      <section v-show="currentStep === 3" class="page" :class="{ active: currentStep === 3 }">
        <ClientOnly>
          <PreviewPanel
            :preview-html="previewHtml"
            :biodata-data="biodataData"
            :selected-template="selectedTemplate"
            :photo-data-url="photoDataUrl"
            :is-downloading="isDownloading"
            @back="goToStep(2)"
            @download="onDownload"
          />
        </ClientOnly>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.wizard {
  min-height: 100vh;
}
</style>
