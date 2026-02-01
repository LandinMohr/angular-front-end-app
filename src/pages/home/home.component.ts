import { Component, Input } from '@angular/core';
import { InputFormComponent } from "../../component/inputform/input-form";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.template.html',
  styleUrls: ['./home.styles.css'],
  imports: [InputFormComponent],
})
export class HomeComponent {}
