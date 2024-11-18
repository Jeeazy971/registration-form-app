import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RegistrationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;

    jest.spyOn(window.localStorage['__proto__'], 'setItem');
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate firstName and lastName correctly', () => {
    const firstNameControl = component.registrationForm.get('firstName');
    const lastNameControl = component.registrationForm.get('lastName');

    if (firstNameControl && lastNameControl) {
      firstNameControl.setValue('John');
      lastNameControl.setValue('Doe');
      expect(firstNameControl.valid).toBeTruthy();
      expect(lastNameControl.valid).toBeTruthy();

      firstNameControl.setValue('John123');
      expect(firstNameControl.hasError('nameInvalid')).toBeTruthy();
      expect(firstNameControl.valid).toBeFalsy();
    }
  });

  it('should validate age correctly, including edge cases', () => {
    const birthDateControl = component.registrationForm.get('birthDate');

    if (birthDateControl) {
      birthDateControl.setValue('2010-01-01');
      expect(birthDateControl.hasError('ageInvalid')).toBeTruthy();

      birthDateControl.setValue('1990-01-01');
      expect(birthDateControl.hasError('ageInvalid')).toBeFalsy();

      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.setFullYear(today.getFullYear() - 18)
      )
        .toISOString()
        .split('T')[0];
      birthDateControl.setValue(eighteenYearsAgo);
      expect(birthDateControl.hasError('ageInvalid')).toBeFalsy();
    }
  });

  it('should handle postalCode validation correctly', () => {
    const postalCodeControl = component.registrationForm.get('postalCode');

    if (postalCodeControl) {
      postalCodeControl.setValue('75001');
      expect(postalCodeControl.valid).toBeTruthy();

      postalCodeControl.setValue('ABCDE');
      expect(postalCodeControl.valid).toBeFalsy();
    }
  });

  it('should save user to localStorage and reset the form on valid submission', () => {
    const spySetItem = jest.spyOn(localStorage, 'setItem');
    const spyShowSuccess = jest.spyOn(component, 'showSuccess');

    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      birthDate: '1990-01-01',
      city: 'Paris',
      postalCode: '75001',
    };

    component.registrationForm.patchValue(userData);
    component.onSubmit();

    expect(spySetItem).toHaveBeenCalledWith(
      'users',
      JSON.stringify([userData])
    );
    expect(spyShowSuccess).toHaveBeenCalledWith(
      'Utilisateur enregistré avec succès !'
    );

    expect(component.registrationForm.value).toEqual({
      firstName: null,
      lastName: null,
      email: null,
      birthDate: null,
      city: null,
      postalCode: null,
    });
  });

  it('should show error if form is invalid on submission', () => {
    const spyShowError = jest.spyOn(component, 'showError');

    component.registrationForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      city: '',
      postalCode: '',
    });

    component.onSubmit();

    expect(spyShowError).toHaveBeenCalledWith(
      'Veuillez corriger les erreurs du formulaire.'
    );
  });
});
