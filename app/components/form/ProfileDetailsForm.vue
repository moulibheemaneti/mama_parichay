<script setup lang="ts">
import type { BiodataForm } from '~/types/biodata'
import { BLOOD_GROUPS, NAKSHATRAS, RASIS, RELIGIONS } from '~/constants/form-options'
import FormField from '~/components/form/FormField.vue'
import PhotoUpload from '~/components/form/PhotoUpload.vue'

const form = defineModel<BiodataForm>({ required: true })
const photoDataUrl = defineModel<string | null>('photoDataUrl', { default: null })
</script>

<template>
  <div class="profile-form">
    <h2 class="page-title">Profile Details</h2>
    <p class="page-subtitle">Fill in what's available — empty fields won't appear in the biodata</p>

    <div class="section-card">
      <div class="section-title">✦ Personal Information</div>
      <div class="form-grid">
        <FormField label="Full Name *" id="f_name">
          <input id="f_name" v-model="form.name" type="text" placeholder="e.g. Bheemaneni Yojana">
        </FormField>
        <FormField label="Date of Birth" id="f_dob">
          <input id="f_dob" v-model="form.dob" type="date">
        </FormField>
        <FormField label="Place of Birth" id="f_pob">
          <input id="f_pob" v-model="form.pob" type="text" placeholder="e.g. L B Nagar, Hyderabad">
        </FormField>
        <FormField label="Religion" id="f_religion">
          <select id="f_religion" v-model="form.religion">
            <option value="">— Select Religion —</option>
            <option v-for="r in RELIGIONS" :key="r" :value="r">{{ r }}</option>
          </select>
        </FormField>
        <FormField label="Caste" id="f_caste">
          <input id="f_caste" v-model="form.caste" type="text" placeholder="e.g. Kamma">
        </FormField>
        <FormField label="Star (Nakshatra)" id="f_star">
          <select id="f_star" v-model="form.star">
            <option value="">— Select Star —</option>
            <option v-for="s in NAKSHATRAS" :key="s" :value="s">{{ s }}</option>
          </select>
        </FormField>
        <FormField label="Rasi (Moon Sign)" id="f_rasi">
          <select id="f_rasi" v-model="form.rasi">
            <option value="">— Select Rasi —</option>
            <option v-for="r in RASIS" :key="r" :value="r">{{ r }}</option>
          </select>
        </FormField>
        <FormField label="Gotram" id="f_gotram">
          <input id="f_gotram" v-model="form.gotram" type="text" placeholder="e.g. Lakkanti">
        </FormField>
        <FormField label="Height (cm)" id="f_height">
          <input id="f_height" v-model="form.height" type="number" placeholder="e.g. 162" min="100" max="220">
        </FormField>
        <FormField label="Weight (kgs)" id="f_weight">
          <input id="f_weight" v-model="form.weight" type="number" placeholder="e.g. 58" min="30" max="200">
        </FormField>
        <FormField label="Complexion" id="f_complexion">
          <input id="f_complexion" v-model="form.complexion" type="text" placeholder="e.g. Fair">
        </FormField>
        <FormField label="Blood Group" id="f_blood">
          <select id="f_blood" v-model="form.blood">
            <option value="">— Select Blood Group —</option>
            <option v-for="b in BLOOD_GROUPS" :key="b" :value="b">{{ b }}</option>
          </select>
        </FormField>
        <FormField label="Siblings" id="f_siblings">
          <input id="f_siblings" v-model="form.siblings" type="text" placeholder="e.g. 02 Brothers">
        </FormField>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">✦ Education & Career</div>
      <div class="form-grid">
        <FormField label="Education Qualification" id="f_edu">
          <input id="f_edu" v-model="form.edu" type="text" placeholder="e.g. BA, B.Ed – Osmania University">
        </FormField>
        <FormField label="Occupation" id="f_job">
          <input id="f_job" v-model="form.job" type="text" placeholder="e.g. Teacher">
        </FormField>
        <FormField label="Annual Income (₹ Lakhs)" id="f_income">
          <input id="f_income" v-model="form.income" type="number" placeholder="e.g. 4" min="0" step="0.5">
        </FormField>
        <FormField label="Working At" id="f_workat">
          <input id="f_workat" v-model="form.workat" type="text" placeholder="e.g. Government School, Hyderabad">
        </FormField>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">✦ Family Details</div>
      <div class="form-grid">
        <FormField label="Father's Name" id="f_father">
          <input id="f_father" v-model="form.father" type="text" placeholder="e.g. B. Bhaskara Naidu">
        </FormField>
        <FormField label="Father's Occupation" id="f_focc">
          <input id="f_focc" v-model="form.focc" type="text" placeholder="e.g. Asst Engr, Ministry of Defence">
        </FormField>
        <FormField label="Mother's Name" id="f_mother">
          <input id="f_mother" v-model="form.mother" type="text" placeholder="e.g. B. Bhuvaneswari">
        </FormField>
        <FormField label="Mother's Occupation" id="f_mocc">
          <input id="f_mocc" v-model="form.mocc" type="text" placeholder="e.g. Home Maker">
        </FormField>
        <FormField label="Elder Brother(s)" id="f_elder">
          <input id="f_elder" v-model="form.elder" type="text" placeholder="e.g. B.Tech CSE, Software Engineer">
        </FormField>
        <FormField label="Younger Brother(s)" id="f_younger">
          <input id="f_younger" v-model="form.younger" type="text" placeholder="e.g. Class XII">
        </FormField>
        <FormField label="Elder Sister(s)" id="f_esisters">
          <input id="f_esisters" v-model="form.esisters" type="text" placeholder="e.g. Married">
        </FormField>
        <FormField label="Younger Sister(s)" id="f_ysisters">
          <input id="f_ysisters" v-model="form.ysisters" type="text" placeholder="e.g. Studying B.Com">
        </FormField>
      </div>
    </div>

    <PhotoUpload v-model:photo-data-url="photoDataUrl" />

    <div class="section-card">
      <div class="section-title">✦ Contact Details</div>
      <div class="form-grid">
        <FormField label="Contact Person" id="f_cname">
          <input id="f_cname" v-model="form.cname" type="text" placeholder="e.g. B. Bhaskara Naidu (Father)">
        </FormField>
        <FormField label="Mobile Number" id="f_mobile">
          <input id="f_mobile" v-model="form.mobile" type="text" placeholder="e.g. 9491677472">
        </FormField>
        <FormField label="Email" id="f_email">
          <input id="f_email" v-model="form.email" type="text" placeholder="e.g. family@email.com">
        </FormField>
        <FormField label="Address 1" id="f_addr1">
          <input id="f_addr1" v-model="form.addr1" type="text"
            placeholder="e.g. Qtr No. 3829, ODF Estate, Yeddumailaram">
        </FormField>
        <FormField label="Address 2" id="f_addr2">
          <input id="f_addr2" v-model="form.addr2" type="text" placeholder="Optional alternate address">
        </FormField>
      </div>
    </div>
  </div>
</template>
