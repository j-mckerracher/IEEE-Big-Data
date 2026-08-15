export interface TableRow {
  method: string;
  sub?: string;
  macs: string;
  params: string;
  metric: string;
  highlight?: boolean;
}

export interface TableSection {
  heading: string;
  rows: TableRow[];
}

export interface ResultTable {
  id: string;
  caption: string;
  metricLabel: string;
  sections: TableSection[];
}

// Transcribed from demo-source/main.tex (STRIDE results tables).
export const TABLES: ResultTable[] = [
  {
    id: 'coco',
    caption:
      "COCO Performance Comparison of Object Detection Methods. STRIDE is better in terms of MACs and Params while achieving competitive mAP.",
    metricLabel: 'mAP (%)',
    sections: [
      {
        heading: 'Accurate Bounding Boxes (IoU > 0.75)',
        rows: [
          { method: 'Co-DETR', macs: '88.1 G', params: '41.48 M', metric: '67' },
          { method: 'EfficientDet-D7', macs: '99.6 G', params: '64 M', metric: '59.9' },
          { method: 'RetinaNet+', sub: 'ResNet50 Backbone', macs: '152.81 G', params: '34.01 M', metric: '60.3' },
          { method: 'FCOS+', sub: 'ResNet50 Backbone', macs: '128.21 G', params: '32.27 M', metric: '39.8' },
          { method: 'STRIDE', sub: '(ground truth bounding boxes)', macs: '685.18 M', params: '4.591 M', metric: '62.79', highlight: true },
        ],
      },
      {
        heading: 'Moderate Bounding Boxes (0.5 < IoU < 0.75)',
        rows: [
          { method: 'Mask R-CNN+', sub: 'CSwin-B', macs: '526 G', params: '97 M', metric: '44.9' },
          { method: 'FasterRCNN+', sub: 'MobileNetV3', macs: '1.08 G', params: '19.39 M', metric: '22.8' },
          { method: 'RT-DETRv2S', macs: '30 G', params: '20 M', metric: '48.1' },
          { method: 'RT-DETR-R18', macs: '30 G', params: '20 M', metric: '46.5' },
          { method: 'YOLO-v8s', macs: '14.4 G', params: '11.16 M', metric: '43.2' },
          { method: 'STRIDE', sub: '(20% bbox variation)', macs: '685.18 M', params: '4.591 M', metric: '57.91', highlight: true },
        ],
      },
      {
        heading: 'Inaccurate Bounding Boxes (IoU < 0.5)',
        rows: [
          { method: 'YOLOS', macs: '7.91 G', params: '5.65 M', metric: '36.7' },
          { method: 'YOLO-v12n', macs: '3.25 G', params: '2.6 M', metric: '40.59' },
          { method: 'EfficientDet-D0', macs: '3.6 G', params: '4.1 M', metric: '34.3' },
          { method: 'SSD+', sub: 'MobileNetV3', macs: '662 M', params: '3.4 M', metric: '25.1' },
          { method: 'SSD + STRIDE', macs: '685.18 M', params: '4.591 M', metric: '40.62', highlight: true },
        ],
      },
    ],
  },
  {
    id: 'pascal-voc',
    caption:
      'PASCAL VOC Performance Comparison of Object Detection Methods. STRIDE is better in terms of MACs and Params while achieving competitive mAP.',
    metricLabel: 'mAP (%)',
    sections: [
      {
        heading: 'Accurate Bounding Boxes (IoU > 0.75)',
        rows: [
          { method: 'Cascade Mask-RCNN+', sub: 'EfficientNet-B7+NAS-FPN', macs: '686 M', params: '7.7 M', metric: '89' },
          { method: 'STRIDE', macs: '685.18 M', params: '4.591 M', metric: '93.49', highlight: true },
        ],
      },
      {
        heading: 'Moderate Bounding Boxes (0.5 < IoU < 0.75)',
        rows: [
          { method: 'FasterRCNN+', sub: 'ResNet-101', macs: '191.88 G', params: '184.68 M', metric: '74.2' },
          { method: 'STRIDE', sub: '(20% bbox var.)', macs: '685.18 M', params: '4.591 M', metric: '89.3', highlight: true },
        ],
      },
      {
        heading: 'Inaccurate Bounding Boxes (IoU < 0.5)',
        rows: [
          { method: 'SSD + MobileNetv3', sub: '(Finetuned)', macs: '662 M', params: '3.4 M', metric: '30.7' },
          { method: 'SSD + STRIDE', sub: '(Finetuned)', macs: '685.18 M', params: '4.591 M', metric: '56.2', highlight: true },
        ],
      },
    ],
  },
  {
    id: 'imagenet',
    caption:
      "ImageNet classification performance using STRIDE's Core-Buffer patch strategy, processed by an efficient ViT encoder. STRIDE achieves a strong accuracy-efficiency trade-off, outperforming comparable models in terms of MACs and parameter usage.",
    metricLabel: 'Accuracy',
    sections: [
      {
        heading: '',
        rows: [
          { method: 'ViT', macs: '1693 G', params: '86 M', metric: '84.8%' },
          { method: 'LGViT', macs: '10.65 G', params: '101 M', metric: '80.3%' },
          { method: 'AdaptFormer', macs: '1.71 G', params: '87.6 M', metric: '82.6%' },
          { method: 'EfficientViT', macs: '2.1 G', params: '24 M', metric: '82.7%' },
          { method: 'EfficientViT-L2', macs: '20 G', params: '64 M', metric: '83.5%' },
          { method: 'ConvNeXt-T', macs: '4.5 G', params: '27.80 M', metric: '82.1%' },
          { method: 'MNv4-Conv-S', macs: '0.2 G', params: '3.4 M', metric: '73.8%' },
          { method: 'MNv4-Hybrid-L', macs: '7.2 G', params: '11.4 M', metric: '83.4%' },
          { method: 'PVT-Tiny', macs: '1.9 G', params: '12.84 M', metric: '75.1%' },
          { method: 'MobileViT-v2', macs: '2.0 G', params: '10.6 M', metric: '80.4%' },
          { method: 'EfficientFormer-L1', macs: '1.42 G', params: '11.39 M', metric: '80.2%' },
          { method: 'EfficientFormer_v2-L1', macs: '2.56 G', params: '26.1 M', metric: '83.3%' },
          { method: 'T2T-ViT-14', macs: '4.8 G', params: '21.5 M', metric: '80.5%' },
          { method: 'CSwin-T', macs: '4.3 G', params: '23 M', metric: '82.7%' },
          { method: 'YOLO-v11', macs: '2.5 G', params: '10.4 M', metric: '77.3%' },
          { method: 'GMorph', macs: '11.31 G', params: '133.05 M', metric: '71.7%' },
          { method: 'STRIDE', macs: '1.25 G', params: '5.7 M', metric: '83.59%', highlight: true },
        ],
      },
    ],
  },
  {
    id: 'cifar10',
    caption:
      'Classification performance on CIFAR10. ViT exhibits the highest computational cost with 1693 G MACs and 86 M parameters. STRIDE achieves similar accuracy with only 1.25 G MACs and 5.75 M parameters, operating in the megascale, offering a substantial reduction in computational resources with minimal accuracy trade-off.',
    metricLabel: 'Accuracy',
    sections: [
      {
        heading: '',
        rows: [
          { method: 'ViT', macs: '1693 G', params: '86 M', metric: '95.29%' },
          { method: 'LGViT', macs: '10.65 G', params: '101 M', metric: '92.5%' },
          { method: 'AdaptFormer', macs: '1.71 G', params: '87.6 M', metric: '93.36%' },
          { method: 'EfficientViT', sub: '(finetuned)', macs: '2.1 G', params: '24 M', metric: '93.27%' },
          { method: 'STRIDE', macs: '1.25 G', params: '5.75 M', metric: '93.44%', highlight: true },
        ],
      },
    ],
  },
];
