import { AbstractComponent } from "./abstract-component.js";

function createEditHabitTemplate(habit) {
    const { title, status } = habit;
    return `
      <form class="edit-habit-form">
        <input type="text" name="title" value="${title}" required />
        <select name="status">
          <option value="active" ${status === "active" ? "selected" : ""}>Active</option>
          <option value="completed" ${status === "completed" ? "selected" : ""}>Completed</option>
        </select>
        <button type="submit" class="save-button">Сохранить</button>
        <button type="button" class="cancel-button">Отмена</button>
      </form>
    `;
}

export default class EditHabitItemComponent extends AbstractComponent {
    #habit;
    #onSave;
    #onCancel;

    constructor({ habit, onSave, onCancel }) {
        super();
        this.#habit = habit;
        this.#onSave = onSave;
        this.#onCancel = onCancel;

        this.element.addEventListener("submit", this.#onFormSubmit);
        this.element.addEventListener("click", this.#onClick);
    }

    get template() {
        return createEditHabitTemplate(this.#habit);
    }

    #onFormSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.target;
        const updatedData = {
            title: form.title.value.trim(),
            status: form.status.value
        };
        this.#onSave(updatedData);
    };

    #onClick = (evt) => {
        if (evt.target.classList.contains("cancel-button")) {
            this.#onCancel();
        }
    };
}