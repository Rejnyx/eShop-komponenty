import './AccountCard.css';
import './AddressSelector.css';
import { createProfileHeader } from './ProfileHeader.js';
import { createAddressSelector } from './AddressSelector.js';
import { createVIPBanner } from './VIPBanner.js';
import { createMenuItem } from './MenuItem.js';
import { createBadge } from '../Badge/Badge.js';
import { createElement } from 'lucide';
import X from 'lucide/dist/esm/icons/x';

/**
 * Vytvoří AccountCard modal
 * @param {Object} props - Vlastnosti account card
 * @param {Object} props.user - Uživatelské údaje
 * @param {string} props.user.name - Jméno uživatele
 * @param {string} props.user.avatarUrl - URL avataru
 * @param {boolean} props.user.isVerified - Zda je uživatel ověřený
 * @param {boolean} props.user.isPremium - Zda má uživatel Premium
 * @param {Array} props.badges - Pole badge tagů
 * @param {Object} props.vipBanner - Nastavení VIP banneru
 * @param {Array} props.addresses - Pole adres
 * @param {Array} props.menuItems - Pole menu položek
 * @param {Function} props.onClose - Callback pro zavření modalu
 * @returns {HTMLElement} AccountCard modal element
 */
export const createAccountCard = ({
  user = {
    name: 'Uživatel',
    avatarUrl: '',
    isVerified: false,
    isPremium: false,
  },
  badges = [],
  vipBanner = {
    text: 'VIP cashback|15% sleva|+10 b.',
  },
  addresses = [],
  menuItems = [],
  onClose = () => {},
  onEdit = () => {},
} = {}) => {
  // Modal Overlay
  const overlay = document.createElement('div');
  overlay.className = 'account-card-overlay';
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      onClose();
    }
  });

  // Modal Container
  const modal = document.createElement('div');
  modal.className = 'account-card';

  // Header with close button
  const header = document.createElement('div');
  header.className = 'account-card__header';

  const title = document.createElement('h2');
  title.className = 'account-card__title';
  title.textContent = 'Můj účet';

  const closeButton = document.createElement('button');
  closeButton.className = 'account-card__close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Zavřít');
  const closeIcon = createElement(X);
  closeButton.appendChild(closeIcon);
  closeButton.addEventListener('click', onClose);

  header.appendChild(title);
  header.appendChild(closeButton);

  // Content
  const content = document.createElement('div');
  content.className = 'account-card__content';

  // Profile Section
  const profileSection = document.createElement('div');
  profileSection.className = 'account-card__section account-card__profile';

  const profileHeader = createProfileHeader({
    avatarUrl: user.avatarUrl,
    name: user.name,
    isVerified: user.isVerified,
    isPremium: user.isPremium,
    onEdit: onEdit,
  });
  profileSection.appendChild(profileHeader);

  // Badges
  if (badges.length > 0) {
    const badgesContainer = document.createElement('div');
    badgesContainer.className = 'account-card__badges';
    badges.forEach((badgeProps) => {
      const badge = createBadge(badgeProps);
      badgesContainer.appendChild(badge);
    });
    profileSection.appendChild(badgesContainer);
  }

  content.appendChild(profileSection);

  // VIP Banner Section
  if (vipBanner) {
    const bannerSection = document.createElement('div');
    bannerSection.className = 'account-card__section';
    const banner = createVIPBanner({
      text: vipBanner.text,
    });
    bannerSection.appendChild(banner);
    content.appendChild(bannerSection);
  }

  // Addresses Section
  if (addresses.length > 0) {
    const addressesSection = document.createElement('div');
    addressesSection.className = 'account-card__section';

    const addressesTitle = document.createElement('h3');
    addressesTitle.className = 'account-card__section-title';
    addressesTitle.textContent = 'Moje adresy';
    addressesSection.appendChild(addressesTitle);

    // Create address selector with IDs
    const addressesWithIds = addresses.map((addr, index) => ({
      id: index + 1,
      ...addr,
    }));

    const addressSelector = createAddressSelector({
      addresses: addressesWithIds,
      selectedId: 1, // Default to first address
      onSelect: (id) => console.log(`Selected address: ${id}`),
      onEdit: (id) => console.log(`Edit address: ${id}`),
      onAddNew: () => console.log('Add new address clicked'),
    });

    addressesSection.appendChild(addressSelector);
    content.appendChild(addressesSection);
  }

  // Menu Section
  if (menuItems.length > 0) {
    const menuSection = document.createElement('div');
    menuSection.className = 'account-card__section account-card__menu';

    menuItems.forEach((menuItemProps) => {
      const menuItem = createMenuItem({
        ...menuItemProps,
        onClick: () => console.log(`Menu item clicked: ${menuItemProps.label}`),
      });
      menuSection.appendChild(menuItem);
    });

    content.appendChild(menuSection);
  }

  // Footer
  const footer = document.createElement('div');
  footer.className = 'account-card__footer';

  const footerText = document.createElement('div');
  footerText.className = 'account-card__footer-text';
  footerText.textContent = 'Tuto službu provozuje';

  const footerLogo = document.createElement('img');
  footerLogo.className = 'account-card__footer-logo';
  footerLogo.src = '../../../pics/orderMage logo.png';
  footerLogo.alt = 'OrderMage';

  footer.appendChild(footerText);
  footer.appendChild(footerLogo);

  // Assemble Modal
  modal.appendChild(header);
  modal.appendChild(content);
  modal.appendChild(footer);

  overlay.appendChild(modal);

  return overlay;
};
