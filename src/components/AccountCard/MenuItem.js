import { createElement } from 'lucide';
import Heart from 'lucide/dist/esm/icons/heart';
import Clock from 'lucide/dist/esm/icons/clock';
import Ticket from 'lucide/dist/esm/icons/ticket';
import ChevronRight from 'lucide/dist/esm/icons/chevron-right';

/**
 * Mapa ikon pro menu položky
 */
const MENU_ICON_MAP = {
  favorites: Heart,
  history: Clock,
  coupons: Ticket,
};

/**
 * Vytvoří MenuItem element
 * @param {Object} props - Vlastnosti menu item
 * @param {string} props.label - Text menu položky
 * @param {'favorites'|'history'|'coupons'} props.iconType - Typ ikony
 * @param {number} props.count - Počet položek (volitelné)
 * @param {Function} props.onClick - Callback pro kliknutí
 * @returns {HTMLElement} MenuItem element
 */
export const createMenuItem = ({
  label = 'Menu položka',
  iconType = 'favorites',
  count = null,
  onClick = () => {},
} = {}) => {
  const item = document.createElement('button');
  item.className = 'menu-item';
  item.type = 'button';
  item.addEventListener('click', onClick);

  // Icon
  const iconContainer = document.createElement('div');
  iconContainer.className = 'menu-item__icon';
  const IconComponent = MENU_ICON_MAP[iconType] || MENU_ICON_MAP.favorites;
  const icon = createElement(IconComponent);
  icon.setAttribute('width', '20');
  icon.setAttribute('height', '20');
  iconContainer.appendChild(icon);

  // Label
  const labelEl = document.createElement('div');
  labelEl.className = 'menu-item__label';
  labelEl.textContent = label;

  // Count Badge (optional)
  if (count !== null && count !== undefined) {
    const countBadge = document.createElement('div');
    countBadge.className = 'menu-item__count';
    countBadge.textContent = count;
    labelEl.appendChild(countBadge);
  }

  // Chevron
  const chevron = document.createElement('div');
  chevron.className = 'menu-item__chevron';
  const chevronIcon = createElement(ChevronRight);
  chevronIcon.setAttribute('width', '16');
  chevronIcon.setAttribute('height', '16');
  chevron.appendChild(chevronIcon);

  // Assemble
  item.appendChild(iconContainer);
  item.appendChild(labelEl);
  item.appendChild(chevron);

  return item;
};
