import './Button.css';
import { createElement } from 'lucide';

/**
 * Vytvoří Button element
 * @param {Object} props - Vlastnosti tlačítka
 * @param {string} props.label - Text tlačítka
 * @param {'primary'|'secondary'} props.variant - Varianta stylu
 * @param {boolean} props.fullWidth - Celá šířka
 * @param {boolean} props.disabled - Zakázané tlačítko
 * @param {Object} props.icon - Lucide ikona objekt (např. import ChevronRight from 'lucide/dist/esm/icons/chevron-right')
 * @param {'left'|'right'} props.iconPosition - Pozice ikony (default: left)
 * @param {Function} props.onClick - Click handler
 * @returns {HTMLElement} Button element
 */
export const createButton = ({
  label = 'Button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  onClick,
} = {}) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.disabled = disabled;

  // CSS třídy
  const classes = ['btn'];
  classes.push(`btn--${variant}`);
  if (fullWidth) classes.push('btn--full-width');
  if (icon) classes.push(`btn--icon-${iconPosition}`);

  button.className = classes.join(' ');

  // Text labelu
  const labelSpan = document.createElement('span');
  labelSpan.className = 'btn__label';
  labelSpan.textContent = label;

  // Ikona vlevo
  if (icon && iconPosition === 'left') {
    const iconContainer = document.createElement('span');
    iconContainer.className = 'btn__icon';
    const iconElement = createElement(icon);
    iconContainer.appendChild(iconElement);
    button.appendChild(iconContainer);
  }

  button.appendChild(labelSpan);

  // Ikona vpravo
  if (icon && iconPosition === 'right') {
    const iconContainer = document.createElement('span');
    iconContainer.className = 'btn__icon';
    const iconElement = createElement(icon);
    iconContainer.appendChild(iconElement);
    button.appendChild(iconContainer);
  }

  // Event listener
  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
};
