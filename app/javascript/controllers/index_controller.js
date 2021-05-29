import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['animalsJson'];
  
  async fetchAnimals()
  {
    const spinner = document.querySelector('.spinner-border');
    spinner.classList.remove('d-none');
    this.animalsJsonTarget.innerHTML = "<div class='font-weight-bold'>Name&nbsp;Age&nbsp;Actions<br/>";
    setTimeout(() => {
      return fetch('http://localhost:3000/animals.json')
      .then(result => result.json())
      .then(animals => { 
        animals.forEach(animal => {
          this.animalsJsonTarget.innerHTML += `${animal.name}`;
          this.animalsJsonTarget.innerHTML += `&nbsp;${animal.age}`;
          this.animalsJsonTarget.innerHTML += `&nbsp;
          <a href = 'animals/${animal.id}'>Show</a>
          <a href = 'animals/${animal.id}/edit'>Edit</a>
          <a 
            data-confirm="Are you sure?"
            rel="nofollow"
            data-method="delete"
            href="/animals/${animal.id}">
              Destroy
          </a>`;
          this.animalsJsonTarget.innerHTML += '<br />';
        });
        spinner.classList.add('d-none');
      });
    }, 1000);
  }
}