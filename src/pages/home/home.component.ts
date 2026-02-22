import { Component, OnInit } from '@angular/core';
import { InputFormComponent } from "../../component/inputform/input-form";
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.template.html',
  styleUrls: ['./home.styles.css'],
  imports: [
    CommonModule,
    RouterModule,
    InputFormComponent
  ]
})
export class HomeComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    // Home page does not need data loading
  }
}