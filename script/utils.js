import {
  getDeleteIcons,
  formElement,
  themeToggle,
  lightIcon,
  darkIcon,
  inputElement,
  taskListElement,
  taskListItems,
  allTasks,
  tasksCount,
  getTaskItems,
} from './elements.js';
import { initTaskListeners } from './eventListeners.js';
// import { loadedCompletedTasks } from './utils';
export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};
export const themeIconToggle = (theme) => {
  if (theme === 'dark') {
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'inline-block';
  } else {
    lightIcon.style.display = 'inline-block';
    darkIcon.style.display = 'none';
  }
};
export const themeToggleHandler = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  saveToDB('theme', newTheme);
  themeIconToggle(newTheme);
};
export const getTheme = () => {
  const savedTheme = fetchData('theme');
  const currentTheme = savedTheme || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeIconToggle(currentTheme);
};

export const saveToDB = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const renderTaskList = (tasks) => {
  let taskList = '';
  tasks.forEach((task, index) => {
    taskList += `
                        <li class="taskList__item${task.isCompleted ? ' taskList__item--isActive' : ''}" draggable="true" data-index="${index}">
                        <div class="taskSearch__check">
                            <div class="taskSearch__checkMark checkMarkList" tabindex="0" role="button">
                                <img class="taskSearch__checkMarkImg" src="./assets/icon-check.svg" alt="">
                            </div>
                        </div>
                        <div class="taskList__text">${task.value}</div>
                    <img src="./assets/icon-cross.svg" alt="" class="taskList__xmark" />
                </li>`;
  });
  taskListElement.innerHTML = taskList;
  inputElement.value = '';
  initTaskListeners(); // Ensure listeners are attached after rendering
};
// Add a helper function to activate the 'All' tab
export const activateAllTasksTab = () => {
  taskListItems.forEach((item) => {
    item.classList.remove('active');
  });
  allTasks.classList.add('active'); // Add 'active' class to All tab
};
export const activeElementHandler = (e) => {
  taskListItems.forEach((item) => {
    item.classList.remove('active');
  });
  e.currentTarget.classList.add('active');
};

export const activeTasksHandler = () => {
  const tasks = fetchData('tasks');
  // Check if tasks is not an array or is empty
  if (!Array.isArray(tasks) || tasks.length === 0) {
    tasksCount.innerHTML = `items left`;
    saveToDB('activeTasks', []);
    return;
  }
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  let activeTasksCount = activeTasks.length;
  if (activeTasksCount === 0) {
    tasksCount.innerHTML = `items left`;
  } else {
    tasksCount.innerHTML = `${activeTasksCount} items left`;
  }

  saveToDB('activeTasks', activeTasks);
};
export const addTask = (e) => {
  e.preventDefault();
  const taskValue = inputElement.value.trim();
  if (!taskValue) return;
  const task = {
    value: taskValue,
    isCompleted: false,
  };
  const tasks = fetchData('tasks') || [];
  tasks.push(task);
  saveToDB('tasks', tasks);
  initTaskList(tasks);
  activeTasksHandler();
  completedTasksHandler();
};
export const deleteTask = (e, index) => {
  //   // e: Identifies the element that triggered the delete action (the specific delete icon clicked).
  //   // index: Indicates which task in the array should be deleted based on its position.
  const answer = confirm('Did you want to delete this task?');
  if (!answer) return;
  const tasks = fetchData('tasks');
  tasks.splice(index, 1);
  saveToDB('tasks', tasks);
  if (tasks.length === 0) {
    taskListElement.innerHTML = ''; // Clear the task list in the DOM
  } else {
    initTaskList(tasks); // Re-render the updated task list
  }
  activeTasksHandler();
  completedTasksHandler();
};
export const taskToggle = (e, index) => {
  const tasks = fetchData('tasks');
  e.currentTarget.parentElement.parentElement.classList.toggle(
    'taskList__item--isActive'
  );
  tasks[index].isCompleted = !tasks[index].isCompleted;
  saveToDB('tasks', tasks);
  // Switch to All tasks view if a task is marked completed from Active view
  if (tasks[index].isCompleted) {
    activateAllTasksTab(); // Activate the All tasks tab
    allTasksHandler(); // Show all tasks after completion
  }
  activeTasksHandler();
  completedTasksHandler();
};
export const initDataOnStartUp = () => {
  getTheme();
  initTaskList(fetchData('tasks'));
  activeTasksHandler();
  completedTasksHandler();
};
export const initTaskList = (tasks) => {
  if (tasks.length) {
    renderTaskList(tasks);
    // initTaskListeners();
  } else {
    taskListElement.innerHTML = '';
  }
};

export const loadedActiveTasks = (e) => {
  const activeTasks = fetchData('activeTasks');
  if (!activeTasks || !Array.isArray(activeTasks)) return;
  activeElementHandler(e);
  renderTaskList(activeTasks);
};
export const allTasksHandler = (e) => {
  const tasks = fetchData('tasks');
  if (!tasks || !Array.isArray(tasks)) return;
  if (e) activeElementHandler(e);
  renderTaskList(tasks);
};
export const completedTasksHandler = () => {
  const tasks = fetchData('tasks');
  if (!tasks || !Array.isArray(tasks)) return;
  const completedTasks = tasks.filter((task) => task.isCompleted);
  saveToDB('completedTasks', completedTasks);
};
export const loadedCompletedTasks = (e) => {
  const completedTasks = fetchData('completedTasks');
  if (!completedTasks || !Array.isArray(completedTasks)) return;
  activeElementHandler(e);
  renderTaskList(completedTasks);
};
export const clearCompletedHandler = () => {
  let tasks = fetchData('tasks');
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) return;

  // Filter out completed tasks
  tasks = tasks.filter((task) => !task.isCompleted);

  // Save the updated list back to local storage
  saveToDB('tasks', tasks);

  // Render the updated list
  renderTaskList(tasks);

  // Update the active/completed tasks data
  activeTasksHandler();
  completedTasksHandler();
  activateAllTasksTab();
  allTasksHandler();
};

// Order Drag and Drop items in the list

let dragStartIndex;

export const handleDragStart = (e) => {
  dragStartIndex = +e.currentTarget.getAttribute('data-index');
  e.dataTransfer.effectAllowed = 'move';
};

export const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

export const handleDrop = (e) => {
  const dragEndIndex = +e.currentTarget.getAttribute('data-index');
  swapTasks(dragStartIndex, dragEndIndex);
  saveToDB('tasks', fetchData('tasks'));
  renderTaskList(fetchData('tasks'));
};

export const swapTasks = (fromIndex, toIndex) => {
  const tasks = fetchData('tasks');
  const [movedTask] = tasks.splice(fromIndex, 1); /*Destructing Array*/
  tasks.splice(toIndex, 0, movedTask);
  saveToDB('tasks', tasks);
};
