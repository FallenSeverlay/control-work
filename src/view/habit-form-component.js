import { AbstractComponent } from "./abstract-component.js";


function createHabitsFormComponentTemplate() {
    return (
        `
        <div class="habit-form">
            <h2>Добавить Привычку</h2>
            <form id="habit-form">
                <label for="habit-name">Название привычки:</label>
                <input type="text" id="habit-name" placeholder="Например, Утренняя зарядка" required />
                
                <label for="habit-description">Описание:</label>
                <textarea id="habit-description" placeholder="Описание привычки" rows="3"></textarea>

                <label for="habit-status">Статус привычки:</label>
                <select id="habit-status" required>
                    <option value="active">Активна</option>
                    <option value="completed">Завершена</option>
                </select>

                <button type="submit">Добавить Привычку</button>
            </form>
        </div>
        `
      );
}


export default class HabitsFormComponent extends AbstractComponent {
  #handleClick = null;
  
  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener("submit", this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }

  get template() {
    return createHabitsFormComponentTemplate();
  }
}