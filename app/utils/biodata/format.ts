import type { BiodataData, BiodataForm } from '~/types/biodata'

/** Coerce form values to trimmed strings (number inputs may bind as numbers). */
function toStr(value: string | number | null | undefined): string {
  if (value == null || value === '') return ''
  return String(value).trim()
}

export function createEmptyForm(): BiodataForm {
  return {
    name: '',
    dob: '',
    pob: '',
    religion: '',
    caste: '',
    star: '',
    rasi: '',
    gotram: '',
    height: '',
    weight: '',
    complexion: '',
    blood: '',
    siblings: '',
    edu: '',
    job: '',
    income: '',
    workat: '',
    father: '',
    focc: '',
    mother: '',
    mocc: '',
    elder: '',
    younger: '',
    esisters: '',
    ysisters: '',
    cname: '',
    mobile: '',
    email: '',
    addr1: '',
    addr2: '',
  }
}

function formatDob(rawDob: string | number | null | undefined): string {
  const dob = toStr(rawDob)
  if (!dob) return ''
  const [y, m, d] = dob.split('-')
  if (!y || !m || !d) return ''
  return `${d}.${m}.${y}`
}

function formatHeight(cm: string | number | null | undefined): string {
  const hNum = parseInt(toStr(cm), 10)
  if (!hNum) return ''
  const totalIn = Math.round(hNum / 2.54)
  const ft = Math.floor(totalIn / 12)
  const inch = totalIn % 12
  return `${hNum} CM (${ft}ft ${inch}in)`
}

function formatWeight(kg: string | number | null | undefined): string {
  const value = toStr(kg)
  return value ? `${value} kgs` : ''
}

function formatIncome(lakhs: string | number | null | undefined): string {
  const inc = toStr(lakhs)
  return inc ? `₹${inc} Lakhs p.a.` : ''
}

export function formToBiodataData(form: BiodataForm): BiodataData {
  const religion = toStr(form.religion)
  const caste = toStr(form.caste)
  const religionCaste = [religion, caste].filter(Boolean).join(', ')

  return {
    name: toStr(form.name),
    dob: formatDob(form.dob),
    pob: toStr(form.pob),
    religionCaste,
    religion,
    caste,
    star: toStr(form.star),
    rasi: toStr(form.rasi),
    gotram: toStr(form.gotram),
    height: formatHeight(form.height),
    weight: formatWeight(form.weight),
    complexion: toStr(form.complexion),
    blood: toStr(form.blood),
    siblings: toStr(form.siblings),
    edu: toStr(form.edu),
    job: toStr(form.job),
    income: formatIncome(form.income),
    workat: toStr(form.workat),
    father: toStr(form.father),
    focc: toStr(form.focc),
    mother: toStr(form.mother),
    mocc: toStr(form.mocc),
    elder: toStr(form.elder),
    younger: toStr(form.younger),
    esisters: toStr(form.esisters),
    ysisters: toStr(form.ysisters),
    cname: toStr(form.cname),
    mobile: toStr(form.mobile),
    email: toStr(form.email),
    addr1: toStr(form.addr1),
    addr2: toStr(form.addr2),
  }
}
