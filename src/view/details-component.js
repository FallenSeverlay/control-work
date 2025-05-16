import { AbstractComponent } from "./abstract-component.js";


function createDetailsComponentTemplate() {
    return (
        `
        <details>
            <summary>Как использовать</summary>
            <p>Добавляйте привычки, следите за их выполнением и обновляйте статус. Вы можете добавлять описание к привычкам и отслеживать их по статусу.</p>
        </details>
        `
      );
}


export default class DetailsComponent extends AbstractComponent {
  get template() {
    return createDetailsComponentTemplate();
  }
}