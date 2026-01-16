import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];
  isLongImage?: boolean;
  color: string;
  colorHover: string;
  tags: Array<{ label: string; color: string; textColor: string }>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio-angular';
  selectedImage: string | null = null;
  selectedImageIsLong: boolean = false;
  currentProjectId: string | null = null;
  
  // Track current gallery index for each project
  projectGalleryIndex: { [key: string]: number } = {
    'stagelink': 0,
    'gspde': 0,
    'stockease': 0
  };

  projects: Project[] = [
    {
      id: 'stagelink',
      name: 'StageLink',
      description:
        'Une application web de mise en relation entre étudiants, entreprise, tuteur et de partage de ressources en ligne',
      images: ['/StageLink.png', '/StageLink2.png', '/StageLink3.png'],
      color: 'blue',
      colorHover: 'blue',
      tags: [
        { label: 'Angular', color: 'blue-500/20', textColor: 'blue-300' },
        { label: 'Laravel', color: 'green-500/20', textColor: 'green-300' },
        { label: 'MySQL', color: 'purple-500/20', textColor: 'purple-300' },
      ],
    },
    {
      id: 'gspde',
      name: 'GSPDE',
      description:
        "Application web de suivie pédagogique et disciplinaire d'étudiants.",
      images: ['/GSPDE.png', '/GSPDE2.png', '/GSPDE3.png'],
      color: 'green',
      colorHover: 'green',
      tags: [
        { label: 'PHP', color: 'green-500/20', textColor: 'green-300' },
        { label: 'Bootstrap', color: 'blue-500/20', textColor: 'blue-300' },
        { label: 'MySQL', color: 'purple-500/20', textColor: 'purple-300' },
        { label: 'JavaScript', color: 'red-500/20', textColor: 'red-300' },
      ],
    },
    {
      id: 'stockease',
      name: 'StockEase',
      description: 'Application mobile de gestion de stock.',
      images: [
        '/StockEase.jpg',
        '/StockEase2.jpg',
        '/StockEase3.jpg',
        '/StockEase4.jpg',
      ],
      isLongImage: true,
      color: 'purple',
      colorHover: 'purple',
      tags: [
        { label: 'Flutter', color: 'purple-500/20', textColor: 'purple-300' },
        { label: 'Sqlite', color: 'blue-500/20', textColor: 'blue-300' },
      ],
    },
  ];

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeImage();
  }

  onProjectCardMouseEnter(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.transform = 'scale(1.05)';
    }
  }

  onProjectCardMouseLeave(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.transform = 'scale(1)';
    }
  }

  getCurrentImageIndex(): number {
    if (!this.selectedImage || !this.projects || this.projects.length === 0) {
      return 0;
    }
    // Find the project and image index
    for (const project of this.projects) {
      const index = project.images.indexOf(this.selectedImage);
      if (index !== -1) {
        return index;
      }
    }
    return 0;
  }

  getCurrentImageCount(): number {
    if (!this.selectedImage || !this.projects || this.projects.length === 0) {
      return 0;
    }
    // Find the project and return its image count
    for (const project of this.projects) {
      if (project.images.includes(this.selectedImage)) {
        return project.images.length;
      }
    }
    return 0;
  }

  canShowPreviousButton(): boolean {
    if (!this.currentProjectId || !this.selectedImage) return false;
    const project = this.projects.find((p) => p.id === this.currentProjectId);
    if (!project) return false;
    return project.images.indexOf(this.selectedImage) > 0;
  }

  canShowNextButton(): boolean {
    if (!this.currentProjectId || !this.selectedImage) return false;
    const project = this.projects.find((p) => p.id === this.currentProjectId);
    if (!project) return false;
    return (
      project.images.indexOf(this.selectedImage) < project.images.length - 1
    );
  }

  getCurrentProjectImages(): string[] {
    if (!this.currentProjectId) return [];
    const project = this.projects.find((p) => p.id === this.currentProjectId);
    return project?.images || [];
  }
  previousImageInGallery(projectId: string, images: string[]) {
    const currentIndex = this.projectGalleryIndex[projectId] || 0;
    if (currentIndex > 0) {
      this.projectGalleryIndex[projectId] = currentIndex - 1;
    }
  }

  nextImageInGallery(projectId: string, images: string[]) {
    const currentIndex = this.projectGalleryIndex[projectId] || 0;
    if (currentIndex < images.length - 1) {
      this.projectGalleryIndex[projectId] = currentIndex + 1;
    }
  }

  getGalleryImage(projectId: string, images: string[]): string {
    const index = this.projectGalleryIndex[projectId] || 0;
    return images[index] || images[0];
  }

  canGalleryNavigatePrevious(projectId: string): boolean {
    const index = this.projectGalleryIndex[projectId] || 0;
    return index > 0;
  }

  canGalleryNavigateNext(projectId: string, images: string[]): boolean {
    const index = this.projectGalleryIndex[projectId] || 0;
    return index < images.length - 1;
  }
  scrollToSection(sectionId: string) {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openImage(imagePath: string, isLongImage: boolean = false) {
    this.selectedImage = imagePath;
    this.selectedImageIsLong = isLongImage;
    // Find which project this image belongs to
    for (const project of this.projects) {
      if (project.images.includes(imagePath)) {
        this.currentProjectId = project.id;
        break;
      }
    }
  }

  closeImage() {
    this.selectedImage = null;
    this.selectedImageIsLong = false;
    this.currentProjectId = null;
  }

  nextImage() {
    if (!this.currentProjectId || !this.selectedImage) return;

    const project = this.projects.find((p) => p.id === this.currentProjectId);
    if (!project) return;

    const currentIndex = project.images.indexOf(this.selectedImage);
    if (currentIndex < project.images.length - 1) {
      this.openImage(project.images[currentIndex + 1], project.isLongImage);
    }
  }

  previousImage() {
    if (!this.currentProjectId || !this.selectedImage) return;

    const project = this.projects.find((p) => p.id === this.currentProjectId);
    if (!project) return;

    const currentIndex = project.images.indexOf(this.selectedImage);
    if (currentIndex > 0) {
      this.openImage(project.images[currentIndex - 1], project.isLongImage);
    }
  }
}
