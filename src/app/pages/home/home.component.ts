import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];
  isLongImage?: boolean;
  color: string;
  colorHover: string;
  demoUrl?: string;
  downloadUrl?: string;
  codeUrl?: string;
  tags: Array<{ label: string; color: string; textColor: string }>;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedImage: string | null = null;
  selectedImageIsLong: boolean = false;
  currentProjectId: string | null = null;

  // Track current gallery index for each project
  projectGalleryIndex: { [key: string]: number } = {
    kodeji: 0,
    nerra: 0,
    stagelink: 0,
    gspde: 0,
    stockease: 0,
  };

  projects: Project[] = [
    {
      id: 'kodeji',
      name: 'Kodeji',
      description:
        "App mobile d'apprentissage basée sur les sciences cognitives — Active Recall, Spaced Repetition, Feynman Technique, Interleaving, Project-Based Learning.",
      images: ['/kodeji2.jpg', '/kodeji3.jpg'],
      isLongImage: true,
      color: 'orange',
      colorHover: 'orange',
      downloadUrl: '#', // TODO: Remplacer par le lien réel de l'APK
      codeUrl: 'https://github.com/Byron-voldigoad/Kodeji',
      tags: [
        { label: 'Flutter', color: 'bg-sky-500/20', textColor: 'text-sky-400' },
        { label: 'Node.js', color: 'bg-green-500/20', textColor: 'text-green-400' },
        { label: 'Supabase', color: 'bg-emerald-500/20', textColor: 'text-emerald-400' },
        { label: 'Groq', color: 'bg-orange-500/20', textColor: 'text-orange-400' },
      ],
    },
    {
      id: 'nerra',
      name: 'Nerra',
      description: 'Système de Pilotage Stratégique YouTube.',
      images: ['/Nerra.png', '/Nerra2.png', '/Nerra3.png'],
      isLongImage: true,
      color: 'rose',
      colorHover: 'rose',
      demoUrl: 'https://getnerra.vercel.app/',
      codeUrl: 'https://github.com/Byron-voldigoad/STRATLY-YouTube-Growth-SaaS-',
      tags: [
        { label: 'Angular', color: 'bg-rose-500/20', textColor: 'text-rose-400' },
        { label: 'Tailwind CSS', color: 'bg-teal-500/20', textColor: 'text-teal-400' },
        { label: 'Spartan UI', color: 'bg-emerald-500/20', textColor: 'text-emerald-400' },
        { label: 'Node.js', color: 'bg-green-500/20', textColor: 'text-green-400' },
        { label: 'Express', color: 'bg-slate-500/20', textColor: 'text-slate-400' },
        { label: 'Genkit', color: 'bg-fuchsia-500/20', textColor: 'text-fuchsia-400' },
        { label: 'Supabase', color: 'bg-emerald-500/20', textColor: 'text-emerald-400' },
      ],
    },
    {
      id: 'stagelink',
      name: 'StageLink',
      description:
        'Application web de mise en relation entre étudiants, entreprise, tuteur et de partage de ressources en ligne.',
      images: ['/StageLink.png', '/StageLink2.png', '/StageLink3.png'],
      color: 'blue',
      colorHover: 'blue',
      codeUrl: 'https://github.com/Byron-voldigoad/StageLink237',
      tags: [
        { label: 'Angular', color: 'bg-rose-500/20', textColor: 'text-rose-400' },
        { label: 'Laravel', color: 'bg-orange-500/20', textColor: 'text-orange-400' },
        { label: 'MySQL', color: 'bg-cyan-500/20', textColor: 'text-cyan-400' },
      ],
    },
    {
      id: 'gspde',
      name: 'GSPDE',
      description:
        "Application web de suivi pédagogique et disciplinaire d'étudiants.",
      images: ['/GSPDE.png', '/GSPDE2.png', '/GSPDE3.png'],
      color: 'emerald',
      colorHover: 'emerald',
      tags: [
        { label: 'PHP', color: 'bg-indigo-500/20', textColor: 'text-indigo-400' },
        { label: 'Bootstrap', color: 'bg-violet-500/20', textColor: 'text-violet-400' },
        { label: 'MySQL', color: 'bg-cyan-500/20', textColor: 'text-cyan-400' },
        { label: 'JavaScript', color: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
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
      color: 'violet',
      colorHover: 'violet',
      downloadUrl: '#', // TODO: Remplacer par le lien réel de l'APK
      codeUrl: 'https://github.com/Byron-voldigoad/Stockflow',
      tags: [
        { label: 'Flutter', color: 'bg-sky-500/20', textColor: 'text-sky-400' },
        { label: 'Sqlite', color: 'bg-blue-500/20', textColor: 'text-blue-400' },
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
