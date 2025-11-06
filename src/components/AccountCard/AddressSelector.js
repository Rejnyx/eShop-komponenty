import { createElement } from 'lucide';
import MapPin from 'lucide/dist/esm/icons/map-pin';
import Home from 'lucide/dist/esm/icons/home';
import Briefcase from 'lucide/dist/esm/icons/briefcase';
import GraduationCap from 'lucide/dist/esm/icons/graduation-cap';
import ChevronDown from 'lucide/dist/esm/icons/chevron-down';
import Copy from 'lucide/dist/esm/icons/copy';
import Plus from 'lucide/dist/esm/icons/plus';

/**
 * Mapa ikon pro typy adres
 */
const ADDRESS_ICON_MAP = {
  home: Home,
  work: Briefcase,
  school: GraduationCap,
  default: MapPin,
};

/**
 * Vytvoří AddressSelector element - dropdown pro výběr adresy
 * @param {Object} props - Vlastnosti address selector
 * @param {Array} props.addresses - Pole adres [{id, label, address, iconType}]
 * @param {number|string} props.selectedId - ID vybrané adresy
 * @param {Function} props.onSelect - Callback pro výběr adresy
 * @param {Function} props.onEdit - Callback pro editaci adresy
 * @param {Function} props.onAddNew - Callback pro přidání nové adresy
 * @returns {HTMLElement} AddressSelector element
 */
export const createAddressSelector = ({
  addresses = [],
  selectedId = null,
  onSelect = () => {},
  onEdit = () => {},
  onAddNew = () => {},
} = {}) => {
  // Internal state pro rozbalení
  let isExpanded = false;

  const selector = document.createElement('div');
  selector.className = 'address-selector';

  // Najít vybranou adresu
  const selectedAddress = addresses.find((addr) => addr.id === selectedId) || addresses[0];

  if (!selectedAddress) {
    return selector;
  }

  // ========== Selected Address (Header) ==========
  const selectedHeader = document.createElement('button');
  selectedHeader.className = 'address-selector__selected';
  selectedHeader.type = 'button';
  selectedHeader.setAttribute('aria-expanded', 'false');

  // Toggle function
  const toggleExpanded = () => {
    isExpanded = !isExpanded;
    if (isExpanded) {
      selector.classList.add('address-selector--expanded');
      selectedHeader.setAttribute('aria-expanded', 'true');
    } else {
      selector.classList.remove('address-selector--expanded');
      selectedHeader.setAttribute('aria-expanded', 'false');
    }
  };

  selectedHeader.addEventListener('click', toggleExpanded);

  // Icon
  const selectedIconContainer = document.createElement('div');
  selectedIconContainer.className = 'address-selector__icon';
  const SelectedIconComponent = ADDRESS_ICON_MAP[selectedAddress.iconType] || ADDRESS_ICON_MAP.default;
  const selectedIcon = createElement(SelectedIconComponent);
  selectedIconContainer.appendChild(selectedIcon);

  // Text content
  const selectedContent = document.createElement('div');
  selectedContent.className = 'address-selector__content';

  const selectedLabel = document.createElement('div');
  selectedLabel.className = 'address-selector__label';
  selectedLabel.textContent = selectedAddress.label;

  const selectedAddressText = document.createElement('div');
  selectedAddressText.className = 'address-selector__address';
  selectedAddressText.textContent = selectedAddress.address;

  selectedContent.appendChild(selectedLabel);
  selectedContent.appendChild(selectedAddressText);

  // Chevron
  const chevronContainer = document.createElement('div');
  chevronContainer.className = 'address-selector__chevron';
  const chevronIcon = createElement(ChevronDown);
  chevronContainer.appendChild(chevronIcon);

  selectedHeader.appendChild(selectedIconContainer);
  selectedHeader.appendChild(selectedContent);
  selectedHeader.appendChild(chevronContainer);

  // ========== Dropdown Content ==========
  const dropdown = document.createElement('div');
  dropdown.className = 'address-selector__dropdown';

  const dropdownInner = document.createElement('div');
  dropdownInner.className = 'address-selector__dropdown-inner';

  // Other addresses (not selected)
  const otherAddresses = addresses.filter((addr) => addr.id !== selectedId);

  otherAddresses.forEach((addr) => {
    const item = document.createElement('button');
    item.className = 'address-selector__item';
    item.type = 'button';

    // Click handler pro výběr adresy
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      onSelect(addr.id);
      toggleExpanded();
    });

    // Icon
    const itemIconContainer = document.createElement('div');
    itemIconContainer.className = 'address-selector__icon';
    const ItemIconComponent = ADDRESS_ICON_MAP[addr.iconType] || ADDRESS_ICON_MAP.default;
    const itemIcon = createElement(ItemIconComponent);
    itemIconContainer.appendChild(itemIcon);

    // Text content
    const itemContent = document.createElement('div');
    itemContent.className = 'address-selector__content';

    const itemLabel = document.createElement('div');
    itemLabel.className = 'address-selector__label';
    itemLabel.textContent = addr.label;

    const itemAddressText = document.createElement('div');
    itemAddressText.className = 'address-selector__address';
    itemAddressText.textContent = addr.address;

    itemContent.appendChild(itemLabel);
    itemContent.appendChild(itemAddressText);

    // Edit icon
    const editIconContainer = document.createElement('div');
    editIconContainer.className = 'address-selector__edit';
    const editIcon = createElement(Copy);
    editIconContainer.appendChild(editIcon);

    editIconContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      onEdit(addr.id);
    });

    item.appendChild(itemIconContainer);
    item.appendChild(itemContent);
    item.appendChild(editIconContainer);

    dropdownInner.appendChild(item);
  });

  // Add new address button
  const addButton = document.createElement('button');
  addButton.className = 'address-selector__add-button';
  addButton.type = 'button';

  const plusIcon = createElement(Plus);
  addButton.appendChild(plusIcon);

  const addButtonText = document.createElement('span');
  addButtonText.textContent = 'Přidat novou adresu';
  addButton.appendChild(addButtonText);

  addButton.addEventListener('click', (e) => {
    e.stopPropagation();
    onAddNew();
    toggleExpanded();
  });

  dropdownInner.appendChild(addButton);
  dropdown.appendChild(dropdownInner);

  // Assemble
  selector.appendChild(selectedHeader);
  selector.appendChild(dropdown);

  return selector;
};
