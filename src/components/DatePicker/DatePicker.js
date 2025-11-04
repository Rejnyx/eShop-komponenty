import './DatePicker.css';
import { createElement } from 'lucide';
import Calendar from 'lucide/dist/esm/icons/calendar';

/**
 * Vytvoří DatePicker element
 * @param {Object} props - Vlastnosti date pickeru
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Hodnota date (YYYY-MM-DD format)
 * @param {boolean} props.error - Error stav
 * @param {string} props.errorMessage - Chybová zpráva
 * @param {boolean} props.disabled - Zakázaný picker
 * @param {string} props.min - Minimální datum (YYYY-MM-DD)
 * @param {string} props.max - Maximální datum (YYYY-MM-DD)
 * @param {Function} props.onInput - Input handler
 * @param {Function} props.onChange - Change handler
 * @returns {HTMLElement} DatePicker wrapper element
 */
export const createDatePicker = ({
  placeholder = 'Vyberte datum',
  value = '',
  error = false,
  errorMessage = '',
  disabled = false,
  min = '',
  max = '',
  onInput,
  onChange,
} = {}) => {
  // Wrapper
  const wrapper = document.createElement('div');
  const classes = ['date-picker'];
  if (error) classes.push('date-picker--error');
  wrapper.className = classes.join(' ');

  // Input container
  const inputContainer = document.createElement('div');
  inputContainer.className = 'date-picker__container';

  // Date input field
  const input = document.createElement('input');
  input.className = 'date-picker__field';
  input.type = 'date';
  input.value = value;
  input.disabled = disabled;
  if (min) input.min = min;
  if (max) input.max = max;

  // Placeholder handling (date input doesn't support placeholder)
  if (!value) {
    input.setAttribute('data-placeholder', placeholder);
  }

  // Event listeners
  if (onInput) {
    input.addEventListener('input', (e) => {
      if (e.target.value) {
        input.removeAttribute('data-placeholder');
      } else {
        input.setAttribute('data-placeholder', placeholder);
      }
      onInput(e.target.value, e);
    });
  }

  if (onChange) {
    input.addEventListener('change', (e) => {
      if (e.target.value) {
        input.removeAttribute('data-placeholder');
      } else {
        input.setAttribute('data-placeholder', placeholder);
      }
      onChange(e.target.value, e);
    });
  }

  inputContainer.appendChild(input);

  // Calendar icon
  const iconContainer = document.createElement('div');
  iconContainer.className = 'date-picker__icon';
  const calendarIcon = createElement(Calendar);
  iconContainer.appendChild(calendarIcon);

  inputContainer.appendChild(iconContainer);
  wrapper.appendChild(inputContainer);

  // Error message
  if (error && errorMessage) {
    const errorEl = document.createElement('div');
    errorEl.className = 'date-picker__error-message';
    errorEl.textContent = errorMessage;
    wrapper.appendChild(errorEl);
  }

  return wrapper;
};
