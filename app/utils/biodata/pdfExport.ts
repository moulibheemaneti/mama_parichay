/** Locale-friendly timestamp for the PDF footer watermark. */
export function formatPdfWatermarkTimestamp(date = new Date()): string {
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

const WATERMARK_STYLE =
  'position:absolute;bottom:3mm;left:0;right:0;margin:0;padding:0 8mm;text-align:center;font-family:\'EB Garamond\',serif;font-size:6.5pt;line-height:1.3;color:rgba(107,83,68,0.85);letter-spacing:0.04em;z-index:100;pointer-events:none;text-shadow:0 0 4px #FFFDF5,0 0 2px #FFFDF5;'

/** Appends a bottom watermark to the biodata root element (PDF export only). */
export function appendPdfWatermark(element: HTMLElement): void {
  const watermark = document.createElement('p')
  watermark.className = 'pdf-watermark'
  watermark.setAttribute('style', WATERMARK_STYLE)
  watermark.textContent = `Generated in mamaparichay.com · ${formatPdfWatermarkTimestamp()}`
  element.appendChild(watermark)
}
