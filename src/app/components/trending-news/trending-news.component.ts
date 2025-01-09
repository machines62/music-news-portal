import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NewsItem {
  title: string;
  description: string;
  image: string;
  url: string;
  date: string; // Format: 'MMM DD, YYYY'
}

@Component({
  selector: 'app-trending-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-news.component.html',
  styleUrls: ['./trending-news.component.css'],
})
export class TrendingNewsComponent {
  newsList: NewsItem[] = [
    {
      title: 'New Album by Artist A',
      description: 'Artist A just released their latest album featuring amazing tracks.',
      image: 'https://via.placeholder.com/300x200.png?text=Album+Cover+A',
      url: 'https://example.com/news/artist-a',
      date: 'Jan 1, 2025',
    },
    {
      title: 'Live Concert by Artist B',
      description: 'Artist B will perform live at the city square.',
      image: 'https://via.placeholder.com/300x200.png?text=Concert+Artist+B',
      url: 'https://example.com/news/artist-b',
      date: 'Feb 10, 2025',
    },
    {
      title: 'Collaboration Between Artist C and D',
      description: 'Artists C and D have announced a new collaboration.',
      image: 'https://via.placeholder.com/300x200.png?text=Collaboration+CD',
      url: 'https://example.com/news/artist-cd',
      date: 'Mar 15, 2025',
    },
    {
      title: 'Music Festival Announced',
      description: 'The biggest music festival of the year has been announced.',
      image: 'https://via.placeholder.com/300x200.png?text=Music+Festival',
      url: 'https://example.com/news/music-festival',
      date: 'Apr 5, 2025',
    },
    // ... Ostatak liste ostaje nepromijenjen ...
  ];

  // Kontrola dugmeta za skrolovanje na vrh
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Pojavi se dugme kada skroluješ više od 300px
    this.showScrollButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    // Smooth scroll do vrha stranice
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Funkcija za sortiranje novosti po datumu (opcionalno)
  get sortedNewsList(): NewsItem[] {
    return this.newsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}