/**
 * Favorites Modal - Universal Modal
 * Modal pro sekci oblíbených položek a kupónů
 */

import { createElement } from 'lucide';
import X from 'lucide/dist/esm/icons/x';
import ChevronLeft from 'lucide/dist/esm/icons/chevron-left';
import './FavoritesModal.css';
import { createButton } from '../Button/Button.js';
import { createCouponCard } from '../CouponCard/CouponCard.js';

/**
 * Vytvoří FavoritesModal komponentu
 * @param {Object} props - Vlastnosti komponenty
 * @param {string} props.title - Nadpis modalu (default "Oblíbené položky")
 * @param {Array} props.coupons - Pole kupónů k zobrazení
 * @param {Function} props.onClose - Callback při zavření modalu
 * @param {Function} props.onBack - Callback při kliknutí na tlačítko zpět
 * @param {Function} props.onFindFavorites - Callback při kliknutí na "Najít si své oblíbence"
 * @param {Function} props.onCouponClick - Callback při kliknutí na kupón
 * @returns {HTMLElement}
 */
export const createFavoritesModal = ({
  title = 'Oblíbené položky',
  coupons = [],
  onClose,
  onBack,
  onFindFavorites,
  onCouponClick,
} = {}) => {
  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'favorites-modal-overlay';

  // Modal container
  const modal = document.createElement('div');
  modal.className = 'favorites-modal';

  // HEADER - konzistentní s ostatními modály
  const header = document.createElement('div');
  header.className = 'favorites-modal__header';

  // Back button (pokud je onBack callback)
  if (onBack) {
    const backButton = document.createElement('button');
    backButton.className = 'favorites-modal__back';
    backButton.setAttribute('aria-label', 'Zpět');
    const backIcon = createElement(ChevronLeft);
    backButton.appendChild(backIcon);
    backButton.addEventListener('click', onBack);
    header.appendChild(backButton);
  }

  // Title wrapper pro centrování
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'favorites-modal__title-wrapper';

  const titleElement = document.createElement('h2');
  titleElement.className = 'favorites-modal__title';
  titleElement.textContent = title;

  titleWrapper.appendChild(titleElement);
  header.appendChild(titleWrapper);

  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'favorites-modal__close';
  closeButton.setAttribute('aria-label', 'Zavřít');
  const closeIcon = createElement(X);
  closeButton.appendChild(closeIcon);

  closeButton.addEventListener('click', () => {
    if (onClose) onClose();
  });

  header.appendChild(closeButton);

  // CONTENT - Kupóny nebo Empty state
  const content = document.createElement('div');
  content.className = 'favorites-modal__content';

  // Rozdělit kupóny na aktivní a historické
  const activeCoupons = coupons.filter((c) => !c.isHistory);
  const historyCoupons = coupons.filter((c) => c.isHistory);
  const hasCoupons = coupons.length > 0;

  if (hasCoupons) {
    // Zobrazit seznam kupónů
    // Aktivní kupóny
    if (activeCoupons.length > 0) {
      const activeCouponsContainer = document.createElement('div');
      activeCouponsContainer.className = 'favorites-modal__coupons-list';

      activeCoupons.forEach((coupon, index) => {
        const couponCard = createCouponCard({
          ...coupon,
          isHighlighted: index === 0,
          onClick: onCouponClick,
        });
        activeCouponsContainer.appendChild(couponCard);
      });

      content.appendChild(activeCouponsContainer);
    }

    // Historie divider a kupóny
    if (historyCoupons.length > 0) {
      // Divider
      const divider = document.createElement('div');
      divider.className = 'favorites-modal__divider';

      const dividerLine1 = document.createElement('div');
      dividerLine1.className = 'favorites-modal__divider-line';

      const dividerText = document.createElement('span');
      dividerText.className = 'favorites-modal__divider-text';
      dividerText.textContent = 'Historie';

      const dividerLine2 = document.createElement('div');
      dividerLine2.className = 'favorites-modal__divider-line';

      divider.appendChild(dividerLine1);
      divider.appendChild(dividerText);
      divider.appendChild(dividerLine2);

      content.appendChild(divider);

      // Historické kupóny
      const historyCouponsContainer = document.createElement('div');
      historyCouponsContainer.className = 'favorites-modal__coupons-list';

      historyCoupons.forEach((coupon) => {
        const couponCard = createCouponCard({
          ...coupon,
          isHistory: true,
          onClick: onCouponClick,
        });
        historyCouponsContainer.appendChild(couponCard);
      });

      content.appendChild(historyCouponsContainer);
    }
  } else {
    // Zobrazit empty state
    const emptyState = document.createElement('div');
    emptyState.className = 'favorites-modal__empty-state';

    const emoji = document.createElement('div');
    emoji.className = 'favorites-modal__emoji';
    emoji.textContent = '💔';

    const emptyText = document.createElement('p');
    emptyText.className = 'favorites-modal__empty-text';
    emptyText.textContent = 'Zatím nemáte žádné položky oblíbené.';

    emptyState.appendChild(emoji);
    emptyState.appendChild(emptyText);
    content.appendChild(emptyState);
  }

  // CTA Button - pouze pro empty state
  let ctaButtonWrapper = null;
  if (!hasCoupons && onFindFavorites) {
    ctaButtonWrapper = document.createElement('div');
    ctaButtonWrapper.className = 'favorites-modal__cta-wrapper';

    const ctaButton = createButton({
      label: 'Najít si své oblíbence',
      variant: 'primary',
      fullWidth: true,
      onClick: onFindFavorites,
    });

    ctaButtonWrapper.appendChild(ctaButton);
  }

  // FOOTER - konzistentní s ostatními modály
  const footer = document.createElement('div');
  footer.className = 'favorites-modal__footer';

  const footerText = document.createElement('span');
  footerText.className = 'favorites-modal__footer-text';
  footerText.textContent = 'Váš účet spravuje';

  const footerLogo = document.createElement('img');
  footerLogo.className = 'favorites-modal__footer-logo';
  footerLogo.src = '../../../pics/orderMage logo.png';
  footerLogo.alt = 'OrderMage';

  footer.appendChild(footerText);
  footer.appendChild(footerLogo);

  // Sestavení modalu
  modal.appendChild(header);
  modal.appendChild(content);
  if (ctaButtonWrapper) {
    modal.appendChild(ctaButtonWrapper);
  }
  modal.appendChild(footer);

  overlay.appendChild(modal);

  // Zavření při kliknutí na overlay
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay && onClose) {
      onClose();
    }
  });

  return overlay;
};
