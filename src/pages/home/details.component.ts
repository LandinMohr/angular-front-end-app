import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { APIResponse } from '../../models/api.object';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './details.component.html',
  imports: [CommonModule]
})
export class DetailComponent implements OnInit {

  object?: APIResponse;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.loadObject(id);
      }
    });
  }

  loadObject(id: string): void {
  console.log("Loading object id:", id);

  this.loading = true;

  this.apiService.getObjectById(id).subscribe({
    next: (data) => {
      console.log("API response:", data);

      this.object = data;
      this.loading = false;
    },
    error: (err) => {
      console.log("API error:", err);

      this.error = 'Failed to load object.';
      this.loading = false;
    }
  });
}}