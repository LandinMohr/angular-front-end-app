import {Component} from '@angular/core';
import {FormGroup, FormControl, FormArray, ReactiveFormsModule, Validators} from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


function minTwoChars(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return control.value.length < 2 ? { minTwo: true } : null;
}

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class InputFormComponent {

  form = new FormGroup({
  firstName: new FormControl('', [Validators.required, minTwoChars]),
  lastName: new FormControl('', Validators.required, forbiddenLastName),
  email: new FormControl('', [Validators.required, Validators.email]),
  nicknames: new FormArray([])
});

get nicknames(): FormArray {
  return this.form.get('nicknames') as FormArray;
}

addNickname() {
  this.nicknames.push(new FormControl(''));
}

removeNickname(index: number) {
  this.nicknames.removeAt(index);
}


onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
  }
}

function forbiddenLastName(control: AbstractControl): Observable<ValidationErrors | null> {
  return of(control.value).pipe(
    delay(1000),
    map(value => value === 'Admin' ? { forbidden: true } : null)
  );
}

