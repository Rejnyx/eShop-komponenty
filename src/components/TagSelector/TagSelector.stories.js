import { createTagSelector, TAG_TYPES } from './TagSelector.js';

export default {
  title: 'Components/TagSelector',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    selectedTags: {
      control: 'object',
      description: 'Pole vybraných tag IDs',
    },
    error: {
      control: 'boolean',
      description: 'Error stav',
    },
    errorMessage: {
      control: 'text',
      description: 'Chybová zpráva',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled stav',
    },
  },
};

export const Default = {
  args: {
    placeholder: 'Vyberte štítky',
    selectedTags: [],
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const tagSelector = createTagSelector({
      ...args,
      onChange: (tags) => {
        console.log('Selected tags:', tags);
        console.log('Tag labels:', tags.map(id => TAG_TYPES[id]?.label));
      },
    });

    container.appendChild(tagSelector);
    return container;
  },
};

export const WithSelectedTags = {
  args: {
    placeholder: 'Štítky',
    selectedTags: ['vegetarian', 'favorite'],
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const tagSelector = createTagSelector({
      ...args,
      onChange: (tags) => console.log('Selected tags:', tags),
    });

    container.appendChild(tagSelector);
    return container;
  },
};

export const WithError = {
  args: {
    placeholder: 'Vyberte štítky',
    selectedTags: [],
    error: true,
    errorMessage: 'Vyberte alespoň jeden štítek',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const tagSelector = createTagSelector(args);

    container.appendChild(tagSelector);
    return container;
  },
};

export const Disabled = {
  args: {
    placeholder: 'Štítky',
    selectedTags: ['vegetarian'],
    disabled: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const tagSelector = createTagSelector(args);

    container.appendChild(tagSelector);
    return container;
  },
};

export const AllTagsSelected = {
  args: {
    placeholder: 'Štítky',
    selectedTags: ['vegetarian', 'vegan', 'glutenFree', 'favorite'],
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const tagSelector = createTagSelector({
      ...args,
      onChange: (tags) => console.log('Selected tags:', tags),
    });

    container.appendChild(tagSelector);
    return container;
  },
};

export const InForm = {
  render: () => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    // Label
    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.marginBottom = '8px';
    label.style.fontWeight = 'bold';
    label.textContent = 'Dietní preference';

    // TagSelector
    const tagSelector = createTagSelector({
      placeholder: 'Vyberte vaše preference',
      selectedTags: [],
      onChange: (tags) => {
        console.log('Form tags updated:', tags);
      },
    });

    container.appendChild(label);
    container.appendChild(tagSelector);
    return container;
  },
};
