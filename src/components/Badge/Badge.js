import './Badge.css';
import { createElement } from 'lucide';
import Star from 'lucide/dist/esm/icons/star';
import Heart from 'lucide/dist/esm/icons/heart';
import CheckCircle from 'lucide/dist/esm/icons/check-circle';
import AlertCircle from 'lucide/dist/esm/icons/alert-circle';
import Info from 'lucide/dist/esm/icons/info';

/**
 * Mapa dostupných ikon pro Badge
 */
const ICON_MAP = {
  star: Star,
  heart: Heart,
  'check-circle': CheckCircle,
  'alert-circle': AlertCircle,
  info: Info,
};

/**
 * Vytvoří Badge element
 * @param {Object} props - Vlastnosti badge
 * @param {string} props.label - Text badge
 * @param {'yellow'|'red'|'green'|'blue'} props.variant - Barevná varianta
 * @param {'outline'|'filled'} props.style - Styl badge (outline = průhledný, filled = plný)
 * @param {string} props.icon - Název ikony ('star', 'heart', 'check-circle', 'alert-circle', 'info')
 * @returns {HTMLElement} Badge element
 */
export const createBadge = ({
  label = 'Badge',
  variant = 'yellow',
  style = 'outline',
  icon = 'star',
} = {}) => {
  // Wrapper
  const badge = document.createElement('div');
  const classes = ['badge'];
  classes.push(`badge--${variant}`);
  classes.push(`badge--${style}`);
  badge.className = classes.join(' ');

  // Icon (pokud je zadána a existuje)
  if (icon && ICON_MAP[icon]) {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'badge__icon';

    const iconSvg = createElement(ICON_MAP[icon]);
    iconSvg.setAttribute('width', '14');
    iconSvg.setAttribute('height', '14');
    iconSvg.setAttribute('stroke-width', '1.5');

    iconContainer.appendChild(iconSvg);
    badge.appendChild(iconContainer);
  }

  // Label
  const labelEl = document.createElement('div');
  labelEl.className = 'badge__label';
  labelEl.textContent = label;
  badge.appendChild(labelEl);

  return badge;
};

/**
 * Export dostupných ikon pro použití v stories/dokumentaci
 */
export const availableIcons = Object.keys(ICON_MAP);
