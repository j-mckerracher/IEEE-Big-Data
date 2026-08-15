export type Level = 'original' | 'high' | 'medium' | 'low' | 'ssd';

export interface LevelResult {
  label: string;
  confidence: number;
}

export interface DemoImage {
  id: string;
  title: string;
  groundTruth: string;
  levels: Record<Level, { src: string; result: LevelResult }>;
}

export const LEVELS: { id: Level; label: string; blurb: string }[] = [
  { id: 'original', label: 'Original', blurb: 'Unmodified reference frame' },
  { id: 'high', label: 'High', blurb: 'High memory budget' },
  { id: 'medium', label: 'Medium', blurb: 'Medium memory budget' },
  { id: 'low', label: 'Low', blurb: 'Low memory budget' },
  { id: 'ssd', label: 'SSD', blurb: 'SSD baseline, single patch' },
];

function img(id: string, level: string): string {
  return `/demo/image_${id}_${level}.jpg`;
}

// Sourced from public/demo/summary.json, produced by Preeti for the
// STRIDE compression-level demo (see main.tex results tables).
export const DEMO_IMAGES: DemoImage[] = [
  {
    id: 'img_1',
    title: 'Dog',
    groundTruth: 'dog',
    levels: {
      original: { src: img('1', 'original'), result: { label: 'dog', confidence: 1.0 } },
      high: { src: img('1', 'high'), result: { label: 'dog', confidence: 0.95 } },
      medium: { src: img('1', 'medium'), result: { label: 'dog', confidence: 0.88 } },
      low: { src: img('1', 'low'), result: { label: 'dog', confidence: 0.53 } },
      ssd: { src: img('1', 'ssd'), result: { label: 'horse', confidence: 0.29 } },
    },
  },
  {
    id: 'img_2',
    title: 'Bench',
    groundTruth: 'bench',
    levels: {
      original: { src: img('2', 'original'), result: { label: 'bench', confidence: 1.0 } },
      high: { src: img('2', 'high'), result: { label: 'bench', confidence: 0.92 } },
      medium: { src: img('2', 'medium'), result: { label: 'bench', confidence: 0.77 } },
      low: { src: img('2', 'low'), result: { label: 'bench', confidence: 0.46 } },
      ssd: { src: img('2', 'ssd'), result: { label: 'donut', confidence: 0.99 } },
    },
  },
  {
    id: 'img_3',
    title: 'Plate',
    groundTruth: 'plate',
    levels: {
      original: { src: img('3', 'original'), result: { label: 'plate', confidence: 1.0 } },
      high: { src: img('3', 'high'), result: { label: 'plate', confidence: 0.85 } },
      medium: { src: img('3', 'medium'), result: { label: 'plate', confidence: 0.63 } },
      low: { src: img('3', 'low'), result: { label: 'spoon', confidence: 0.72 } },
      ssd: { src: img('3', 'ssd'), result: { label: 'chair', confidence: 0.67 } },
    },
  },
  {
    id: 'img_4',
    title: 'Shoe',
    groundTruth: 'shoe',
    levels: {
      original: { src: img('4', 'original'), result: { label: 'shoe', confidence: 1.0 } },
      high: { src: img('4', 'high'), result: { label: 'shoe', confidence: 0.75 } },
      medium: { src: img('4', 'medium'), result: { label: 'shoe', confidence: 0.65 } },
      low: { src: img('4', 'low'), result: { label: 'shoe', confidence: 0.52 } },
      ssd: { src: img('4', 'ssd'), result: { label: 'bicycle', confidence: 0.58 } },
    },
  },
];
