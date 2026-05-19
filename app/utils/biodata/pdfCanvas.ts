/** html2canvas cannot render linear-gradient on near-zero-height nodes (createPattern error). */
export function sanitizeElementForPdfCapture(root: HTMLElement): void {
  const elements = [root, ...root.querySelectorAll<HTMLElement>('*')]

  for (const el of elements) {
    const inline = el.getAttribute('style')
    if (!inline || !/linear-gradient/i.test(inline)) continue

    let style = inline.replace(/linear-gradient\([^)]*\)/gi, (match) => {
      if (match.includes('#E8A427')) return '#E8A427'
      if (match.includes('#C9A84C')) return '#C9A84C'
      return '#C9A84C'
    })

    if (/height:\s*0\.5pt/i.test(style)) {
      style = style.replace(/height:\s*0\.5pt/gi, 'height:1px;min-height:1px')
    } else if (/height:\s*1px/i.test(style) && /background:/i.test(style)) {
      style = style.includes('min-height')
        ? style
        : style.replace(/height:\s*1px/i, 'height:1px;min-height:1px')
    }

    el.setAttribute('style', style)
  }
}

export function buildHtml2CanvasPdfOptions() {
  return {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    onclone: (_doc: Document, clonedElement: HTMLElement) => {
      sanitizeElementForPdfCapture(clonedElement)
    },
  }
}
