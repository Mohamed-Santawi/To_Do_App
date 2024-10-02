import {
  getDeleteIcons,
  formElement,
  themeToggle,
  lightIcon,
  darkIcon,
  inputElement,
  taskListElement,
  getTaskItems,
} from './script/elements.js';
import { initListeners } from './script/eventListeners.js';
import { initDataOnStartUp } from './script/utils.js';

initDataOnStartUp();
initListeners();
