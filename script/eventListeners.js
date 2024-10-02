import {
  getDeleteIcons,
  formElement,
  themeToggle,
  lightIcon,
  darkIcon,
  inputElement,
  taskListElement,
  getCheckBoxes,
  checkMark,
  activeTasks,
  allTasks,
  completedTasks,
  clearCompleted,
  getTaskItems,
} from './elements.js';
import {
  addTask,
  themeToggleHandler,
  deleteTask,
  taskToggle,
  activeTasksHandler,
  loadedActiveTasks,
  allTasksHandler,
  loadedCompletedTasks,
  clearCompletedHandler,
  handleDragStart,
  handleDragOver,
  handleDrop,
  // activateAllTasksTab,
} from './utils.js';
export const initTaskListeners = () => {
  // e: Identifies the element that triggered the delete action (the specific delete icon clicked).
  // index: Indicates which task in the array should be deleted based on its position.
  getDeleteIcons().forEach((icon, index) => {
    icon.addEventListener('click', (e) => deleteTask(e, index));
  });
  getCheckBoxes().forEach((box, index) => {
    box.addEventListener('click', (e) => taskToggle(e, index));
    box.addEventListener('keydown', (e) => taskToggle(e, index));
  });
  // Initialize drag-and-drop event listeners for task items
  const taskItems = getTaskItems(); // Get the updated task items
  taskItems.forEach((item) => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
  });
};

export const initListeners = () => {
  formElement.addEventListener('submit', addTask);
  checkMark.addEventListener('click', addTask);
  checkMark.addEventListener('keydown', addTask);
  themeToggle.addEventListener('click', themeToggleHandler);
  activeTasks.addEventListener('click', loadedActiveTasks);
  allTasks.addEventListener('click', allTasksHandler);
  completedTasks.addEventListener('click', loadedCompletedTasks);
  clearCompleted.addEventListener('click', clearCompletedHandler);
};

