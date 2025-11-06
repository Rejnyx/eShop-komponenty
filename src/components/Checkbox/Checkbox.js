import './Checkbox.css';
import { createElement } from 'lucide';
import Check from 'lucide/dist/esm/icons/check';

/**
 * Vytvoří Checkbox element
 * @param {Object} props - Vlastnosti checkboxu
 * @param {string} props.label - Label text (může obsahovat HTML)
 * @param {boolean} props.checked - Zaškrtnuto
 * @param {boolean} props.disabled - Zakázáno
 * @param {string} props.name - Name atribut
 * @param {string} props.value - Value atribut
 * @param {Function} props.onChange - Change handler
 * @returns {HTMLElement} Checkbox wrapper element
 */
export const createCheckbox = ({
  label = '',
  checked = false,
  disabled = false,
  name = '',
  value = '',
  onChange,
} = {}) => {
  // Wrapper
  const wrapper = document.createElement('label');
  const classes = ['checkbox'];
  if (disabled) classes.push('checkbox--disabled');
  wrapper.className = classes.join(' ');

  // Hidden input
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'checkbox__input';
  input.checked = checked;
  input.disabled = disabled;
  if (name) input.name = name;
  if (value) input.value = value;

  // Change handler
  if (onChange) {
    input.addEventListener('change', (e) => onChange(e.target.checked, e));
  }

  // Custom checkbox box
  const box = document.createElement('span');
  box.className = 'checkbox__box';

  // Checkmark icon (Lucide)
  const checkmark = createElement(Check);
  checkmark.classList.add('checkbox__checkmark');
  box.appendChild(checkmark);

  // Label
  const labelEl = document.createElement('span');
  labelEl.className = 'checkbox__label';
  labelEl.innerHTML = label; // Umožňuje HTML (např. odkazy)

  // Compose
  wrapper.appendChild(input);
  wrapper.appendChild(box);
  wrapper.appendChild(labelEl);

  return wrapper;
};
