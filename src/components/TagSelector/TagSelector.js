import './TagSelector.css';
import { createElement } from 'lucide';
import ChevronDown from 'lucide/dist/esm/icons/chevron-down';
import X from 'lucide/dist/esm/icons/x';
import Leaf from 'lucide/dist/esm/icons/leaf';
import Star from 'lucide/dist/esm/icons/star';
import Check from 'lucide/dist/esm/icons/check';

/**
 * Tag types s barvami a ikonami
 */
const TAG_TYPES = {
  vegetarian: {
    label: 'Vegetarián',
    color: 'green',
    icon: Leaf,
  },
  vegan: {
    label: 'Veganské',
    color: 'green',
    icon: Leaf,
  },
  glutenFree: {
    label: 'Bezlepkové',
    color: 'blue',
    icon: Leaf,
  },
  favorite: {
    label: 'Oblíbené',
    color: 'yellow',
    icon: Star,
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
        iconSpan.appendChild(createElement(tagType.icon));
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
    iconSpan.appendChild(createElement(tagType.icon));
    item.appendChild(iconSpan);

    // Label
    const label = document.createElement('span');
    label.className = 'tag-selector__item-label';
    label.textContent = tagType.label;
    item.appendChild(label);

    // Checkmark
    const checkmark = createElement(Check);
    checkmark.setAttribute('class', 'tag-selector__item-checkmark');
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

export { TAG_TYPES };
