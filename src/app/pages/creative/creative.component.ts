import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creative',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.css']
})
export class CreativeComponent implements OnInit {
  selectedImage: string | null = null;

  designs = [
    {
      title: 'Flyer Commercial',
      description: 'Délices Festifs - Création publicitaire',
      image: '/creative/delices_festifs.jpg',
      category: 'Marketing'
    },
    {
      title: 'Affiche Soirée',
      description: 'Design événementiel',
      image: '/creative/soiree.jpg',
      category: 'Événement'
    },
    {
      title: 'Salon de Coiffure',
      description: 'Bannière promotionnelle',
      image: '/creative/coiffure.jpg',
      category: 'Social Media'
    }
  ];

  constructor(private meta: Meta, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Portfolio Créatif | Design & Infographie');
    this.meta.addTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeImage();
  }

  openImage(imagePath: string) {
    this.selectedImage = imagePath;
  }

  closeImage() {
    this.selectedImage = null;
  }

  canShowPreviousButton(): boolean {
    if (!this.selectedImage) return false;
    return this.designs.findIndex(d => d.image === this.selectedImage) > 0;
  }

  canShowNextButton(): boolean {
    if (!this.selectedImage) return false;
    return this.designs.findIndex(d => d.image === this.selectedImage) < this.designs.length - 1;
  }

  previousImage() {
    if (!this.selectedImage) return;
    const currentIndex = this.designs.findIndex(d => d.image === this.selectedImage);
    if (currentIndex > 0) {
      this.selectedImage = this.designs[currentIndex - 1].image;
    }
  }

  nextImage() {
    if (!this.selectedImage) return;
    const currentIndex = this.designs.findIndex(d => d.image === this.selectedImage);
    if (currentIndex < this.designs.length - 1) {
      this.selectedImage = this.designs[currentIndex + 1].image;
    }
  }
}
