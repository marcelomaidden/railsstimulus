import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['animalsJson'];
  
  async fetchAnimals()
  {
    const spinner = document.querySelector('.spinner-border');
    spinner.classList.remove('d-none');
    this.animalsJsonTarget.innerHTML = '';
    setTimeout(() => {
      return fetch('http://localhost:3000/animals.json')
      .then(result => result.json())
      .then(animals => { 
        animals.forEach(animal => {
          this.animalsJsonTarget.innerHTML += `${animal.name}<br/>`
        })
        spinner.classList.add('d-none');
      });
    }, 2000);
  }
}