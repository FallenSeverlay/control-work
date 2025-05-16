import { AbstractComponent } from "./abstract-component.js";
        
        
function createHabitsListComponentTemplate() {
    return (
        `
        <div id="habit-list">
            <!-- Список привычек будет динамически отображаться здесь -->
        </div>
        `
        );
}


export default class HabitsListComponent extends AbstractComponent {
    get template() {
    return createHabitsListComponentTemplate();
    }
}