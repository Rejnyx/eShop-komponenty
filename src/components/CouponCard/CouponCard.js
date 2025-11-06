/**
 * Coupon Card Component
 * Karta pro zobrazení kupónu s obrázkem, kódem a platností
 *
 * @param {Object} props
 * @param {string} props.id - Unikátní ID kupónu
 * @param {string} props.image - URL obrázku kupónu
 * @param {string} props.title - Název kupónu
 * @param {string} props.code - Kód kupónu
 * @param {string} props.validUntil - Platnost kupónu
 * @param {boolean} props.isHighlighted - Zvýraznění (první aktivní kupón)
 * @param {boolean} props.isHistory - Historický (použitý) kupón
 * @param {Function} props.onClick - Callback při kliknutí
 * @returns {HTMLElement}
 */

import './CouponCard.css';
import { createElement } from 'lucide';
import ChevronRight from 'lucide/dist/esm/icons/chevron-right';

export const createCouponCard = ({
  id,
  image,
  title,
  code,
  validUntil,
  isHighlighted = false,
  isHistory = false,
  onClick,
} = {}) => {
  const card = document.createElement('div');
  card.className = 'coupon-card';

  if (isHighlighted) {
    card.classList.add('coupon-card--highlighted');
  }

  if (isHistory) {
    card.classList.add('coupon-card--history');
  }

  // Card inner wrapper
  const cardInner = document.createElement('div');
  cardInner.className = 'coupon-card__inner';

  // Image
  const imageElement = document.createElement('img');
  imageElement.className = 'coupon-card__image';
  imageElement.src = image || 'https://placehold.co/90x68';
  imageElement.alt = title || 'Kupón';

  // Content
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'coupon-card__content';

  // Title
  const titleElement = document.createElement('h3');
  titleElement.className = 'coupon-card__title';
  titleElement.textContent = title;

  // Code label
  const codeLabel = document.createElement('div');
  codeLabel.className = 'coupon-card__label';
  codeLabel.textContent = 'Kód:';

  // Code value
  const codeValue = document.createElement('div');
  codeValue.className = 'coupon-card__code';
  codeValue.textContent = code;

  // Validity label
  const validityLabel = document.createElement('div');
  validityLabel.className = 'coupon-card__label';
  validityLabel.textContent = 'Platnost:';

  // Validity value
  const validityValue = document.createElement('div');
  validityValue.className = 'coupon-card__validity';
  validityValue.textContent = validUntil;

  contentWrapper.appendChild(titleElement);
  contentWrapper.appendChild(codeLabel);
  contentWrapper.appendChild(codeValue);
  contentWrapper.appendChild(validityLabel);
  contentWrapper.appendChild(validityValue);

  // Chevron icon
  const chevronButton = document.createElement('button');
  chevronButton.className = 'coupon-card__chevron';
  chevronButton.setAttribute('aria-label', 'Detail kupónu');
  const chevronIcon = createElement(ChevronRight);
  chevronButton.appendChild(chevronIcon);

  if (onClick) {
    chevronButton.addEventListener('click', () => onClick(id));
  }

  // Assemble card
  cardInner.appendChild(imageElement);
  cardInner.appendChild(contentWrapper);
  cardInner.appendChild(chevronButton);

  card.appendChild(cardInner);

  return card;
};
