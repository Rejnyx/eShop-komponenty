import './TagSelector.css';
import { createElement } from 'lucide';
import ChevronDown from 'lucide/dist/esm/icons/chevron-down';
import X from 'lucide/dist/esm/icons/x';
import Leaf from 'lucide/dist/esm/icons/leaf';

/**
 * Tag types s barvami a ikonami
 */
const TAG_TYPES = {
  vegetarian: {
    label: 'Vegetarián',
    color: 'green',
    icon: 'leaf',
  },
  vegan: {
    label: 'Veganské',
    color: 'green',
    icon: 'leaf',
  },
  glutenFree: {
    label: 'Bezlepkové',
    color: 'blue',
    icon: 'leaf',
  },
  favorite: {
    label: 'Oblíbené',
    color: 'yellow',
    icon: 'star',
  },
};

/**
 * Vytvoří TagSelector element
 * @param {Object} props - Vlastnosti tag selectoru
 * @param {string} props.placeholder - Placeholder text
 * @param {Array<string>} props.selectedTags - Pole vybraných tag IDs
 * @param {Array<Object>} props.availableTags - Dostupné tagy [{id, type}, ...]
 * @param {boolean} props.error - Error stav
 * @param {string} props.errorMessage - Chybová zpráva
 * @param {boolean} props.disabled - Zakázaný selector
 * @param {Function} props.onChange - Change handler (vrací array vybraných tag IDs)
 * @returns {HTMLElement} TagSelector wrapper element
 */
export const createTagSelector = ({
  placeholder = 'Štítky',
  selectedTags = [],
  availableTags = Object.keys(TAG_TYPES).map(id => ({ id, type: id })),
  error = false,
  errorMessage = '',
  disabled = false,
  onChange,
} = {}) => {
  let isExpanded = false;
  let currentSelectedTags = [...selectedTags];

  // Wrapper
  const wrapper = document.createElement('div');
  const classes = ['tag-selector'];
  if (disabled) classes.push('tag-selector--disabled');
  wrapper.className = classes.join(' ');

  // Main container (input-like)
  const container = document.createElement('button');
  container.type = 'button';
  container.className = 'tag-selector__container';
  container.disabled = disabled;
  if (error) container.classList.add('tag-selector__container--error');

  // Content area (label nebo selected tags)
  const contentArea = document.createElement('div');
  contentArea.className = 'tag-selector__content';

  const updateContentArea = () => {
    contentArea.innerHTML = '';

    if (currentSelectedTags.length === 0) {
      // Show placeholder
      const placeholderEl = document.createElement('span');
      placeholderEl.className = 'tag-selector__placeholder';
      placeholderEl.textContent = placeholder;
      contentArea.appendChild(placeholderEl);
    } else {
      // Show selected tags
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'tag-selector__selected-tags';

      currentSelectedTags.forEach(tagId => {
        const tagType = TAG_TYPES[tagId];
        if (!tagType) return;

        const tagBadge = document.createElement('span');
        tagBadge.className = `tag-selector__tag tag-selector__tag--${tagType.color}`;

        // Icon
        const iconSpan = document.createElement('span');
        iconSpan.className = 'tag-selector__tag-icon';
        iconSpan.innerHTML = getTagIcon(tagType.icon);
        tagBadge.appendChild(iconSpan);

        // Label
        const labelSpan = document.createElement('span');
        labelSpan.textContent = tagType.label;
        tagBadge.appendChild(labelSpan);

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'tag-selector__tag-remove';
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          currentSelectedTags = currentSelectedTags.filter(id => id !== tagId);
          updateContentArea();
          if (onChange) onChange(currentSelectedTags);
        });

        const removeIcon = createElement(X);
        removeBtn.appendChild(removeIcon);

        tagBadge.appendChild(removeBtn);
        tagsContainer.appendChild(tagBadge);
      });

      contentArea.appendChild(tagsContainer);
    }
  };

  updateContentArea();
  container.appendChild(contentArea);

  // Chevron icon
  const chevronContainer = document.createElement('div');
  chevronContainer.className = 'tag-selector__chevron';
  const chevron = createElement(ChevronDown);
  chevronContainer.appendChild(chevron);
  container.appendChild(chevronContainer);

  // Dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'tag-selector__dropdown';

  const dropdownInner = document.createElement('div');
  dropdownInner.className = 'tag-selector__dropdown-inner';

  // Create dropdown items
  availableTags.forEach(({ id, type }) => {
    const tagType = TAG_TYPES[type || id];
    if (!tagType) return;

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'tag-selector__item';

    // Icon
    const iconSpan = document.createElement('span');
    iconSpan.className = `tag-selector__item-icon tag-selector__item-icon--${tagType.color}`;
    iconSpan.innerHTML = getTagIcon(tagType.icon);
    item.appendChild(iconSpan);

    // Label
    const label = document.createElement('span');
    label.className = 'tag-selector__item-label';
    label.textContent = tagType.label;
    item.appendChild(label);

    // Checkmark
    const checkmark = document.createElement('span');
    checkmark.className = 'tag-selector__item-checkmark';
    item.appendChild(checkmark);

    // Update checked state
    const updateItemState = () => {
      if (currentSelectedTags.includes(id)) {
        item.classList.add('tag-selector__item--selected');
      } else {
        item.classList.remove('tag-selector__item--selected');
      }
    };
    updateItemState();

    // Click handler
    item.addEventListener('click', (e) => {
      e.stopPropagation();

      if (currentSelectedTags.includes(id)) {
        currentSelectedTags = currentSelectedTags.filter(tagId => tagId !== id);
      } else {
        currentSelectedTags.push(id);
      }

      updateItemState();
      updateContentArea();

      if (onChange) onChange(currentSelectedTags);
    });

    dropdownInner.appendChild(item);
  });

  dropdown.appendChild(dropdownInner);

  wrapper.appendChild(container);
  wrapper.appendChild(dropdown);

  // Toggle dropdown
  container.addEventListener('click', () => {
    if (disabled) return;

    isExpanded = !isExpanded;

    if (isExpanded) {
      wrapper.classList.add('tag-selector--expanded');
    } else {
      wrapper.classList.remove('tag-selector--expanded');
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target) && isExpanded) {
      isExpanded = false;
      wrapper.classList.remove('tag-selector--expanded');
    }
  });

  // Error message
  if (error && errorMessage) {
    const errorEl = document.createElement('div');
    errorEl.className = 'tag-selector__error-message';
    errorEl.textContent = errorMessage;
    wrapper.appendChild(errorEl);
  }

  return wrapper;
};

/**
 * Helper pro ikony štítků
 */
function getTagIcon(iconName) {
  const icons = {
    leaf: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  };

  return icons[iconName] || icons.leaf;
}

export { TAG_TYPES };
