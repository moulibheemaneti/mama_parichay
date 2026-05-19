<script setup lang="ts">
const photoDataUrl = defineModel<string | null>('photoDataUrl', { default: null })

const fileInput = ref<HTMLInputElement | null>(null)
const hasPhoto = computed(() => Boolean(photoDataUrl.value))

function openPicker() {
  fileInput.value?.click()
}

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (ev) => {
    photoDataUrl.value = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

function removePhoto(event: Event) {
  event.stopPropagation()
  photoDataUrl.value = null
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <div class="section-card photo-section">
    <div class="section-title">
      ✦ Photo
      <span class="section-title__hint">(optional)</span>
    </div>

    <div class="photo-section__body">
      <button
        type="button"
        class="photo-drop"
        :class="{ 'photo-drop--filled': hasPhoto }"
        @click="openPicker"
      >
        <div v-if="hasPhoto" class="photo-drop__preview">
          <img :src="photoDataUrl!" alt="Uploaded photo preview">
          <button
            type="button"
            class="photo-drop__remove"
            aria-label="Remove photo"
            @click="removePhoto"
          >
            ✕
          </button>
        </div>
        <div v-else class="photo-drop__placeholder">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Upload<br>Photo</span>
        </div>
      </button>

      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="photo-section__input"
        @change="onFileChange"
      >

      <p class="photo-section__hint">
        Upload a clear, recent photograph.<br>
        Accepted formats: JPG, PNG, WEBP<br>
        <span class="photo-section__hint-note">If uploaded, photo-layout templates will appear in the next step.</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photo-section {
  &__body {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  &__input {
    display: none;
  }

  &__hint {
    color: $text-muted;
    font-size: 0.82rem;
    font-style: italic;
    line-height: 1.7;
  }

  &__hint-note {
    color: $text-dim;
  }
}

.photo-drop {
  width: 120px;
  height: 140px;
  border: 2px dashed rgba($gold, 0.35);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.02);
  padding: 0;

  &--filled {
    border-style: solid;
    border-color: rgba($gold, 0.5);
  }

  &__preview {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1px;
    }
  }

  &__remove {
    position: absolute;
    top: 3px;
    right: 3px;
    background: $deep-red;
    border: none;
    color: #fff;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    font-size: 10px;
    cursor: pointer;
    line-height: 18px;
    text-align: center;
  }

  &__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;

    span {
      font-size: 0.65rem;
      color: $text-muted;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-align: center;
    }
  }
}
</style>
