export interface SampleEntry {
  id: string
  title: string
  bpm: number
  key: string
  genre: string
  tags: string[]
}

// Local catalog — same shape a Splice API response would return.
// Swap this module for a real fetch() to the Splice API once credentials exist;
// nothing else in the search route or UI needs to change.
export const SAMPLE_CATALOG: SampleEntry[] = [
  { id: 's1', title: 'Midnight 808 Loop', bpm: 140, key: 'C Minor', genre: 'Hip-Hop', tags: ['808', 'trap', 'dark'] },
  { id: 's2', title: 'Detroit Hats Vol. 3', bpm: 145, key: 'N/A', genre: 'Hip-Hop', tags: ['hats', 'drums'] },
  { id: 's3', title: 'Analog Warm Bass', bpm: 96, key: 'F Minor', genre: 'R&B', tags: ['bass', 'analog', 'warm'] },
  { id: 's4', title: 'Church Organ Chop', bpm: 88, key: 'G Major', genre: 'Gospel', tags: ['organ', 'soul', 'chop'] },
  { id: 's5', title: 'Vinyl Crackle Texture', bpm: 0, key: 'N/A', genre: 'FX', tags: ['texture', 'lofi', 'vinyl'] },
  { id: 's6', title: 'Uptempo Drill Kick', bpm: 150, key: 'N/A', genre: 'Drill', tags: ['kick', 'drill', 'hard'] },
  { id: 's7', title: 'Ethereal Vocal Chop', bpm: 120, key: 'A Minor', genre: 'Electronic', tags: ['vocal', 'chop', 'atmospheric'] },
  { id: 's8', title: 'Boom Bap Break', bpm: 92, key: 'N/A', genre: 'Hip-Hop', tags: ['break', 'boom-bap', 'vintage'] },
  { id: 's9', title: 'Synth Pluck Melody', bpm: 128, key: 'D Minor', genre: 'Pop', tags: ['synth', 'melody', 'bright'] },
  { id: 's10', title: 'Trap Flute Riff', bpm: 138, key: 'E Minor', genre: 'Trap', tags: ['flute', 'melodic', 'trap'] },
  { id: 's11', title: 'Deep Sub Bass Hit', bpm: 0, key: 'N/A', genre: 'FX', tags: ['sub', 'bass', 'hit'] },
  { id: 's12', title: 'R&B Guitar Loop', bpm: 82, key: 'Bb Major', genre: 'R&B', tags: ['guitar', 'smooth', 'loop'] },
]
