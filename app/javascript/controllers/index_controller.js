import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['animalsJson'];
  
  #createTd(content) {
    let td = document.createElement('td');
    td.innerHTML = content;
    return td;   
  }

  #createTable(titles) {
    let table = document.createElement('table');
    let tHead = document.createElement('tHead');
    let tr = document.createElement('tr');

    titles.forEach(title => {
      var name = document.createElement('th');
      name.innerHTML = title;
      tr.appendChild(name);
    });
    tHead.appendChild(tr);
    table.appendChild(tHead);
    return table;
  }

  async fetchAnimals()
  {
    const spinner = document.querySelector('.spinner-border');
    spinner.classList.remove('d-none');
    const table = this.#createTable(['Name', 'Age', 'Actions']);
    const tBody = document.createElement('tbody');
    setTimeout(() => {
      return fetch('http://localhost:3000/animals.json')
      .then(result => result.json())
      .then(animals => {
        animals.forEach(animal => {
          var row = document.createElement("tr");
          row.appendChild(this.#createTd(animal.name));
          row.appendChild(this.#createTd(animal.age));
          row.appendChild(this.#createTd(`&nbsp;
          <a href = 'animals/${animal.id}'>Show</a>
          <a href = 'animals/${animal.id}/edit'>Edit</a>
          <a 
            data-confirm="Are you sure?"
            rel="nofollow"
            data-method="delete"
            href="/animals/${animal.id}">
              Destroy
          </a>`));
          tBody.appendChild(row);
        });
        table.appendChild(tBody);
        this.animalsJsonTarget.innerHTML = '';
        this.animalsJsonTarget.appendChild(table);
        spinner.classList.add('d-none');
      });
    }, 1000);
  }
}