import type { BiodataData, TemplateId } from '~/types/biodata'
import { row, rowT2, rowT3 } from '~/utils/biodata/rows'
import { cornerSvg } from '~/utils/biodata/ornaments'

export function buildT1(d: BiodataData) {
  const personalFields = [
    row('Date of Birth', d.dob, 't1-row'),
    row('Place of Birth', d.pob, 't1-row'),
    row('Religion & Caste', d.religionCaste, 't1-row'),
    row('Star', d.star, 't1-row'),
    row('Rasi', d.rasi, 't1-row'),
    row('Gotram', d.gotram, 't1-row'),
    row('Height', d.height, 't1-row'),
    row('Weight', d.weight, 't1-row'),
    row('Complexion', d.complexion, 't1-row'),
    row('Blood Group', d.blood, 't1-row'),
    row('Siblings', d.siblings, 't1-row'),
  ].filter(Boolean).join('');

  const eduFields = [
    row('Education', d.edu, 't1-row t1-row-full'),
    row('Occupation', d.job, 't1-row'),
    row('Working At', d.workat, 't1-row t1-row-full'),
    row('Annual Income', d.income, 't1-row'),
  ].filter(Boolean).join('');

  const familyFields = [
    row('Father', d.father + (d.focc ? ` — ${d.focc}` : ''), 't1-row t1-row-full'),
    row('Mother', d.mother + (d.mocc ? ` — ${d.mocc}` : ''), 't1-row t1-row-full'),
    row('Elder Brother', d.elder, 't1-row t1-row-full'),
    row('Younger Brother', d.younger, 't1-row'),
    row('Elder Sister', d.esisters, 't1-row t1-row-full'),
    row('Younger Sister', d.ysisters, 't1-row'),
  ].filter(Boolean).join('');

  const contactFields = [
    row('Contact', d.cname, 't1-row t1-row-full'),
    row('Mobile', d.mobile, 't1-row'),
    row('Email', d.email, 't1-row'),
    row('Address', d.addr1, 't1-row t1-row-full'),
    d.addr2 ? `<div class="t1-row t1-row-full"><span class="t1-key"></span><span class="t1-val">${d.addr2}</span></div>` : '',
  ].filter(Boolean).join('');

  return `
<div class="biodata-t1" style="position:relative;background:#FFFDF5;width:210mm;min-height:297mm;font-family:'EB Garamond',serif;color:#2C1810;">
  <div style="position:absolute;top:4mm;left:4mm;">${cornerSvg()}</div>
  <div style="position:absolute;top:4mm;right:4mm;transform:scaleX(-1);">${cornerSvg()}</div>
  <div style="position:absolute;bottom:4mm;left:4mm;transform:scaleY(-1);">${cornerSvg()}</div>
  <div style="position:absolute;bottom:4mm;right:4mm;transform:scale(-1,-1);">${cornerSvg()}</div>
  <div class="t1-inner" style="padding:18mm 16mm;">
    <div class="t1-header" style="text-align:center;margin-bottom:8mm;">
      <div class="t1-blessing" style="font-size:9pt;color:#8B1A1A;letter-spacing:0.2em;margin-bottom:3mm;font-style:italic;">॥ Shree Ganeshaya Namah ॥</div>
      <div class="t1-name" style="font-family:'Cormorant Garamond',serif;font-size:26pt;color:#8B1A1A;font-weight:400;line-height:1.2;">${d.name}</div>
      <div class="t1-divider" style="display:flex;align-items:center;justify-content:center;gap:4mm;margin:4mm 0;">
<div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#C9A84C);"></div>
<div style="font-size:14pt;color:#C0392B;">卐</div>
<div style="flex:1;height:1px;background:linear-gradient(90deg,#C9A84C,transparent);"></div>
      </div>
      <div style="font-size:8pt;color:#8B6914;letter-spacing:0.15em;font-style:italic;">Mama Parichay — Marriage Biodata</div>
    </div>
    ${personalFields ? `
    <div class="t1-section" style="margin-bottom:5mm;">
      <div class="t1-section-title" style="font-size:9pt;letter-spacing:0.2em;text-transform:uppercase;color:#8B1A1A;border-bottom:1.5pt solid #E8A427;padding-bottom:1.5mm;margin-bottom:3mm;">✦ Personal Details</div>
      <div class="t1-rows" style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;">${personalFields}</div>
    </div>` : ''}
    ${eduFields ? `
    <div class="t1-section" style="margin-bottom:5mm;">
      <div class="t1-section-title" style="font-size:9pt;letter-spacing:0.2em;text-transform:uppercase;color:#8B1A1A;border-bottom:1.5pt solid #E8A427;padding-bottom:1.5mm;margin-bottom:3mm;">✦ Education & Career</div>
      <div class="t1-rows" style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;">${eduFields}</div>
    </div>` : ''}
    ${familyFields ? `
    <div class="t1-section" style="margin-bottom:5mm;">
      <div class="t1-section-title" style="font-size:9pt;letter-spacing:0.2em;text-transform:uppercase;color:#8B1A1A;border-bottom:1.5pt solid #E8A427;padding-bottom:1.5mm;margin-bottom:3mm;">✦ Family Details</div>
      <div class="t1-rows" style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;">${familyFields}</div>
    </div>` : ''}
    ${contactFields ? `
    <div class="t1-section" style="margin-bottom:5mm;">
      <div class="t1-section-title" style="font-size:9pt;letter-spacing:0.2em;text-transform:uppercase;color:#8B1A1A;border-bottom:1.5pt solid #E8A427;padding-bottom:1.5mm;margin-bottom:3mm;">✦ Contact Details</div>
      <div class="t1-rows" style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;">${contactFields}</div>
    </div>` : ''}
    <div style="text-align:center;margin-top:10mm;padding-top:5mm;border-top:0.5pt solid #C9A84C;">
      <div style="font-size:9pt;color:#C9A84C;letter-spacing:0.15em;font-style:italic;">❦ Subham Bhavatu ❦</div>
    </div>
  </div>
</div>`;
}

// ── TEMPLATE 2 HTML ──
export function buildT2(d: BiodataData) {
  const personal = [
    rowT2('D.O.B', d.dob, 't2-row'),
    rowT2('Place of Birth', d.pob, 't2-row'),
    rowT2('Religion & Caste', d.religionCaste, 't2-row'),
    rowT2('Star', d.star, 't2-row'),
    rowT2('Rasi', d.rasi, 't2-row'),
    rowT2('Gotram', d.gotram, 't2-row'),
    rowT2('Height', d.height, 't2-row'),
    rowT2('Weight', d.weight, 't2-row'),
    rowT2('Complexion', d.complexion, 't2-row'),
    rowT2('Blood Group', d.blood, 't2-row'),
    rowT2('Siblings', d.siblings, 't2-row'),
  ].filter(Boolean).join('');

  const edu = [
    rowT2('Education', d.edu, 't2-row t2-row-full'),
    rowT2('Occupation', d.job, 't2-row'),
    rowT2('Working At', d.workat, 't2-row t2-row-full'),
    rowT2('Annual Income', d.income, 't2-row'),
  ].filter(Boolean).join('');

  const family = [
    rowT2('Father', d.father + (d.focc ? ` — ${d.focc}` : ''), 't2-row t2-row-full'),
    rowT2('Mother', d.mother + (d.mocc ? ` — ${d.mocc}` : ''), 't2-row t2-row-full'),
    rowT2('Elder Brother', d.elder, 't2-row t2-row-full'),
    rowT2('Younger Brother', d.younger, 't2-row'),
    rowT2('Elder Sister', d.esisters, 't2-row t2-row-full'),
    rowT2('Younger Sister', d.ysisters, 't2-row'),
  ].filter(Boolean).join('');

  const contact = [
    rowT2('Contact', d.cname, 't2-row t2-row-full'),
    rowT2('Mobile', d.mobile, 't2-row'),
    rowT2('Email', d.email, 't2-row'),
    rowT2('Address', d.addr1, 't2-row t2-row-full'),
    d.addr2 ? `<div class="t2-row t2-row-full"><span class="t2-key"></span><span class="t2-val">${d.addr2}</span></div>` : '',
  ].filter(Boolean).join('');

  const lotusCorner = `<svg viewBox="0 0 50 50" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <path d="M2,2 Q8,12 2,22 Q12,16 22,22 Q16,12 22,2 Q12,8 2,2Z" fill="#E8A42730" stroke="#C9A84C" stroke-width="0.5"/>
    <circle cx="12" cy="12" r="4" fill="#E8A42740" stroke="#C9A84C" stroke-width="0.5"/>
    <circle cx="12" cy="12" r="2" fill="#C0392B40"/>
    <circle cx="6" cy="6" r="1.5" fill="#E8A427"/>
  </svg>`;

  return `
<div style="width:210mm;min-height:297mm;background:#FEFCF7;position:relative;font-family:'EB Garamond',serif;color:#2C1810;">
  <div style="position:absolute;inset:6mm;border:0.5pt solid #C9A84C;pointer-events:none;"></div>
  <div style="position:absolute;inset:8mm;border:1.5pt solid #E8A427;pointer-events:none;"></div>
  <div style="position:absolute;top:5mm;left:5mm;">${lotusCorner}</div>
  <div style="position:absolute;top:5mm;right:5mm;transform:scaleX(-1);">${lotusCorner}</div>
  <div style="position:absolute;bottom:5mm;left:5mm;transform:scaleY(-1);">${lotusCorner}</div>
  <div style="position:absolute;bottom:5mm;right:5mm;transform:scale(-1,-1);">${lotusCorner}</div>
  <div style="padding:22mm 20mm;">
    <div style="text-align:center;margin-bottom:8mm;">
      <div style="font-size:9pt;color:#C0392B;letter-spacing:0.15em;margin-bottom:2mm;font-style:italic;">॥ Shree Ganeshaya Namah ॥</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:28pt;color:#5C1E00;font-weight:300;letter-spacing:0.05em;">${d.name}</div>
      <div style="font-size:14pt;color:#E8A427;margin:2mm 0;letter-spacing:0.5em;">✦ ✦ ✦</div>
      <div style="font-size:8pt;color:#9C7A5A;font-style:italic;letter-spacing:0.1em;">Mama Parichay — Marriage Biodata</div>
    </div>
    ${personal ? `<div style="font-size:10pt;color:#C0392B;text-align:center;letter-spacing:0.15em;text-transform:uppercase;margin:4mm 0 1mm;font-style:italic;">Personal Details</div>
    <hr style="width:60%;margin:2mm auto;border:none;border-top:0.5pt solid #C9A84C;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:4mm;">${personal}</div>` : ''}
    ${edu ? `<div style="font-size:10pt;color:#C0392B;text-align:center;letter-spacing:0.15em;text-transform:uppercase;margin:4mm 0 1mm;font-style:italic;">Education & Career</div>
    <hr style="width:60%;margin:2mm auto;border:none;border-top:0.5pt solid #C9A84C;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:4mm;">${edu}</div>` : ''}
    ${family ? `<div style="font-size:10pt;color:#C0392B;text-align:center;letter-spacing:0.15em;text-transform:uppercase;margin:4mm 0 1mm;font-style:italic;">Family Details</div>
    <hr style="width:60%;margin:2mm auto;border:none;border-top:0.5pt solid #C9A84C;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:4mm;">${family}</div>` : ''}
    ${contact ? `<div style="font-size:10pt;color:#C0392B;text-align:center;letter-spacing:0.15em;text-transform:uppercase;margin:4mm 0 1mm;font-style:italic;">Contact Details</div>
    <hr style="width:60%;margin:2mm auto;border:none;border-top:0.5pt solid #C9A84C;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:4mm;">${contact}</div>` : ''}
    <div style="text-align:center;margin-top:10mm;">
      <div style="font-size:9pt;color:#C9A84C;letter-spacing:0.2em;font-style:italic;">❧ Subham Bhavatu ❧</div>
    </div>
  </div>
</div>`;
}

// ── TEMPLATE 3 HTML ──
export function buildT3(d: BiodataData) {
  const personal = [
    rowT3('D.O.B', d.dob, 't3-row'),
    rowT3('Place of Birth', d.pob, 't3-row'),
    rowT3('Religion & Caste', d.religionCaste, 't3-row'),
    rowT3('Star', d.star, 't3-row'),
    rowT3('Rasi', d.rasi, 't3-row'),
    rowT3('Gotram', d.gotram, 't3-row'),
    rowT3('Height', d.height, 't3-row'),
    rowT3('Weight', d.weight, 't3-row'),
    rowT3('Complexion', d.complexion, 't3-row'),
    rowT3('Blood Group', d.blood, 't3-row'),
    rowT3('Siblings', d.siblings, 't3-row'),
  ].filter(Boolean).join('');

  const edu = [
    rowT3('Education', d.edu, 't3-row t3-row-full'),
    rowT3('Occupation', d.job, 't3-row'),
    rowT3('Working At', d.workat, 't3-row t3-row-full'),
    rowT3('Annual Income', d.income, 't3-row'),
  ].filter(Boolean).join('');

  const family = [
    rowT3('Father', d.father + (d.focc ? ` — ${d.focc}` : ''), 't3-row t3-row-full'),
    rowT3('Mother', d.mother + (d.mocc ? ` — ${d.mocc}` : ''), 't3-row t3-row-full'),
    rowT3('Elder Brother', d.elder, 't3-row t3-row-full'),
    rowT3('Younger Brother', d.younger, 't3-row'),
    rowT3('Elder Sister', d.esisters, 't3-row t3-row-full'),
    rowT3('Younger Sister', d.ysisters, 't3-row'),
  ].filter(Boolean).join('');

  const contact = [
    rowT3('Contact', d.cname, 't3-row t3-row-full'),
    rowT3('Mobile', d.mobile, 't3-row'),
    rowT3('Email', d.email, 't3-row'),
    rowT3('Address', d.addr1, 't3-row t3-row-full'),
    d.addr2 ? `<div class="t3-row t3-row-full"><span class="t3-key"></span><span class="t3-val">${d.addr2}</span></div>` : '',
  ].filter(Boolean).join('');

  const kolam = `<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <path d="M2,2 L12,2 L2,12Z" fill="#E8A42740"/>
    <path d="M4,4 L10,4 L4,10Z" fill="#E8A427"/>
    <circle cx="4" cy="4" r="1.5" fill="#FDF6E3"/>
  </svg>`;

  return `
<div style="width:210mm;min-height:297mm;background:#FDF6E3;position:relative;display:flex;flex-direction:column;font-family:'EB Garamond',serif;color:#2C1810;">
  <div style="background:#6B0F0F;padding:10mm 14mm;text-align:center;position:relative;flex-shrink:0;">
    <div style="position:absolute;top:3mm;left:3mm;">${kolam}</div>
    <div style="position:absolute;top:3mm;right:3mm;transform:scaleX(-1);">${kolam}</div>
    <div style="font-size:9pt;color:#F5DFA0;letter-spacing:0.2em;margin-bottom:2mm;font-style:italic;">॥ Shree Ganeshaya Namah ॥</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:28pt;color:#F5DFA0;font-weight:400;letter-spacing:0.05em;">${d.name}</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:3mm;margin:2mm 0;">
      <div style="flex:1;height:0.5pt;background:linear-gradient(90deg,transparent,#E8A427);"></div>
      <div style="font-size:9pt;color:#E8A427;letter-spacing:0.2em;">Mama Parichay</div>
      <div style="flex:1;height:0.5pt;background:linear-gradient(90deg,#E8A427,transparent);"></div>
    </div>
  </div>
  <div style="padding:6mm 14mm 10mm;flex:1;">
    ${personal ? `<div style="font-size:9pt;letter-spacing:0.18em;color:#6B0F0F;text-transform:uppercase;padding:1.5mm 0;border-bottom:1pt solid #E8A427;margin:4mm 0 3mm;display:flex;align-items:center;gap:2mm;">✦ Personal Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:4mm;font-size:10pt;">${personal}</div>` : ''}
    ${edu ? `<div style="font-size:9pt;letter-spacing:0.18em;color:#6B0F0F;text-transform:uppercase;padding:1.5mm 0;border-bottom:1pt solid #E8A427;margin:4mm 0 3mm;display:flex;align-items:center;gap:2mm;">✦ Education & Career</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:4mm;font-size:10pt;">${edu}</div>` : ''}
    ${family ? `<div style="font-size:9pt;letter-spacing:0.18em;color:#6B0F0F;text-transform:uppercase;padding:1.5mm 0;border-bottom:1pt solid #E8A427;margin:4mm 0 3mm;display:flex;align-items:center;gap:2mm;">✦ Family Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:4mm;font-size:10pt;">${family}</div>` : ''}
    ${contact ? `<div style="font-size:9pt;letter-spacing:0.18em;color:#6B0F0F;text-transform:uppercase;padding:1.5mm 0;border-bottom:1pt solid #E8A427;margin:4mm 0 3mm;display:flex;align-items:center;gap:2mm;">✦ Contact Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:4mm;font-size:10pt;">${contact}</div>` : ''}
  </div>
  <div style="background:#6B0F0F;padding:4mm 14mm;text-align:center;position:relative;flex-shrink:0;margin-top:auto;">
    <div style="position:absolute;bottom:3mm;left:3mm;transform:scaleY(-1);">${kolam}</div>
    <div style="position:absolute;bottom:3mm;right:3mm;transform:scale(-1,-1);">${kolam}</div>
    <div style="color:#F5DFA0;font-size:8pt;letter-spacing:0.12em;font-style:italic;">❦ With Blessings — Subham Bhavatu ❦</div>
  </div>
</div>`;
}

// ── TEMPLATE 4: Pasupu Kumkum + Photo ──
export function buildT4(d: BiodataData, photoUrl: string) {
  const photo = photoUrl;
  const personalFields = [
    row('D.O.B', d.dob, 't1-row'),
    row('Place of Birth', d.pob, 't1-row'),
    row('Religion & Caste', d.religionCaste, 't1-row'),
    row('Star', d.star, 't1-row'),
    row('Rasi', d.rasi, 't1-row'),
    row('Gotram', d.gotram, 't1-row'),
    row('Height', d.height, 't1-row'),
    row('Weight', d.weight, 't1-row'),
    row('Complexion', d.complexion, 't1-row'),
    row('Blood Group', d.blood, 't1-row'),
    row('Siblings', d.siblings, 't1-row'),
  ].filter(Boolean).join('');
  const eduFields = [
    row('Education', d.edu, 't1-row t1-row-full'),
    row('Occupation', d.job, 't1-row'),
    row('Working At', d.workat, 't1-row t1-row-full'),
    row('Annual Income', d.income, 't1-row'),
  ].filter(Boolean).join('');
  const familyFields = [
    row('Father', d.father + (d.focc ? ` — ${d.focc}` : ''), 't1-row t1-row-full'),
    row('Mother', d.mother + (d.mocc ? ` — ${d.mocc}` : ''), 't1-row t1-row-full'),
    row('Elder Brother', d.elder, 't1-row t1-row-full'),
    row('Younger Brother', d.younger, 't1-row'),
    row('Elder Sister', d.esisters, 't1-row t1-row-full'),
    row('Younger Sister', d.ysisters, 't1-row'),
  ].filter(Boolean).join('');
  const contactFields = [
    row('Contact', d.cname, 't1-row t1-row-full'),
    row('Mobile', d.mobile, 't1-row'),
    row('Email', d.email, 't1-row'),
    row('Address', d.addr1, 't1-row t1-row-full'),
    d.addr2 ? `<div class="t1-row t1-row-full"><span class="t1-key"></span><span class="t1-val">${d.addr2}</span></div>` : '',
  ].filter(Boolean).join('');

  return `
<div style="position:relative;background:#FFFDF5;width:210mm;min-height:297mm;font-family:'EB Garamond',serif;color:#2C1810;">
  <div style="position:absolute;top:4mm;left:4mm;">${cornerSvg()}</div>
  <div style="position:absolute;top:4mm;right:4mm;transform:scaleX(-1);">${cornerSvg()}</div>
  <div style="position:absolute;bottom:4mm;left:4mm;transform:scaleY(-1);">${cornerSvg()}</div>
  <div style="position:absolute;bottom:4mm;right:4mm;transform:scale(-1,-1);">${cornerSvg()}</div>
  <div style="padding:16mm 16mm 10mm;">
    <div style="display:flex;gap:6mm;align-items:flex-start;margin-bottom:6mm;">
      <img src="${photo}" style="width:35mm;height:42mm;object-fit:cover;border:1.5pt solid #C9A84C;flex-shrink:0;" alt="Photo">
      <div style="flex:1;text-align:center;padding-top:4mm;">
<div style="font-size:9pt;color:#8B1A1A;letter-spacing:0.2em;font-style:italic;margin-bottom:2mm;">॥ Shree Ganeshaya Namah ॥</div>
<div style="font-family:'Cormorant Garamond',serif;font-size:22pt;color:#8B1A1A;font-weight:400;line-height:1.2;">${d.name}</div>
<div style="display:flex;align-items:center;gap:3mm;margin:3mm 0;">
  <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#C9A84C);"></div>
  <div style="font-size:12pt;color:#C0392B;">卐</div>
  <div style="flex:1;height:1px;background:linear-gradient(90deg,#C9A84C,transparent);"></div>
</div>
<div style="font-size:8pt;color:#8B6914;letter-spacing:0.12em;font-style:italic;">Mama Parichay — Marriage Biodata</div>
      </div>
    </div>
    ${personalFields ? `<div style="margin-bottom:4mm;"><div style="font-size:9pt;letter-spacing:0.2em;text-transform:uppercase;color:#8B1A1A;border-bottom:1.5pt solid #E8A427;padding-bottom:1.5mm;margin-bottom:3mm;">✦ Personal Details</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;">${personalFields}</div></div>` : ''}
    ${eduFields ? `<div style="margin-bottom:4mm;"><div style="font-size:9pt;letter-spacing:0.2em;text-transform:uppercase;color:#8B1A1A;border-bottom:1.5pt solid #E8A427;padding-bottom:1.5mm;margin-bottom:3mm;">✦ Education & Career</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;">${eduFields}</div></div>` : ''}
    ${familyFields ? `<div style="margin-bottom:4mm;"><div style="font-size:9pt;letter-spacing:0.2em;text-transform:uppercase;color:#8B1A1A;border-bottom:1.5pt solid #E8A427;padding-bottom:1.5mm;margin-bottom:3mm;">✦ Family Details</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;">${familyFields}</div></div>` : ''}
    ${contactFields ? `<div style="margin-bottom:4mm;"><div style="font-size:9pt;letter-spacing:0.2em;text-transform:uppercase;color:#8B1A1A;border-bottom:1.5pt solid #E8A427;padding-bottom:1.5mm;margin-bottom:3mm;">✦ Contact Details</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;">${contactFields}</div></div>` : ''}
    <div style="text-align:center;margin-top:8mm;padding-top:4mm;border-top:0.5pt solid #C9A84C;">
      <div style="font-size:9pt;color:#C9A84C;letter-spacing:0.15em;font-style:italic;">❦ Subham Bhavatu ❦</div>
    </div>
  </div>
</div>`;
}

// ── TEMPLATE 5: Ivory Lotus + Photo ──
export function buildT5(d: BiodataData, photoUrl: string) {
  const photo = photoUrl;
  const personal = [
    rowT2('D.O.B', d.dob, 't2-row'), rowT2('Place of Birth', d.pob, 't2-row'),
    rowT2('Religion & Caste', d.religionCaste, 't2-row'), rowT2('Star', d.star, 't2-row'),
    rowT2('Rasi', d.rasi, 't2-row'), rowT2('Gotram', d.gotram, 't2-row'),
    rowT2('Height', d.height, 't2-row'), rowT2('Weight', d.weight, 't2-row'),
    rowT2('Complexion', d.complexion, 't2-row'), rowT2('Blood Group', d.blood, 't2-row'),
    rowT2('Siblings', d.siblings, 't2-row'),
  ].filter(Boolean).join('');
  const edu = [
    rowT2('Education', d.edu, 't2-row t2-row-full'), rowT2('Occupation', d.job, 't2-row'),
    rowT2('Working At', d.workat, 't2-row t2-row-full'), rowT2('Annual Income', d.income, 't2-row'),
  ].filter(Boolean).join('');
  const family = [
    rowT2('Father', d.father + (d.focc ? ` — ${d.focc}` : ''), 't2-row t2-row-full'),
    rowT2('Mother', d.mother + (d.mocc ? ` — ${d.mocc}` : ''), 't2-row t2-row-full'),
    rowT2('Elder Brother', d.elder, 't2-row t2-row-full'), rowT2('Younger Brother', d.younger, 't2-row'),
    rowT2('Elder Sister', d.esisters, 't2-row t2-row-full'), rowT2('Younger Sister', d.ysisters, 't2-row'),
  ].filter(Boolean).join('');
  const contact = [
    rowT2('Contact', d.cname, 't2-row t2-row-full'), rowT2('Mobile', d.mobile, 't2-row'),
    rowT2('Email', d.email, 't2-row'), rowT2('Address', d.addr1, 't2-row t2-row-full'),
    d.addr2 ? `<div class="t2-row t2-row-full"><span class="t2-key"></span><span class="t2-val">${d.addr2}</span></div>` : '',
  ].filter(Boolean).join('');
  const lotusCorner = `<svg viewBox="0 0 50 50" width="50" height="50" xmlns="http://www.w3.org/2000/svg"><path d="M2,2 Q8,12 2,22 Q12,16 22,22 Q16,12 22,2 Q12,8 2,2Z" fill="#E8A42730" stroke="#C9A84C" stroke-width="0.5"/><circle cx="12" cy="12" r="4" fill="#E8A42740" stroke="#C9A84C" stroke-width="0.5"/><circle cx="12" cy="12" r="2" fill="#C0392B40"/><circle cx="6" cy="6" r="1.5" fill="#E8A427"/></svg>`;
  return `
<div style="width:210mm;min-height:297mm;background:#FEFCF7;position:relative;font-family:'EB Garamond',serif;color:#2C1810;">
  <div style="position:absolute;inset:6mm;border:0.5pt solid #C9A84C;pointer-events:none;"></div>
  <div style="position:absolute;inset:8mm;border:1.5pt solid #E8A427;pointer-events:none;"></div>
  <div style="position:absolute;top:5mm;left:5mm;">${lotusCorner}</div>
  <div style="position:absolute;top:5mm;right:5mm;transform:scaleX(-1);">${lotusCorner}</div>
  <div style="position:absolute;bottom:5mm;left:5mm;transform:scaleY(-1);">${lotusCorner}</div>
  <div style="position:absolute;bottom:5mm;right:5mm;transform:scale(-1,-1);">${lotusCorner}</div>
  <div style="padding:20mm 20mm 14mm;">
    <div style="text-align:center;margin-bottom:6mm;">
      <div style="font-size:9pt;color:#C0392B;letter-spacing:0.15em;margin-bottom:3mm;font-style:italic;">॥ Shree Ganeshaya Namah ॥</div>
      <img src="${photo}" style="width:32mm;height:38mm;object-fit:cover;border:1.5pt solid #C9A84C;display:block;margin:0 auto 3mm;" alt="Photo">
      <div style="font-family:'Cormorant Garamond',serif;font-size:26pt;color:#5C1E00;font-weight:300;letter-spacing:0.05em;">${d.name}</div>
      <div style="font-size:13pt;color:#E8A427;margin:2mm 0;letter-spacing:0.5em;">✦ ✦ ✦</div>
      <div style="font-size:8pt;color:#9C7A5A;font-style:italic;letter-spacing:0.1em;">Mama Parichay — Marriage Biodata</div>
    </div>
    ${personal ? `<div style="font-size:10pt;color:#C0392B;text-align:center;letter-spacing:0.15em;text-transform:uppercase;margin:3mm 0 1mm;font-style:italic;">Personal Details</div><hr style="width:60%;margin:2mm auto;border:none;border-top:0.5pt solid #C9A84C;"><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:3mm;">${personal}</div>` : ''}
    ${edu ? `<div style="font-size:10pt;color:#C0392B;text-align:center;letter-spacing:0.15em;text-transform:uppercase;margin:3mm 0 1mm;font-style:italic;">Education & Career</div><hr style="width:60%;margin:2mm auto;border:none;border-top:0.5pt solid #C9A84C;"><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:3mm;">${edu}</div>` : ''}
    ${family ? `<div style="font-size:10pt;color:#C0392B;text-align:center;letter-spacing:0.15em;text-transform:uppercase;margin:3mm 0 1mm;font-style:italic;">Family Details</div><hr style="width:60%;margin:2mm auto;border:none;border-top:0.5pt solid #C9A84C;"><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:3mm;">${family}</div>` : ''}
    ${contact ? `<div style="font-size:10pt;color:#C0392B;text-align:center;letter-spacing:0.15em;text-transform:uppercase;margin:3mm 0 1mm;font-style:italic;">Contact Details</div><hr style="width:60%;margin:2mm auto;border:none;border-top:0.5pt solid #C9A84C;"><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:3mm;">${contact}</div>` : ''}
    <div style="text-align:center;margin-top:8mm;"><div style="font-size:9pt;color:#C9A84C;letter-spacing:0.2em;font-style:italic;">❧ Subham Bhavatu ❧</div></div>
  </div>
</div>`;
}

// ── TEMPLATE 6: Royal Maroon + Photo ──
export function buildT6(d: BiodataData, photoUrl: string) {
  const photo = photoUrl;
  const personal = [
    rowT3('D.O.B', d.dob, 't3-row'), rowT3('Place of Birth', d.pob, 't3-row'),
    rowT3('Religion & Caste', d.religionCaste, 't3-row'), rowT3('Star', d.star, 't3-row'),
    rowT3('Rasi', d.rasi, 't3-row'), rowT3('Gotram', d.gotram, 't3-row'),
    rowT3('Height', d.height, 't3-row'), rowT3('Weight', d.weight, 't3-row'),
    rowT3('Complexion', d.complexion, 't3-row'), rowT3('Blood Group', d.blood, 't3-row'),
    rowT3('Siblings', d.siblings, 't3-row'),
  ].filter(Boolean).join('');
  const edu = [
    rowT3('Education', d.edu, 't3-row t3-row-full'), rowT3('Occupation', d.job, 't3-row'),
    rowT3('Working At', d.workat, 't3-row t3-row-full'), rowT3('Annual Income', d.income, 't3-row'),
  ].filter(Boolean).join('');
  const family = [
    rowT3('Father', d.father + (d.focc ? ` — ${d.focc}` : ''), 't3-row t3-row-full'),
    rowT3('Mother', d.mother + (d.mocc ? ` — ${d.mocc}` : ''), 't3-row t3-row-full'),
    rowT3('Elder Brother', d.elder, 't3-row t3-row-full'), rowT3('Younger Brother', d.younger, 't3-row'),
    rowT3('Elder Sister', d.esisters, 't3-row t3-row-full'), rowT3('Younger Sister', d.ysisters, 't3-row'),
  ].filter(Boolean).join('');
  const contact = [
    rowT3('Contact', d.cname, 't3-row t3-row-full'), rowT3('Mobile', d.mobile, 't3-row'),
    rowT3('Email', d.email, 't3-row'), rowT3('Address', d.addr1, 't3-row t3-row-full'),
    d.addr2 ? `<div class="t3-row t3-row-full"><span class="t3-key"></span><span class="t3-val">${d.addr2}</span></div>` : '',
  ].filter(Boolean).join('');
  const kolam = `<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M2,2 L12,2 L2,12Z" fill="#E8A42740"/><path d="M4,4 L10,4 L4,10Z" fill="#E8A427"/><circle cx="4" cy="4" r="1.5" fill="#FDF6E3"/></svg>`;
  return `
<div style="width:210mm;min-height:297mm;background:#FDF6E3;position:relative;display:flex;flex-direction:column;font-family:'EB Garamond',serif;color:#2C1810;">
  <div style="background:#6B0F0F;padding:6mm 14mm;position:relative;flex-shrink:0;">
    <div style="position:absolute;top:3mm;left:3mm;">${kolam}</div>
    <div style="position:absolute;top:3mm;right:3mm;transform:scaleX(-1);">${kolam}</div>
    <div style="display:flex;align-items:center;gap:6mm;">
      <div style="flex:1;">
<div style="font-size:9pt;color:#F5DFA0;letter-spacing:0.2em;margin-bottom:2mm;font-style:italic;">॥ Shree Ganeshaya Namah ॥</div>
<div style="font-family:'Cormorant Garamond',serif;font-size:24pt;color:#F5DFA0;font-weight:400;">${d.name}</div>
<div style="display:flex;align-items:center;gap:3mm;margin:2mm 0;">
  <div style="flex:1;height:0.5pt;background:linear-gradient(90deg,transparent,#E8A427);"></div>
  <div style="font-size:8pt;color:#E8A427;letter-spacing:0.2em;">Mama Parichay</div>
  <div style="flex:1;height:0.5pt;background:linear-gradient(90deg,#E8A427,transparent);"></div>
</div>
      </div>
      <img src="${photo}" style="width:28mm;height:34mm;object-fit:cover;border:1.5pt solid #E8A427;flex-shrink:0;" alt="Photo">
    </div>
  </div>
  <div style="padding:6mm 14mm 10mm;flex:1;">
    ${personal ? `<div style="font-size:9pt;letter-spacing:0.18em;color:#6B0F0F;text-transform:uppercase;padding:1.5mm 0;border-bottom:1pt solid #E8A427;margin:3mm 0 2mm;">✦ Personal Details</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:3mm;font-size:10pt;">${personal}</div>` : ''}
    ${edu ? `<div style="font-size:9pt;letter-spacing:0.18em;color:#6B0F0F;text-transform:uppercase;padding:1.5mm 0;border-bottom:1pt solid #E8A427;margin:3mm 0 2mm;">✦ Education & Career</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:3mm;font-size:10pt;">${edu}</div>` : ''}
    ${family ? `<div style="font-size:9pt;letter-spacing:0.18em;color:#6B0F0F;text-transform:uppercase;padding:1.5mm 0;border-bottom:1pt solid #E8A427;margin:3mm 0 2mm;">✦ Family Details</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:3mm;font-size:10pt;">${family}</div>` : ''}
    ${contact ? `<div style="font-size:9pt;letter-spacing:0.18em;color:#6B0F0F;text-transform:uppercase;padding:1.5mm 0;border-bottom:1pt solid #E8A427;margin:3mm 0 2mm;">✦ Contact Details</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:3mm;font-size:10pt;">${contact}</div>` : ''}
  </div>
  <div style="background:#6B0F0F;padding:4mm 14mm;text-align:center;position:relative;flex-shrink:0;margin-top:auto;">
    <div style="position:absolute;bottom:3mm;left:3mm;transform:scaleY(-1);">${kolam}</div>
    <div style="position:absolute;bottom:3mm;right:3mm;transform:scale(-1,-1);">${kolam}</div>
    <div style="color:#F5DFA0;font-size:8pt;letter-spacing:0.12em;font-style:italic;">❦ With Blessings — Subham Bhavatu ❦</div>
  </div>
</div>`;
}

export function buildBiodata(d: BiodataData, templateId: TemplateId, photoUrl: string | null): string {
  if (templateId === 1) return buildT1(d);
  if (templateId === 2) return buildT2(d);
  if (templateId === 3) return buildT3(d);
  if (templateId === 4) return buildT4(d, photoUrl!);
  if (templateId === 5) return buildT5(d, photoUrl!);
  return buildT6(d, photoUrl!);
}
