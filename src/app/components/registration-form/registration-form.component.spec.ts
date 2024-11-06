import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationFormComponent } from './registration-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatBadgeModule,
        MatDividerModule,
        MatIconModule,
        RegistrationFormComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('doit invalider le formulaire si les champs sont vides', () => {
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('devrait valider le champ email', () => {
    const email = component.registrationForm.controls['email'];
    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('devrait invalider un utilisateur de moins de 18 ans', () => {
    const birthDate = component.registrationForm.controls['birthDate'];
    birthDate.setValue(new Date());
    expect(birthDate.errors?.['ageInvalid']).toBeTruthy();
  });
});
