import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

interface NewsItem {
  date: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, CommonModule, BsDatepickerModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  selectedDate: Date | null = null;

  newsList: NewsItem[] = [
    {
      date: '01/01/2025', // MM/DD/YYYY
      title: 'New Year Celebration!',
      description: 'Celebrate the new year with exciting music events around the world.',
    },
    {
      date: '02/10/2025',
      title: 'New Song Released!',
      description: 'A popular artist has just released a chart-topping single.',
    },
    {
      date: '02/09/2025',
      title: 'Music Festival Announced',
      description: 'The lineup for the biggest music festival of the year is here!',
    },
  ];

  filteredNews: NewsItem[] = [];

  onDateChange(event: any): void {
    if (event instanceof Date) {
      const formattedDate = this.formatDate(event);
      console.log('Selected Date:', formattedDate); // Provera formata datuma
      this.selectedDate = event;
      this.filteredNews = this.newsList.filter((news) => news.date === formattedDate);
    } else {
      this.filteredNews = [];
    }
  }

  private formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Dodaj vodeću nulu za mjesec
    const day = date.getDate().toString().padStart(2, '0'); // Dodaj vodeću nulu za dan
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
