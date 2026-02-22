import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { APIResponse } from '../../models/api.object';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: 'list.component.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})


export class ListComponent implements OnInit {

  objects: APIResponse[] = [];
  filteredObjects: APIResponse[] = [];
  query: string = '';
  loading: boolean = false;
  error: string = '';

  searchTerm: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadObjects();
  }

  loadObjects(): void {
    this.loading = true;
    this.apiService.getObjects().subscribe({
      next: (data) => {
        this.objects = data;
        this.filteredObjects = data;
        this.totalPages = Math.ceil(this.objects.length / this.itemsPerPage);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load objects.';
        this.loading = false;
      }
    });
  }




  applyFilters(): void {
    let temp = [...this.objects];

    // Filter
    temp = temp.filter(obj =>
      obj.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Sort
    temp.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    this.filteredObjects = temp;
    this.totalPages = Math.ceil(temp.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get paginatedObjects(): APIResponse[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredObjects.slice(start, start + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  confirmDelete(id: string): void {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      this.apiService.deleteObject(id).subscribe({
        next: () => {
          this.objects = this.objects.filter(obj => obj.id !== id);
          this.applyFilters();
        },
        error: () => {
          alert('Delete failed.');
        }
      });
    }
    }
}