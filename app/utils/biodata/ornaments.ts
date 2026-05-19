export function cornerSvg(color1 = '#E8A427', color2 = '#C0392B'): string {
  return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
  <circle cx="8" cy="8" r="6" fill="${color1}" opacity="0.8"/>
  <circle cx="8" cy="8" r="3" fill="${color2}" opacity="0.9"/>
  <circle cx="8" cy="8" r="1.5" fill="${color1}"/>
  <circle cx="20" cy="8" r="3.5" fill="${color1}" opacity="0.6"/>
  <circle cx="20" cy="8" r="1.5" fill="${color2}" opacity="0.7"/>
  <circle cx="8" cy="20" r="3.5" fill="${color1}" opacity="0.6"/>
  <circle cx="8" cy="20" r="1.5" fill="${color2}" opacity="0.7"/>
  <circle cx="30" cy="8" r="2" fill="${color1}" opacity="0.35"/>
  <circle cx="8" cy="30" r="2" fill="${color1}" opacity="0.35"/>
  <circle cx="20" cy="20" r="2" fill="${color1}" opacity="0.25"/>
</svg>`
}

export function lotusCornerSvg(): string {
  return `<svg viewBox="0 0 50 50" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <path d="M2,2 Q8,12 2,22 Q12,16 22,22 Q16,12 22,2 Q12,8 2,2Z" fill="#E8A42730" stroke="#C9A84C" stroke-width="0.5"/>
    <circle cx="12" cy="12" r="4" fill="#E8A42740" stroke="#C9A84C" stroke-width="0.5"/>
    <circle cx="12" cy="12" r="2" fill="#C0392B40"/>
    <circle cx="6" cy="6" r="1.5" fill="#E8A427"/>
  </svg>`
}

export function kolamSvg(): string {
  return `<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <path d="M2,2 L12,2 L2,12Z" fill="#E8A42740"/>
    <path d="M4,4 L10,4 L4,10Z" fill="#E8A427"/>
    <circle cx="4" cy="4" r="1.5" fill="#FDF6E3"/>
  </svg>`
}
