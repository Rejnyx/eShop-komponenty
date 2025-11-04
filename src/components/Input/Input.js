import './Input.css';
import { createElement } from 'lucide';
import Eye from 'lucide/dist/esm/icons/eye';
import EyeOff from 'lucide/dist/esm/icons/eye-off';

/**
 * Vytvoří Input element
 * @param {Object} props - Vlastnosti inputu
 * @param {'text'|'password'|'email'} props.type - Typ inputu
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Hodnota inputu
 * @param {boolean} props.error - Error stav
 * @param {string} props.errorMessage - Chybová zpráva
 * @param {boolean} props.disabled - Zakázaný input
 * @param {boolean} props.showPasswordToggle - Zobrazit toggle pro password
 * @param {Function} props.onInput - Input handler
 * @param {Function} props.onChange - Change handler
 * @returns {HTMLElement} Input wrapper element
 */
export const createInput = ({
  type = 'text',
  placeholder = '',
  value = '',
  error = false,
  errorMessage = '',
  disabled = false,
  showPasswordToggle = false,
  onInput,
  onChange,
} = {}) => {
  // Wrapper
  const wrapper = document.createElement('div');
  const classes = ['input'];
  if (error) classes.push('input--error');
  if (showPasswordToggle && type === 'password') classes.push('input--with-icon-right');
  wrapper.className = classes.join(' ');

  // Input field
  const input = document.createElement('input');
  input.className = 'input__field';
  input.type = type;
  input.placeholder = placeholder;
  input.value = value;
  input.disabled = disabled;

  // Event listeners
  if (onInput) {
    input.addEventListener('input', (e) => onInput(e.target.value, e));
  }
  if (onChange) {
    input.addEventListener('change', (e) => onChange(e.target.value, e));
  }

  wrapper.appendChild(input);

  // Password toggle icon
  if (showPasswordToggle && type === 'password') {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'input__icon';

    let isPasswordVisible = false;
    const eyeIcon = createElement(Eye);
    eyeIcon.setAttribute('width', '24');
    eyeIcon.setAttribute('height', '24');
    eyeIcon.setAttribute('stroke-width', '1.5');
    iconContainer.appendChild(eyeIcon);

    iconContainer.addEventListener('click', () => {
      isPasswordVisible = !isPasswordVisible;
      input.type = isPasswordVisible ? 'text' : 'password';

      // Swap icon
      iconContainer.innerHTML = '';
      const newIcon = isPasswordVisible ? createElement(EyeOff) : createElement(Eye);
      newIcon.setAttribute('width', '24');
      newIcon.setAttribute('height', '24');
      newIcon.setAttribute('stroke-width', '1.5');
      iconContainer.appendChild(newIcon);
    });

    wrapper.appendChild(iconContainer);
  }

  // Error message
  if (error && errorMessage) {
    const errorEl = document.createElement('div');
    errorEl.className = 'input__error-message';
    errorEl.textContent = errorMessage;
    wrapper.appendChild(errorEl);
  }

  return wrapper;
};
