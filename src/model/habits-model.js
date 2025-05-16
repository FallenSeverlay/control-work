import {habits} from '../mock/habits.js';

export default class HabitsModel {
    #habits = habits;
    #observers = [];

    get habits() {
        return this.#habits;
    }

    updateHabit(index, newData) {
        this.#habits[index] = {
            ...this.#habits[index],
            ...newData
        };
        this._notifyObservers();
    }

    removeHabit(index) {
        this.#habits.splice(index, 1);
        this._notifyObservers();
    }

    addHabit(title, status) {
        const newHabit = {
            title,
            status
        };

        this.#habits.push(newHabit);
        this._notifyObservers();
        return newHabit;
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver() {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}