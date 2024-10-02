export const themeToggle = document.querySelector('.header__themeToggle');
export const lightIcon = document.querySelector('.header__themeToggleLight');
export const darkIcon = document.querySelector('.header__themeToggleDark');
export const formElement = document.querySelector('.taskSearch__form');
export const inputElement = document.querySelector('.taskSearch__input');
export const taskListElement = document.querySelector('.taskList');
export const getDeleteIcons = () =>
  document.querySelectorAll('.taskList__xmark');
export const getCheckBoxes = () => document.querySelectorAll('.checkMarkList');
export const checkMark = document.querySelector('.taskSearch__checkMark');
export const activeTasks = document.querySelector('.activeList');
export const completedTasks = document.querySelector('.completedList');
export const allTasks = document.querySelector('.allList');
export const taskListItems = document.querySelectorAll('.taskList__listItem ');
export const clearCompleted = document.querySelector(
  '.taskList__clearCompleted '
);
export let tasksCount = document.querySelector('.taskList__items');
// export const taskItems = document.querySelectorAll('.taskList__item');
export const getTaskItems = () => document.querySelectorAll('.taskList__item');
console.log(getTaskItems);
