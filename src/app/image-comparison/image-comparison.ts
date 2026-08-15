import { Component, computed, signal } from '@angular/core';
import { DEMO_IMAGES, LEVELS, Level } from '../data/demo-images';

@Component({
  selector: 'app-image-comparison',
  templateUrl: './image-comparison.html',
  standalone: false,
  styleUrl: './image-comparison.scss',
})
export class ImageComparison {
  readonly images = DEMO_IMAGES;
  readonly levels = LEVELS;

  readonly selectedImageId = signal(this.images[0].id);
  readonly selectedLevel = signal<Level>('high');

  readonly selectedImage = computed(
    () => this.images.find((img) => img.id === this.selectedImageId())!,
  );

  readonly currentLevelData = computed(
    () => this.selectedImage().levels[this.selectedLevel()],
  );

  selectImage(id: string): void {
    this.selectedImageId.set(id);
  }

  selectLevel(level: Level): void {
    this.selectedLevel.set(level);
  }

  isCorrect(): boolean {
    return this.currentLevelData().result.label === this.selectedImage().groundTruth;
  }
}
