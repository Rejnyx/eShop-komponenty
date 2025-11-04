import './EditProfileModal.css';
import { createInput } from '../Input/Input.js';
import { createDatePicker } from '../DatePicker/DatePicker.js';
import { createTagSelector } from '../TagSelector/TagSelector.js';
import { createCheckbox } from '../Checkbox/Checkbox.js';
import { createButton } from '../Button/Button.js';
import { createElement } from 'lucide';
import X from 'lucide/dist/esm/icons/x';

/**
 * Vytvoří EditProfileModal element
 * @param {Object} props - Vlastnosti modal
u
 * @param {Object} props.profile - Profilová data
 * @param {string} props.profile.avatar - URL avataru
 * @param {string} props.profile.name - Jméno
 * @param {boolean} props.profile.verified - Ověřený účet
 * @param {boolean} props.profile.premium - Premium účet
 * @param {Array<string>} props.profile.badges - Pole badge typů ['favorite', 'favorite']
 * @param {Object} props.profile.vip - VIP data
 * @param {Object} props.formData - Formulářová data
 * @param {string} props.formData.firstName - Jméno
 * @param {string} props.formData.lastName - Příjmení
 * @param {string} props.formData.birthDate - Datum narození (YYYY-MM-DD)
 * @param {string} props.formData.phone - Telefon
 * @param {string} props.formData.email - Email
 * @param {Array<string>} props.formData.tags - Vybrané štítky
 * @param {boolean} props.formData.newsletter - Souhlás s newsletterem
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onSave - Save handler (vrací formData)
 * @returns {HTMLElement} EditProfileModal wrapper element
 */
export const createEditProfileModal = ({
  profile = {
    avatar: '',
    name: 'Adam Zdravý',
    verified: true,
    premium: true,
    badges: ['favorite', 'favorite'],
    vip: {
      cashback: '15%',
      points: '+10 b.',
    },
  },
  formData = {
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
    tags: [],
    newsletter: false,
  },
  onClose,
  onSave,
} = {}) => {
  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'edit-profile-modal-overlay';

  // Modal
  const modal = document.createElement('div');
  modal.className = 'edit-profile-modal';

  // === HEADER ===
  const header = document.createElement('div');
  header.className = 'edit-profile-modal__header';

  const title = document.createElement('h2');
  title.className = 'edit-profile-modal__title';
  title.textContent = 'Upravit údaje';

  const closeButton = document.createElement('button');
  closeButton.className = 'edit-profile-modal__close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Zavřít');
  const closeIcon = createElement(X);
  closeButton.appendChild(closeIcon);

  closeButton.addEventListener('click', () => {
    if (onClose) onClose();
  });

  header.appendChild(title);
  header.appendChild(closeButton);
  modal.appendChild(header);

  // === PROFILE HEADER ===
  const profileHeader = document.createElement('div');
  profileHeader.className = 'edit-profile-modal__profile-header';

  // Avatar
  const avatarContainer = document.createElement('div');
  avatarContainer.className = 'edit-profile-modal__avatar-container';

  const avatar = document.createElement('div');
  avatar.className = 'edit-profile-modal__avatar';

  if (profile.avatar) {
    const avatarImg = document.createElement('img');
    avatarImg.src = profile.avatar;
    avatarImg.alt = profile.name;
    avatarImg.className = 'edit-profile-modal__avatar-img';
    avatar.appendChild(avatarImg);
  } else {
    // Initials
    const initials = profile.name.split(' ').map(n => n[0]).join('');
    avatar.textContent = initials;
  }

  const avatarBadge = document.createElement('button');
  avatarBadge.className = 'edit-profile-modal__avatar-badge';
  avatarBadge.type = 'button';
  // Placeholder camera icon
  avatarBadge.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>';

  avatarContainer.appendChild(avatar);
  avatarContainer.appendChild(avatarBadge);

  // Profile info
  const profileInfo = document.createElement('div');
  profileInfo.className = 'edit-profile-modal__profile-info';

  // Name row
  const nameRow = document.createElement('div');
  nameRow.className = 'edit-profile-modal__name-row';

  const name = document.createElement('div');
  name.className = 'edit-profile-modal__name';
  name.textContent = profile.name;
  nameRow.appendChild(name);

  if (profile.verified) {
    const verifiedIcon = document.createElement('div');
    verifiedIcon.className = 'edit-profile-modal__verified-icon';
    verifiedIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>';
    nameRow.appendChild(verifiedIcon);
  }

  profileInfo.appendChild(nameRow);

  if (profile.premium) {
    const premiumBadge = document.createElement('div');
    premiumBadge.className = 'edit-profile-modal__premium-badge';
    premiumBadge.textContent = 'Premium';
    profileInfo.appendChild(premiumBadge);
  }

  profileHeader.appendChild(avatarContainer);
  profileHeader.appendChild(profileInfo);
  modal.appendChild(profileHeader);

  // === FORM ===
  const form = document.createElement('form');
  form.className = 'edit-profile-modal__form';

  // Local form state
  let currentFormData = { ...formData };

  // First name
  const firstNameInput = createInput({
    type: 'text',
    placeholder: '* Jméno',
    value: currentFormData.firstName,
    onInput: (value) => {
      currentFormData.firstName = value;
    },
  });
  form.appendChild(firstNameInput);

  // Last name
  const lastNameInput = createInput({
    type: 'text',
    placeholder: '* Příjmení',
    value: currentFormData.lastName,
    onInput: (value) => {
      currentFormData.lastName = value;
    },
  });
  form.appendChild(lastNameInput);

  // Birth date
  const birthDatePicker = createDatePicker({
    placeholder: '* Datum narození',
    value: currentFormData.birthDate,
    max: new Date().toISOString().split('T')[0],
    onChange: (value) => {
      currentFormData.birthDate = value;
    },
  });
  form.appendChild(birthDatePicker);

  // Phone
  const phoneInput = createInput({
    type: 'text',
    placeholder: '* Tel. číslo',
    value: currentFormData.phone,
    onInput: (value) => {
      currentFormData.phone = value;
    },
  });
  form.appendChild(phoneInput);

  // Email
  const emailInput = createInput({
    type: 'email',
    placeholder: '* E-mail',
    value: currentFormData.email,
    onInput: (value) => {
      currentFormData.email = value;
    },
  });
  form.appendChild(emailInput);

  // Tags
  const tagSelector = createTagSelector({
    placeholder: 'Štítky',
    selectedTags: currentFormData.tags,
    onChange: (tags) => {
      currentFormData.tags = tags;
    },
  });
  form.appendChild(tagSelector);

  modal.appendChild(form);

  // === ACTIONS ===
  const actions = document.createElement('div');
  actions.className = 'edit-profile-modal__actions';

  // Newsletter checkbox
  const newsletterContainer = document.createElement('div');
  newsletterContainer.className = 'edit-profile-modal__newsletter';

  const newsletterCheckbox = createCheckbox({
    label: 'Souhlasím se zasíláním novinek',
    checked: currentFormData.newsletter,
    onChange: (checked) => {
      currentFormData.newsletter = checked;
    },
  });
  newsletterContainer.appendChild(newsletterCheckbox);
  actions.appendChild(newsletterContainer);

  // Save button
  const saveButton = createButton({
    label: 'Uložit',
    variant: 'primary',
    fullWidth: true,
    onClick: () => {
      if (onSave) onSave(currentFormData);
    },
  });
  actions.appendChild(saveButton);

  modal.appendChild(actions);

  // === FOOTER ===
  const footer = document.createElement('div');
  footer.className = 'edit-profile-modal__footer';

  const footerText = document.createElement('div');
  footerText.className = 'edit-profile-modal__footer-text';
  footerText.textContent = 'Tuto službu provozuje';

  const footerLogo = document.createElement('img');
  footerLogo.className = 'edit-profile-modal__footer-logo';
  footerLogo.src = '../../../pics/orderMage logo.png';
  footerLogo.alt = 'OrderMage';

  footer.appendChild(footerText);
  footer.appendChild(footerLogo);
  modal.appendChild(footer);

  // Compose
  overlay.appendChild(modal);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay && onClose) {
      onClose();
    }
  });

  return overlay;
};
