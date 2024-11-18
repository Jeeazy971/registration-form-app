import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  registeredUsers: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFromLocalStorage();
  }

  private initForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, this.nameValidator]],
      lastName: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required, this.ageValidator(18)]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const validNameRegex = /^[a-zA-ZÀ-ÿ-]+$/;
    if (!control.value || validNameRegex.test(control.value)) {
      return null;
    }
    return { nameInvalid: true };
  }

  private ageValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return { ageInvalid: true };

      const today = new Date();
      const birthDate = new Date(control.value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const isOldEnough =
        age > minAge ||
        (age === minAge &&
          today >= new Date(birthDate.setFullYear(today.getFullYear())));
      return isOldEnough ? null : { ageInvalid: true };
    };
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;
      this.saveToLocalStorage(user);
      this.registeredUsers.push(user);
      this.showSuccess('Utilisateur enregistré avec succès !');
      this.registrationForm.reset();
    } else {
      this.showError('Veuillez corriger les erreurs du formulaire.');
    }
  }

  saveToLocalStorage(user: any): void {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  loadFromLocalStorage(): void {
    this.registeredUsers = JSON.parse(localStorage.getItem('users') ?? '[]');
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
