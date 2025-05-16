import { AbstractComponent } from "./abstract-component.js";


function createHeaderComponentTemplate() {
    return (
        `<h1>Ежедневный Трекер Привычек</h1>`
      );
}


export default class DetailsComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}
