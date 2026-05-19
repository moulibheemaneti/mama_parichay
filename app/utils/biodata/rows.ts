function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function row(label: string, value: string, cls = ''): string {
  if (!value) return ''
  return `<div class="t1-row ${cls}"><span class="t1-key">${escapeHtml(label)}</span><span class="t1-val">${escapeHtml(value)}</span></div>`
}

export function rowT2(label: string, value: string, cls = ''): string {
  if (!value) return ''
  return `<div class="t2-row ${cls}"><span class="t2-key">${escapeHtml(label)}</span><span class="t2-val">${escapeHtml(value)}</span></div>`
}

export function rowT3(label: string, value: string, cls = ''): string {
  if (!value) return ''
  return `<div class="t3-row ${cls}"><span class="t3-key">${escapeHtml(label)}</span><span class="t3-val">${escapeHtml(value)}</span></div>`
}
