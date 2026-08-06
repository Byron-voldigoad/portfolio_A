import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

interface AmvVideo {
  title: string;
  description: string;
  url: SafeResourceUrl;
}

@Component({
  selector: 'app-montage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './montage.component.html',
  styleUrls: ['./montage.component.css']
})
export class MontageComponent implements OnInit {
  channelLogoUrl = 'https://yt3.googleusercontent.com/H7T_OX76vVg3ZAWH82MVEAC2dGWQpNWdosENQwhyB4gI5oV8lKITivbHN0HH1zzIRBR4aPSr8w=s160-c-k-c0x00ffffff-no-rj';
  videos: AmvVideo[] = [];
  shorts: AmvVideo[] = [];

  constructor(
    private meta: Meta, 
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Video Studio | Montage & AMV');
    this.meta.addTag({ name: 'robots', content: 'noindex, nofollow' });

    this.videos = [
      {
        title: 'AMV Edit V1',
        description: 'Montage dynamique et synchronisation musicale.',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/VXCb7Zj4U2c')
      },
      {
        title: 'AMV Edit V2',
        description: 'Travail sur le rythme et les transitions.',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Yxd9HaA1OY0')
      },
      {
        title: 'AMV Edit V3',
        description: 'Focus sur l\'impact visuel et le sound design.',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/qXc9dtkMcOw')
      }
    ];

    this.shorts = [
      {
        title: 'Short Edit 1',
        description: 'Format vertical court et percutant.',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/CVi1oxhsgvE')
      },
      {
        title: 'Short Edit 2',
        description: 'Montage dynamique adapté pour mobile.',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/9QFpVAEixcU')
      },
      {
        title: 'Short Edit 3',
        description: 'Transitions rapides et effet visuels.',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/r1mHqiA16Bw')
      }
    ];
  }
}
