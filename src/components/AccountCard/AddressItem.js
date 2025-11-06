import { createElement } from 'lucide';
import MapPin from 'lucide/dist/esm/icons/map-pin';
import Home from 'lucide/dist/esm/icons/home';
import Briefcase from 'lucide/dist/esm/icons/briefcase';
import GraduationCap from 'lucide/dist/esm/icons/graduation-cap';
import Pencil from 'lucide/dist/esm/icons/pencil';
import ChevronDown from 'lucide/dist/esm/icons/chevron-down';
import Plus from 'lucide/dist/esm/icons/plus';

/**
 * Mapa ikon pro typy adres
 */
const ADDRESS_ICON_MAP = {
  home: Home,
  work: Briefcase,
  school: GraduationCap,
  add: Plus,
  default: MapPin,
};

/**
 * Vytvoří AddressItem element
 * @param {Object} props - Vlastnosti address item
 * @param {string} props.label - Název adresy (např. "Domov", "Práce")
 * @param {string} props.address - Plná adresa
 * @param {'home'|'work'|'school'|'add'|'default'} props.iconType - Typ ikony
 * @param {boolean} props.isAddButton - Zda je to tlačítko pro přidání adresy
 * @param {Function} props.onEdit - Callback pro editaci nebo přidání
 * @returns {HTMLElement} AddressItem element
 */
export const createAddressItem = ({
  label = 'Adresa',
  address = '',
  iconType = 'default',
  isAddButton = false,
  onEdit = () => {},
} = {}) => {
  // Internal state pro rozbalení
  let isExpanded = false;

  const item = document.createElement('div');
  item.className = 'address-item';
  if (isAddButton) {
    item.classList.add('address-item--add');
  }

  // Header (always visible)
  const header = document.createElement('button');
  header.className = 'address-item__header';
  header.type = 'button';
  header.setAttribute('aria-expanded', 'false');

  // Toggle function or direct action for add button
  const handleClick = () => {
    if (isAddButton) {
      onEdit();
    } else {
      isExpanded = !isExpanded;
      if (isExpanded) {
        item.classList.add('address-item--expanded');
        header.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('address-item--expanded');
        header.setAttribute('aria-expanded', 'false');
      }
    }
  };

  header.addEventListener('click', handleClick);

  // Icon
  const iconContainer = document.createElement('div');
  iconContainer.className = 'address-item__icon';
  const IconComponent = ADDRESS_ICON_MAP[iconType] || ADDRESS_ICON_MAP.default;
  const icon = createElement(IconComponent);
  iconContainer.appendChild(icon);

  // Label
  const labelEl = document.createElement('div');
  labelEl.className = 'address-item__label';
  labelEl.textContent = label;

  header.appendChild(iconContainer);
  header.appendChild(labelEl);

  // Add chevron only if not an add button
  if (!isAddButton) {
    const chevron = document.createElement('div');
    chevron.className = 'address-item__chevron';
    const chevronIcon = createElement(ChevronDown);
    chevron.appendChild(chevronIcon);
    header.appendChild(chevron);
  }

  // Assemble
  item.appendChild(header);

  // Add expandable content only if not an add button
  if (!isAddButton) {
    const content = document.createElement('div');
    content.className = 'address-item__content';

    const addressText = document.createElement('div');
    addressText.className = 'address-item__address';
    addressText.textContent = address;

    const editButton = document.createElement('button');
    editButton.className = 'address-item__edit-button';
    editButton.type = 'button';
    editButton.setAttribute('aria-label', `Upravit adresu ${label}`);

    const editIcon = createElement(Pencil);
    editButton.appendChild(editIcon);

    const editText = document.createElement('span');
    editText.textContent = 'Upravit';
    editButton.appendChild(editText);

    editButton.addEventListener('click', (e) => {
      e.stopPropagation();
      onEdit();
    });

    content.appendChild(addressText);
    content.appendChild(editButton);

    item.appendChild(content);
  }

  return item;
};
