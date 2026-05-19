<script setup lang="ts">
import type { TemplateId } from '~/types/biodata'

defineProps<{
  templateId: TemplateId
}>()
</script>

<template>
  <!-- Mini SVG previews — same artwork as original index.html -->
  <svg v-if="templateId === 1" width="110" height="155" viewBox="0 0 110 155" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="110" height="155" fill="#FFFDF5" />
    <circle cx="6" cy="6" r="3" fill="#E8A427" opacity="0.7" />
    <circle cx="104" cy="6" r="3" fill="#E8A427" opacity="0.7" />
    <circle cx="6" cy="149" r="3" fill="#E8A427" opacity="0.7" />
    <circle cx="104" cy="149" r="3" fill="#E8A427" opacity="0.7" />
    <text x="55" y="22" text-anchor="middle" font-size="5" fill="#8B1A1A" font-style="italic">॥ Shree Ganeshaya Namah ॥</text>
    <text x="55" y="40" text-anchor="middle" font-size="9" font-family="serif" fill="#8B1A1A" font-weight="600">Candidate Name</text>
    <line x1="20" y1="44" x2="90" y2="44" stroke="#E8A427" stroke-width="0.7" />
  </svg>
  <svg v-else-if="templateId === 2" width="110" height="155" viewBox="0 0 110 155" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="110" height="155" fill="#FEFCF7" />
    <rect x="3" y="3" width="104" height="149" fill="none" stroke="#C9A84C" stroke-width="0.5" />
    <rect x="5" y="5" width="100" height="145" fill="none" stroke="#E8A427" stroke-width="1" />
    <text x="55" y="32" text-anchor="middle" font-size="14" font-family="serif" fill="#5C1E00">Name</text>
    <text x="55" y="42" text-anchor="middle" font-size="7" fill="#E8A427">✦ ✦ ✦</text>
  </svg>
  <svg v-else-if="templateId === 3" width="110" height="155" viewBox="0 0 110 155" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="110" height="155" fill="#FDF6E3" />
    <rect x="0" y="0" width="110" height="38" fill="#6B0F0F" />
    <text x="55" y="28" text-anchor="middle" font-size="11" font-family="serif" fill="#F5DFA0">Candidate Name</text>
  </svg>
  <svg v-else-if="templateId === 4" width="110" height="155" viewBox="0 0 110 155" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="110" height="155" fill="#FFFDF5" />
    <rect x="8" y="24" width="28" height="35" rx="1" fill="#e8e0d0" stroke="#C9A84C" stroke-width="0.5" />
    <text x="22" y="44" text-anchor="middle" font-size="4" fill="#9C7A5A">Photo</text>
    <text x="70" y="33" text-anchor="middle" font-size="7" font-family="serif" fill="#8B1A1A" font-weight="600">Name</text>
  </svg>
  <svg v-else-if="templateId === 5" width="110" height="155" viewBox="0 0 110 155" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="110" height="155" fill="#FEFCF7" />
    <rect x="38" y="21" width="34" height="42" rx="2" fill="#e8e0d0" stroke="#C9A84C" stroke-width="0.7" />
    <text x="55" y="72" text-anchor="middle" font-size="9" font-family="serif" fill="#5C1E00">Name</text>
  </svg>
  <svg v-else width="110" height="155" viewBox="0 0 110 155" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="110" height="155" fill="#FDF6E3" />
    <rect x="0" y="0" width="110" height="48" fill="#6B0F0F" />
    <rect x="74" y="16" width="28" height="26" rx="1" fill="#8B1A1A" stroke="#E8A427" stroke-width="0.7" />
    <text x="38" y="26" text-anchor="middle" font-size="8" font-family="serif" fill="#F5DFA0">Name</text>
  </svg>
</template>
