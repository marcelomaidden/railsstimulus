import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['name', 'display', 'age', 'ageValidationMessage'];
  static values = {counter: Number, ageValidation: Boolean};

  countCharacters() {
    this.counterValue = this.nameTarget.value.length;
  }

  validateAge() {
    console.log(this.ageTarget.value)
    this.ageValidationValue = this.ageTarget.value < 1
  }

  counterValueChanged() {
    this.displayTarget.textContent = this.counterValue;
  }

  ageValidationValueChanged() {
    console.log(this.ageValidationValue)
    this.ageValidationValue === true ? this.ageValidationMessageTarget.textContent = 'Invalid age': 
    this.ageValidationMessageTarget.textContent = ''
  }
}