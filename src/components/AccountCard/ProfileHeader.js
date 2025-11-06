import { createElement } from 'lucide';
import Pencil from 'lucide/dist/esm/icons/pencil';

/**
 * Vytvoří ProfileHeader element pro AccountCard
 * @param {Object} props - Vlastnosti profile header
 * @param {string} props.avatarUrl - URL obrázku avataru
 * @param {string} props.name - Jméno uživatele
 * @param {boolean} props.isVerified - Zda je uživatel ověřený
 * @param {boolean} props.isPremium - Zda má uživatel Premium
 * @param {Function} props.onEdit - Callback pro kliknutí na editaci
 * @returns {HTMLElement} ProfileHeader element
 */
export const createProfileHeader = ({
  avatarUrl = '',
  name = 'Uživatel',
  isVerified = false,
  isPremium = false,
  onEdit = () => {},
} = {}) => {
  const header = document.createElement('div');
  header.className = 'profile-header';

  // Avatar Container
  const avatarContainer = document.createElement('div');
  avatarContainer.className = 'profile-header__avatar-container';

  const avatar = document.createElement('div');
  avatar.className = 'profile-header__avatar';
  if (avatarUrl) {
    const img = document.createElement('img');
    img.src = avatarUrl;
    img.alt = name;
    img.className = 'profile-header__avatar-img';
    avatar.appendChild(img);
  } else {
    // Placeholder avatar with initials
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    avatar.textContent = initials;
  }

  avatarContainer.appendChild(avatar);

  // Badge overlay on avatar (for premium badge only)
  if (isPremium) {
    const badge = document.createElement('div');
    badge.className = 'profile-header__avatar-badge';

    // Use VIP premium image for avatar badge
    const badgeImg = document.createElement('img');
    badgeImg.src = '../../../pics/premium image 690.svg';
    badgeImg.alt = 'VIP';
    badge.appendChild(badgeImg);

    avatarContainer.appendChild(badge);
  }

  // Info Container
  const infoContainer = document.createElement('div');
  infoContainer.className = 'profile-header__info';

  // Name Row (name + verified icon)
  const nameRow = document.createElement('div');
  nameRow.className = 'profile-header__name-row';

  const nameEl = document.createElement('div');
  nameEl.className = 'profile-header__name';
  nameEl.textContent = name;
  nameRow.appendChild(nameEl);

  if (isVerified) {
    const verifiedIcon = document.createElement('div');
    verifiedIcon.className = 'profile-header__verified-icon';

    // Create SVG check icon directly
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '11');
    svg.setAttribute('height', '11');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.5');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path = document.createElementNS(svgNS, 'polyline');
    path.setAttribute('points', '20 6 9 17 4 12');
    svg.appendChild(path);

    verifiedIcon.appendChild(svg);
    nameRow.appendChild(verifiedIcon);
  }

  infoContainer.appendChild(nameRow);

  // Premium Badge (separate row)
  if (isPremium) {
    const premiumBadge = document.createElement('div');
    premiumBadge.className = 'profile-header__premium-badge';
    premiumBadge.textContent = 'Premium';
    infoContainer.appendChild(premiumBadge);
  }

  // Edit Button (separate row)
  const editButton = document.createElement('button');
  editButton.className = 'profile-header__edit-button';
  editButton.type = 'button';
  editButton.setAttribute('aria-label', 'Upravit profil');

  const editText = document.createElement('span');
  editText.textContent = 'Upravit údaje';

  const editIcon = createElement(Pencil);

  editButton.appendChild(editText);
  editButton.appendChild(editIcon);

  editButton.addEventListener('click', onEdit);

  infoContainer.appendChild(editButton);

  // Assemble
  header.appendChild(avatarContainer);
  header.appendChild(infoContainer);

  return header;
};
