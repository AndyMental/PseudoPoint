import { Directive } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function spaceValidator(regEx: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden: boolean = regEx.test(control.value);
    return !forbidden ? { forbiddenSpaceInput: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appSpaceValidator]',
})
export class SpaceValidatorDirective{

  constructor() {}

 }
