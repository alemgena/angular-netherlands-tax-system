import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class InputValidationService {
  private isFormValidSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isFormValid$: Observable<boolean> = this.isFormValidSubject.asObservable();

  updateFormValidity(isValid: boolean) {
    this.isFormValidSubject.next(isValid);
  }
}
