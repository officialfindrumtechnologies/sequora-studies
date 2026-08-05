// Maps a subject row to its TOPIC_VISUALS key.
//
// Split out of topic-visuals.js so it can be imported eagerly while the 1.9 MB
// of visualisation data behind it loads on demand. The function is pure string
// matching and never touches TOPIC_VISUALS, so the two genuinely are separable.

// Derive the TOPIC_VISUALS key from a subject object (from Supabase subjects table)
export function getTopicVisualsKey(subj) {
  // 1. Exact exam code — most reliable
  const code = (subj.exam_code || '').trim();
  if (code === '0610') return 'cambridge_igcse_biology';
  if (code === '0620') return 'cambridge_igcse_chemistry';
  if (code === '0625') return 'cambridge_igcse_physics';
  if (code === '4BI1') return 'edexcel_igcse_biology';
  if (code === '4CH1') return 'edexcel_igcse_chemistry';
  if (code === '4PH1') return 'edexcel_igcse_physics';
  if (code === '9BI0') return 'edexcel_alevel_biology';
  if (code === '9CH0') return 'edexcel_alevel_chemistry';
  if (code === '9PH0') return 'edexcel_alevel_physics';
  if (code === '9700') return 'cambridge_alevel_biology';
  if (code === '9701') return 'cambridge_alevel_chemistry';
  if (code === '9702') return 'cambridge_alevel_physics';

  // 2a. IB fallback via level column — real IB subjects have exam_code = null
  // (syllabus_templates.subject_code is NULL for all IB rows), so the IB-prefixed
  // exam_code path below never fires for actual user subjects. `level` (HL/SL) is
  // only ever set for IB subjects, so it's a reliable signal on its own.
  const levelUC = (subj.level || '').toUpperCase();
  if (levelUC === 'HL' || levelUC === 'SL') {
    const ibLevel = levelUC === 'HL' ? 'hl' : 'sl';
    const bareName = (subj.name || '').toLowerCase().trim();
    if (bareName === 'biology') return `ib_${ibLevel}_biology`;
    if (bareName === 'chemistry') return `ib_${ibLevel}_chemistry`;
    if (bareName === 'physics') return `ib_${ibLevel}_physics`;
  }

  // 2b. IB exam_code pattern: IB-PHYS-HL, IB-CHEM-SL, IB-BIO-HL, etc.
  if (code.startsWith('IB-')) {
    const parts = code.split('-');
    const subCode = parts[1] || '';
    const rawLevel = (subj.level || parts[2] || '').toUpperCase();
    const ibLevel = (rawLevel === 'HL' || rawLevel === 'HIGHER') ? 'hl' : 'sl';
    if (subCode === 'BIO'  || subCode === 'BIOL') return `ib_${ibLevel}_biology`;
    if (subCode === 'CHEM')                        return `ib_${ibLevel}_chemistry`;
    if (subCode === 'PHYS')                        return `ib_${ibLevel}_physics`;
  }

  // 3. Name-based fallback — backward compat for old data missing structured fields
  const name = (subj.name || '').toLowerCase();
  if (name.includes('biology')   && (name.includes('cambridge') || name.includes('igcse'))) return 'cambridge_igcse_biology';
  if (name.includes('chemistry') && (name.includes('cambridge') || name.includes('igcse'))) return 'cambridge_igcse_chemistry';
  if (name.includes('physics')   && (name.includes('cambridge') || name.includes('igcse'))) return 'cambridge_igcse_physics';
  if (name.includes('biology')   && name.includes('edexcel') && name.includes('igcse')) return 'edexcel_igcse_biology';
  if (name.includes('chemistry') && name.includes('edexcel') && name.includes('igcse')) return 'edexcel_igcse_chemistry';
  if (name.includes('physics')   && name.includes('edexcel') && name.includes('igcse')) return 'edexcel_igcse_physics';
  if (name.includes('biology')   && name.includes('edexcel') && (name.includes('a level') || name.includes('alevel') || name.includes('a-level'))) return 'edexcel_alevel_biology';
  if (name.includes('chemistry') && name.includes('edexcel') && (name.includes('a level') || name.includes('alevel') || name.includes('a-level'))) return 'edexcel_alevel_chemistry';
  if (name.includes('physics')   && name.includes('edexcel') && (name.includes('a level') || name.includes('alevel') || name.includes('a-level'))) return 'edexcel_alevel_physics';
  if (name.includes('biology')   && (name.includes('a level') || name.includes('alevel') || name.includes('a-level'))) return 'cambridge_alevel_biology';
  if (name.includes('chemistry') && (name.includes('a level') || name.includes('alevel') || name.includes('a-level'))) return 'cambridge_alevel_chemistry';
  if (name.includes('physics')   && (name.includes('a level') || name.includes('alevel') || name.includes('a-level'))) return 'cambridge_alevel_physics';
  if (name.includes('ib') || name.includes('diploma')) {
    if (name.includes('biology')   && (name.includes(' hl') || name.includes('higher'))) return 'ib_hl_biology';
    if (name.includes('biology')   && (name.includes(' sl') || name.includes('standard'))) return 'ib_sl_biology';
    if (name.includes('biology'))   return 'ib_sl_biology';
    if (name.includes('chemistry') && (name.includes(' hl') || name.includes('higher'))) return 'ib_hl_chemistry';
    if (name.includes('chemistry') && (name.includes(' sl') || name.includes('standard'))) return 'ib_sl_chemistry';
    if (name.includes('chemistry')) return 'ib_sl_chemistry';
    if (name.includes('physics')   && (name.includes(' hl') || name.includes('higher'))) return 'ib_hl_physics';
    if (name.includes('physics')   && (name.includes(' sl') || name.includes('standard'))) return 'ib_sl_physics';
    if (name.includes('physics'))   return 'ib_sl_physics';
  }
  if (name.includes('physiology'))                              return 'mbbs_physiology';
  if (name.includes('biochemistry') || name.includes('biochem')) return 'mbbs_biochemistry';
  if (name.includes('histology'))                               return 'mbbs_histology';
  if (name.includes('anatomy'))                                 return 'mbbs_anatomy';
  if (name.includes('pharmacology'))                            return 'mbbs_pharmacology';
  if (name.includes('forensic'))                                return 'mbbs_forensic_medicine';
  if (name.includes('microbiology') || name.includes('micro'))  return 'mbbs_microbiology';
  if (name.includes('pathology'))                               return 'mbbs_pathology';
  if (name.includes('community'))                               return 'mbbs_community_medicine';
  if (name.includes('ophthalmology') || name.includes('opth'))  return 'mbbs_ophthalmology';
  if (name.includes('obstetrics') || name.includes('gynaecology') || name.includes('gynae') || name.includes('obs & gyn') || name.includes('obgyn')) return 'mbbs_obs_gynae';
  if (name.includes('ear, nose') || name.includes('otolaryngology') || name.includes('otorhinolaryngology')) return 'mbbs_ent';
  if (name.includes('paediatrics') || name.includes('pediatrics') || name.includes('paed')) return 'mbbs_paediatrics';
  // Surgery is one of the eleven BM&DC subjects and TOPIC_VISUALS has carried 18
  // topics for it all along, but nothing ever returned the key, so every one of
  // them was unreachable. Kept above the 'medicine' line only for grouping —
  // "surgery" does not contain "medicine", so the order does not matter here.
  if (name.includes('surgery') || name.includes('surgical')) return 'mbbs_surgery';
  if (name.includes('medicine') && !name.includes('forensic') && !name.includes('community')) return 'mbbs_medicine';
  return null;
}
