import {Directive, Input} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';

@Directive({
  selector: '[appValidateAfterLength]',
  // selector: '[appNoSpaces]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoSpacesDirective, multi: true}]
})
export class NoSpacesDirective implements Validator {
  // @Input('appNoSpaces') num: number;
  @Input('appValidateAfterLength') num: number;

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.num ? noSpaces2(this.num)(control) : null;
  }
}

@Directive({
  selector: '[appValidateDuplicateTags]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoDuplicateTagsDirective, multi: true}]
})
export class NoDuplicateTagsDirective implements Validator {
  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return noDuplicateTags(control as FormGroup);
  }
}

export function noSpaces1(c: FormControl): ValidationErrors | null {
  const spacesRegex = `^\\s{${3},}$`;
  const regex = new RegExp(spacesRegex);
  const isJustSpaces = regex.test(c.value);
  if (isJustSpaces) {
    return {spaces: true};
  }
  return null;
}

export function noSpaces2(num: number): ValidatorFn {
  return (c: FormControl): ValidationErrors | null => {
    const spacesRegex = `^\\s{${num},}$`;
    const regex = new RegExp(spacesRegex);
    const isJustSpaces = regex.test(c.value);
    if (isJustSpaces) {
      return {spaces: true};
    }
    return null;
  };
}

export function noDuplicateTags(fg: FormGroup): ValidationErrors | null {
  const tagControls = fg.get('tags') as FormArray;
  if (tagControls) {
    const tags = tagControls.value;
    return tags.some(s => tags.indexOf(s) !== tags.lastIndexOf(s)) ? {duplicateTags: true} : null;
  }
}
