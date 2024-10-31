import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule,
    MatIconModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  registeredUsers: any[] = [];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.registrationForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ -]+$/)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ -]+$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required, this.validateAge.bind(this)]],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  validateAge(control: AbstractControl): ValidationErrors | null {
    const calculateAge = (birthDate: Date): number => {
      const ageDiff = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const birthDate = new Date(control.value);
    const age = calculateAge(birthDate);
    return age >= 18 ? null : { ageInvalid: true };
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.registeredUsers.push(this.registrationForm.value);
      localStorage.setItem(
        'userData',
        JSON.stringify(this.registrationForm.value)
      );
      this.snackBar.open('Enregistrement réussi !', 'Fermer', {
        duration: 3000,
      });
      this.registrationForm.reset();
    } else {
      this.snackBar.open(
        'Erreur dans le formulaire, veuillez vérifier les champs.',
        'Fermer',
        { duration: 3000 }
      );
    }
  }
}
