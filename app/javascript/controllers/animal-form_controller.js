import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['name', 'display', 'age', 'ageValidationMessage'];
  static values = {counter: Number, ageValidation: Boolean};
  static classes = ['error'];

  countCharacters() {
    this.counterValue = this.nameTarget.value.length;
  }

  validateAge() {
    this.ageValidationValue = this.ageTarget.value < 1
  }

  counterValueChanged() {
    this.displayTarget.textContent = this.counterValue;
  }

  validateSubmit(event) {
    if (this.ageTarget < 1){
      this.ageValidationValue = true;
      this.ageValidationMessageTarget.textContent = 'Invalid age';
      this.ageValidationMessageTarget.classList.add(this.errorClass);
    }      
    if(this.ageValidationValue || this.ageTarget.value < 1 || this.nameTarget.value === '')
      event.preventDefault();
  }

  ageValidationValueChanged() {
    if (this.ageValidationValue === true || this.ageTarget < 1) {
      this.ageValidationMessageTarget.textContent = 'Invalid age';
      this.ageValidationMessageTarget.classList.add(this.errorClass);
    }      
    else {
      this.ageValidationMessageTarget.textContent = '';
      this.ageValidationMessageTarget.classList.remove(this.errorClass);
    }      
  }
}