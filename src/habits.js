import HeaderComponent from "./view/header-component.js";
import DetailsComponent from "./view/details-component.js";
import HabitsFormComponent from "./view/habit-form-component.js";
import HabitsFilterComponent from "./view/habits-filter-component.js";
import HabitsModel from './model/habits-model.js';
import HabitsPresenter from "./presenter/habits-presenter.js";
import { render, RenderPosition } from "./render.js";

const bodyContainer = document.querySelector('.container');
const habitsForm = bodyContainer.querySelector('.habit-form');
const habitsList = bodyContainer.querySelector('.habit-list');
const habitsFilter = bodyContainer.querySelector('.habit-filter');

render(new HabitsFilterComponent(), habitsFilter, RenderPosition.AFTERBEGIN);

const formAdd = new HabitsFormComponent({
  onClick: () => presenter.createHabit()
});
render(formAdd, habitsForm, RenderPosition.AFTERBEGIN);

render(new DetailsComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);



const habitsModel = new HabitsModel();
const presenter = new HabitsPresenter({
  habitsContainer: habitsList,
  habitsModel
});

presenter.init();