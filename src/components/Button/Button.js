import './Button.css';

/**
 * Vytvoří Button element
 * @param {Object} props - Vlastnosti tlačítka
 * @param {string} props.label - Text tlačítka
 * @param {'primary'|'secondary'} props.variant - Varianta stylu
 * @param {'default'|'large'} props.size - Velikost tlačítka
 * @param {boolean} props.fullWidth - Celá šířka
 * @param {boolean} props.disabled - Zakázané tlačítko
 * @param {string} props.icon - Cesta k ikoně (volitelné)
 * @param {Function} props.onClick - Click handler
 * @returns {HTMLElement} Button element
 */
export const createButton = ({
  label = 'Button',
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  disabled = false,
  icon = null,
  onClick,
}) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.disabled = disabled;

  // CSS třídy
  const classes = ['btn'];
  classes.push(`btn--${variant}`);
  if (size === 'large') classes.push('btn--large');
  if (fullWidth) classes.push('btn--full-width');

  button.className = classes.join(' ');

  // Ikona (pokud je zadána)
  if (icon) {
    const iconImg = document.createElement('img');
    iconImg.src = icon;
    iconImg.alt = '';
    iconImg.className = 'btn__icon';
    button.appendChild(iconImg);
  }

  // Text labelu
  const labelSpan = document.createElement('span');
  labelSpan.textContent = label;
  button.appendChild(labelSpan);

  // Event listener
  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
};
