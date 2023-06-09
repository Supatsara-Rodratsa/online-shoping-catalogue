import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CheckoutService } from '../service/checkout.service';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css'],
})
export class ProductCheckoutComponent {
  addressForm!: FormGroup;
  checkoutForm!: FormGroup;

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
  ) {
    this.initialCheckoutForm();
  }

  initialCheckoutForm() {
    this.addressForm = this.formBuilder.group({
      address: ['', { validators: [Validators.required] }],
      zipCode: [
        '',
        { validators: [Validators.required, Validators.pattern(/^\d{5}$/)] },
      ],
      state: ['', { validators: [this.stateValidator()] }],
      country: ['', { validators: [Validators.required] }],
    });

    this.checkoutForm = this.formBuilder.group({
      firstName: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      email: [
        '',
        {
          validators: Validators.compose([
            Validators.required,
            Validators.email,
          ]),
        },
      ],
      address: this.addressForm,
      terms: ['', { validators: [Validators.requiredTrue] }],
    });
  }

  /**
   * Trigger State Validation when Country control is updated
   */
  validateStateControl() {
    const countryControl = this.addressForm?.controls['country'];
    if (countryControl?.value) {
      const stateControl = this.addressForm?.controls['state'];
      if (stateControl) {
        stateControl.markAsTouched();
        stateControl.updateValueAndValidity();
      }
    }
  }

  submitForm() {
    if (this.isFormValid())
      this.checkoutService.submitOrderPurchase({
        ...this.checkoutForm.value,
      });
  }

  isFormValid(): boolean {
    return this.checkoutForm?.valid || false;
  }

  isCheckoutFormControlInvalid(controlName: string): string {
    const control = this.checkoutForm.get(controlName);
    return control && control.invalid && control.touched
      ? 'error'
      : 'hideError';
  }

  isAddressFormControlInvalid(controlName: string): string {
    const control = this.addressForm.get(controlName);
    return control && control.invalid && control.touched
      ? 'error'
      : 'hideError';
  }

  /**
   * State Validation is based on Country From Control
   */
  stateValidator(): ValidatorFn {
    return (
      stateControl: AbstractControl,
    ): { [key: string]: boolean } | null => {
      if (this.addressForm) {
        const countryControl = this.addressForm.controls['country'];

        if (
          countryControl &&
          countryControl.value === 'United States' &&
          !stateControl.value
        ) {
          return { required: true };
        }
      }
      return null;
    };
  }

  selectedClass(): string {
    if (this.addressForm) {
      const countryControl = this.addressForm.controls['country'];
      return !countryControl.value ? 'is-invalid-selection' : '';
    }
    return '';
  }
}
