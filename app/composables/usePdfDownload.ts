import { buildBiodata } from '~/utils/biodata/builders'
import { buildHtml2CanvasPdfOptions, sanitizeElementForPdfCapture } from '~/utils/biodata/pdfCanvas'
import { appendPdfWatermark } from '~/utils/biodata/pdfExport'
import type { BiodataData, TemplateId } from '~/types/biodata'

const A4_WIDTH_PX = 794 // 210mm at 96dpi

function waitForNextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

async function waitForImages(root: HTMLElement): Promise<void> {
  const images = Array.from(root.querySelectorAll('img'))
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve()
            return
          }
          img.addEventListener('load', () => resolve(), { once: true })
          img.addEventListener('error', () => resolve(), { once: true })
        }),
    ),
  )
}

function resolveBiodataElement(
  data: BiodataData,
  templateId: TemplateId,
  photoUrl: string | null,
): HTMLElement {
  const previewRoot = document.querySelector('.biodata-preview')?.firstElementChild
  if (previewRoot instanceof HTMLElement) {
    return previewRoot.cloneNode(true) as HTMLElement
  }

  const scratch = document.createElement('div')
  scratch.innerHTML = buildBiodata(data, templateId, photoUrl)
  const built = scratch.firstElementChild
  if (!(built instanceof HTMLElement)) {
    throw new Error('Could not render biodata for PDF export.')
  }
  return built
}

function mountForPdfCapture(element: HTMLElement): HTMLDivElement {
  element.style.width = `${A4_WIDTH_PX}px`
  element.style.maxWidth = `${A4_WIDTH_PX}px`

  const container = document.createElement('div')
  container.className = 'biodata-output'
  Object.assign(container.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    visibility: 'hidden',
    width: `${A4_WIDTH_PX}px`,
    overflow: 'visible',
    zIndex: '-1',
  })
  document.body.appendChild(container)
  container.appendChild(element)
  return container as HTMLDivElement
}

export function usePdfDownload() {
  const isDownloading = ref(false)

  async function downloadPdf(
    data: BiodataData,
    templateId: TemplateId,
    photoUrl: string | null,
  ) {
    if (!import.meta.client) return

    isDownloading.value = true
    let container: HTMLDivElement | null = null

    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = resolveBiodataElement(data, templateId, photoUrl)

      sanitizeElementForPdfCapture(element)
      container = mountForPdfCapture(element)
      appendPdfWatermark(element)

      await document.fonts.ready
      await waitForImages(element)
      await waitForNextFrame()
      await waitForNextFrame()

      const name = data.name || 'Biodata'

      await html2pdf()
        .set({
          margin: 0,
          filename: `${name.replace(/\s+/g, '_')}_Biodata.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: buildHtml2CanvasPdfOptions(),
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(element)
        .save()
    } catch (error) {
      console.error('PDF download failed:', error)
      window.alert('Could not generate the PDF. Please try again.')
    } finally {
      container?.remove()
      isDownloading.value = false
    }
  }

  return { isDownloading, downloadPdf }
}
