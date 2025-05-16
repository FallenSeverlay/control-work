import { AbstractComponent } from "./abstract-component.js";

function createHabitItemComponentTemplate(habit) {
    const { title, status } = habit;
    return `
      <div class="habit-item">
        <div class="title">${title}</div>
        <div class="status">${status}</div>
        <button class="edit-button">Редактировать</button>
        <button class="delete-button">Удалить</button>
      </div>
    `;
}

export default class HabitItemComponent extends AbstractComponent {
    #habit;
    #onDelete;
    #onEdit;

    constructor({ habit, onDelete, onEdit }) {
        super();
        this.#habit = habit;
        this.#onDelete = onDelete;
        this.#onEdit = onEdit;
        this.element.addEventListener("click", this.#clickHandler);
    }

    get template() {
        return createHabitItemComponentTemplate(this.#habit);
    }

    #clickHandler = (evt) => {
        if (evt.target.classList.contains("delete-button")) {
            this.#onDelete();
        }
        if (evt.target.classList.contains("edit-button")) {
            this.#onEdit();
        }
    };
}