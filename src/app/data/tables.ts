export interface TableRow {
  method: string;
  sub?: string;
  macs: string;
  params: string;
  metric: string;
  highlight?: boolean;
  refs?: string[];
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
          { method: 'Co-DETR', macs: '88.1 G', params: '41.48 M', metric: '67', refs: ['detr', 'zong2023detrs'] },
          { method: 'EfficientDet-D7', macs: '99.6 G', params: '64 M', metric: '59.9', refs: ['tan2020efficientdet'] },
          { method: 'RetinaNet+', sub: 'ResNet50 Backbone', macs: '152.81 G', params: '34.01 M', metric: '60.3', refs: ['lin2017focal', 'pytorchvision_retinanet'] },
          { method: 'FCOS+', sub: 'ResNet50 Backbone', macs: '128.21 G', params: '32.27 M', metric: '39.8', refs: ['fcos'] },
          { method: 'STRIDE', sub: '(ground truth bounding boxes)', macs: '685.18 M', params: '4.591 M', metric: '62.79', highlight: true },
        ],
      },
      {
        heading: 'Moderate Bounding Boxes (0.5 < IoU < 0.75)',
        rows: [
          { method: 'Mask R-CNN+', sub: 'CSwin-B', macs: '526 G', params: '97 M', metric: '44.9', refs: ['he2017mask', 'dong2022cswin'] },
          { method: 'FasterRCNN+', sub: 'MobileNetV3', macs: '1.08 G', params: '19.39 M', metric: '22.8', refs: ['ren2015faster', 'mobilenet', 'fasterrcnn'] },
          { method: 'RT-DETRv2S', macs: '30 G', params: '20 M', metric: '48.1', refs: ['rtdetrv2'] },
          { method: 'RT-DETR-R18', macs: '30 G', params: '20 M', metric: '46.5', refs: ['rtdetr'] },
          { method: 'YOLO-v8s', macs: '14.4 G', params: '11.16 M', metric: '43.2', refs: ['yolo', 'yolo_v8'] },
          { method: 'STRIDE', sub: '(20% bbox variation)', macs: '685.18 M', params: '4.591 M', metric: '57.91', highlight: true },
        ],
      },
      {
        heading: 'Inaccurate Bounding Boxes (IoU < 0.5)',
        rows: [
          { method: 'YOLOS', macs: '7.91 G', params: '5.65 M', metric: '36.7', refs: ['YOLOS', 'yolos_tiny'] },
          { method: 'YOLO-v12n', macs: '3.25 G', params: '2.6 M', metric: '40.59', refs: ['yolo12'] },
          { method: 'EfficientDet-D0', macs: '3.6 G', params: '4.1 M', metric: '34.3', refs: ['tan2020efficientdet'] },
          { method: 'SSD+', sub: 'MobileNetV3', macs: '662 M', params: '3.4 M', metric: '25.1', refs: ['liu2016ssd', 'mobilenet', 'torchvision_ssd'] },
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
          { method: 'Cascade Mask-RCNN+', sub: 'EfficientNet-B7+NAS-FPN', macs: '720 G', params: '185 M', metric: '89', refs: ['tan2019efficientnet', 'ghiasi2021simple'] },
          { method: 'STRIDE', macs: '685.18 M', params: '4.591 M', metric: '93.49', highlight: true },
        ],
      },
      {
        heading: 'Moderate Bounding Boxes (0.5 < IoU < 0.75)',
        rows: [
          { method: 'FasterRCNN+', sub: 'ResNet-101', macs: '191.88 G', params: '184.68 M', metric: '74.2', refs: ['ren2015faster', 'voc_faster_rcnn'] },
          { method: 'STRIDE', sub: '(20% bbox var.)', macs: '685.18 M', params: '4.591 M', metric: '89.3', highlight: true },
        ],
      },
      {
        heading: 'Inaccurate Bounding Boxes (IoU < 0.5)',
        rows: [
          { method: 'SSD + MobileNetv3', sub: '(Finetuned)', macs: '662 M', params: '3.4 M', metric: '30.7', refs: ['liu2016ssd', 'mobilenet'] },
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
          { method: 'ViT', macs: '1693 G', params: '86 M', metric: '84.8%', refs: ['dosovitskiy2020image', 'steiner2021augreg'] },
          { method: 'LGViT', macs: '10.65 G', params: '101 M', metric: '80.3%', refs: ['xu2023lgvit'] },
          { method: 'AdaptFormer', macs: '1.71 G', params: '87.6 M', metric: '82.6%', refs: ['chen2022adaptformer'] },
          { method: 'EfficientViT', macs: '2.1 G', params: '24 M', metric: '82.7%', refs: ['cai2023efficientvit', 'efficientvit-b2-cls-huggingface'] },
          { method: 'EfficientViT-L2', macs: '20 G', params: '64 M', metric: '83.5%', refs: ['cai2023efficientvit', 'efficientvit-l2-cls-huggingface'] },
          { method: 'ConvNeXt-T', macs: '4.5 G', params: '27.80 M', metric: '82.1%', refs: ['liu2022convnet'] },
          { method: 'MNv4-Conv-S', macs: '0.2 G', params: '3.4 M', metric: '73.8%', refs: ['qin2404mobilenetv4'] },
          { method: 'MNv4-Hybrid-L', macs: '7.2 G', params: '11.4 M', metric: '83.4%', refs: ['qin2404mobilenetv4'] },
          { method: 'PVT-Tiny', macs: '1.9 G', params: '12.84 M', metric: '75.1%', refs: ['wang2021pyramid', 'huggingface_pvt_docs'] },
          { method: 'MobileViT-v2', macs: '2.0 G', params: '10.6 M', metric: '80.4%', refs: ['mehta2023separable'] },
          { method: 'EfficientFormer-L1', macs: '1.42 G', params: '11.39 M', metric: '80.2%', refs: ['li2022efficientformer'] },
          { method: 'EfficientFormer_v2-L1', macs: '2.56 G', params: '26.1 M', metric: '83.3%', refs: ['efficientformerv2'] },
          { method: 'T2T-ViT-14', macs: '4.8 G', params: '21.5 M', metric: '80.5%', refs: ['yuan2021tokens'] },
          { method: 'CSwin-T', macs: '4.3 G', params: '23 M', metric: '82.7%', refs: ['dong2022cswin'] },
          { method: 'YOLO-v11', macs: '2.5 G', params: '10.4 M', metric: '77.3%', refs: ['yolo11'] },
          { method: 'GMorph', macs: '11.31 G', params: '133.05 M', metric: '71.7%', refs: ['yang2024gmorph'] },
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
          { method: 'ViT', macs: '1693 G', params: '86 M', metric: '95.29%', refs: ['dosovitskiy2020image', 'cifar10Hugging'] },
          { method: 'LGViT', macs: '10.65 G', params: '101 M', metric: '92.5%', refs: ['xu2023lgvit'] },
          { method: 'AdaptFormer', macs: '1.71 G', params: '87.6 M', metric: '93.36%', refs: ['chen2022adaptformer'] },
          { method: 'EfficientViT', sub: '(finetuned)', macs: '2.1 G', params: '24 M', metric: '93.27%', refs: ['cai2023efficientvit', 'efficientvit_b2_huggingface'] },
          { method: 'STRIDE', macs: '1.25 G', params: '5.75 M', metric: '93.44%', highlight: true },
        ],
      },
    ],
  },
];
