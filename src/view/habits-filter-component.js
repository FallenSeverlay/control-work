import { AbstractComponent } from "./abstract-component.js";


function createhabitsFilterComponentTemplate() {
    return (
        `
        <div class="habit-filter">
            <h2>Фильтры</h2>
            <label for="status-filter">Фильтр по статусу:</label>
            <select id="status-filter">
                <option value="all">Все</option>
                <option value="active">Активные</option>
                <option value="completed">Завершенные</option>
            </select>
        </div>
        `
      );
}


export default class HabitsFilterComponent extends AbstractComponent {
  get template() {
    return createhabitsFilterComponentTemplate();
  }
}