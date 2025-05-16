import HabitsListComponent from "../view/habits-list-component.js";
import { render, RenderPosition } from "../render.js";
import HabitItemComponent from "../view/habit-item-component.js";
import EditHabitItemComponent from '../view/edit-habit-item-component.js';

export default class HabitsPresenter {
    #habitsContainer;
    #habitsListComponent = new HabitsListComponent();
    #habitsModel;
    editingIndex = null;
    #currentFilter = 'all';

    constructor({ habitsContainer, habitsModel }) {
        this.#habitsContainer = habitsContainer;
        this.#habitsModel = habitsModel;
        this.#habitsModel.addObserver(this.#handleModelChange.bind(this));
        const filterEl = document.querySelector('#status-filter');
        filterEl.addEventListener('change', (evt) => {
            this.#currentFilter = evt.target.value;
            this.editingIndex = null;
            this.#clearHabits();
            this.#renderHabits();
        });
    }

    init() {
        this.habits = [...this.#habitsModel.habits];
        this.#renderHabits();
    }

    createHabit() {
        const habitTitle = document.querySelector('#habit-name').value.trim();
        const habitStatus = document.querySelector('#habit-status').value.trim();
        if (!habitTitle || !habitStatus) {
            return;
        }

        this.#habitsModel.addHabit(habitTitle, habitStatus);

        document.querySelector('#habit-name').value = '';
        document.querySelector('#habit-description').value = '';
        document.querySelector('#habit-status').value = 'active';
    }

    #handleModelChange() {
        this.habits = [...this.#habitsModel.habits];
        this.editingIndex = null;
        this.#clearHabits();
        this.#renderHabits();
    }

    #clearHabits() {
        const element = this.#habitsListComponent.element;
        element.innerHTML = '';
    }

    #renderHabits() {
        render(this.#habitsListComponent, this.#habitsContainer, RenderPosition.BEFOREEND);
        const container = this.#habitsListComponent.element;

        const habitsToShow = this.habits.filter(habit =>
            this.#currentFilter === 'all' || habit.status === this.#currentFilter
        );

        habitsToShow.forEach((habit, idx) => {
        if (idx === this.editingIndex) {
            this.#renderEditForm(habit, idx, container);
        } else {
            this.#renderHabit(habit, idx, container);
        }
        });
    }

    #renderEditForm(habit, index, container) {
        const editComp = new EditHabitItemComponent({
            habit,
            onSave: (updatedData) => {
                this.#habitsModel.updateHabit(index, updatedData);
            },
            onCancel: () => {
                this.editingIndex = null;
                this.#clearHabits();
                this.#renderHabits();
            }
        });
        render(editComp, container, RenderPosition.BEFOREEND);
    }

    #renderHabit(habit, index, container) {
        const itemComponent = new HabitItemComponent({
        habit,
        onDelete: () => this.#habitsModel.removeHabit(index),
        onEdit: () => {
            this.editingIndex = index;
            this.#clearHabits();
            this.#renderHabits();
        },
        onStatusChange: (updatedData) => {
            this.#habitsModel.updateHabit(index, updatedData);
        }
        });
        render(itemComponent, container, RenderPosition.BEFOREEND);
    }
}