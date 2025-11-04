import { createBadge, availableIcons } from './Badge.js';
import '../../tokens/tokens.css';
import '../../styles/reset.css';

export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text zobrazený v badge',
    },
    variant: {
      control: 'select',
      options: ['yellow', 'red', 'green', 'blue'],
      description: 'Barevná varianta badge',
    },
    style: {
      control: 'select',
      options: ['outline', 'filled'],
      description: 'Styl badge (outline = průhledný, filled = plný)',
    },
    icon: {
      control: 'select',
      options: availableIcons,
      description: 'Ikona zobrazená v badge',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

// Default Badge - Yellow s hvězdičkou
export const Default = {
  args: {
    label: 'Oblíbené',
    variant: 'yellow',
    icon: 'star',
  },
  render: (args) => createBadge(args),
};

// Yellow Variants
export const YellowWithStar = {
  args: {
    label: 'Oblíbené',
    variant: 'yellow',
    icon: 'star',
  },
  render: (args) => createBadge(args),
};

export const YellowWithHeart = {
  args: {
    label: 'Populární',
    variant: 'yellow',
    icon: 'heart',
  },
  render: (args) => createBadge(args),
};

// Red Variants
export const RedWithAlert = {
  args: {
    label: 'Upozornění',
    variant: 'red',
    icon: 'alert-circle',
  },
  render: (args) => createBadge(args),
};

export const RedWithHeart = {
  args: {
    label: 'Vyprodáno',
    variant: 'red',
    icon: 'heart',
  },
  render: (args) => createBadge(args),
};

// Green Variants
export const GreenWithCheck = {
  args: {
    label: 'Skladem',
    variant: 'green',
    icon: 'check-circle',
  },
  render: (args) => createBadge(args),
};

export const GreenWithStar = {
  args: {
    label: 'Doporučené',
    variant: 'green',
    icon: 'star',
  },
  render: (args) => createBadge(args),
};

// Blue Variants
export const BlueWithInfo = {
  args: {
    label: 'Informace',
    variant: 'blue',
    icon: 'info',
  },
  render: (args) => createBadge(args),
};

export const BlueWithStar = {
  args: {
    label: 'Novinka',
    variant: 'blue',
    icon: 'star',
  },
  render: (args) => createBadge(args),
};

// Filled Variants
export const FilledYellow = {
  args: {
    label: 'Oblíbené',
    variant: 'yellow',
    style: 'filled',
    icon: 'star',
  },
  render: (args) => createBadge(args),
};

export const FilledRed = {
  args: {
    label: 'Vyprodáno',
    variant: 'red',
    style: 'filled',
    icon: 'alert-circle',
  },
  render: (args) => createBadge(args),
};

export const FilledGreen = {
  args: {
    label: 'Skladem',
    variant: 'green',
    style: 'filled',
    icon: 'check-circle',
  },
  render: (args) => createBadge(args),
};

export const FilledBlue = {
  args: {
    label: 'Novinka',
    variant: 'blue',
    style: 'filled',
    icon: 'info',
  },
  render: (args) => createBadge(args),
};

// All Colors - Outline vs Filled Comparison
export const AllColorsComparison = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '16px';

    // Outline row
    const outlineRow = document.createElement('div');
    outlineRow.style.display = 'flex';
    outlineRow.style.gap = '8px';
    outlineRow.style.flexWrap = 'wrap';

    const outlineTitle = document.createElement('div');
    outlineTitle.textContent = 'Outline:';
    outlineTitle.style.width = '100%';
    outlineTitle.style.fontWeight = 'bold';
    outlineTitle.style.fontSize = '12px';
    outlineRow.appendChild(outlineTitle);

    const outlineBadges = [
      createBadge({ label: 'Oblíbené', variant: 'yellow', style: 'outline', icon: 'star' }),
      createBadge({ label: 'Upozornění', variant: 'red', style: 'outline', icon: 'alert-circle' }),
      createBadge({ label: 'Skladem', variant: 'green', style: 'outline', icon: 'check-circle' }),
      createBadge({ label: 'Novinka', variant: 'blue', style: 'outline', icon: 'info' }),
    ];
    outlineBadges.forEach((badge) => outlineRow.appendChild(badge));

    // Filled row
    const filledRow = document.createElement('div');
    filledRow.style.display = 'flex';
    filledRow.style.gap = '8px';
    filledRow.style.flexWrap = 'wrap';

    const filledTitle = document.createElement('div');
    filledTitle.textContent = 'Filled:';
    filledTitle.style.width = '100%';
    filledTitle.style.fontWeight = 'bold';
    filledTitle.style.fontSize = '12px';
    filledRow.appendChild(filledTitle);

    const filledBadges = [
      createBadge({ label: 'Oblíbené', variant: 'yellow', style: 'filled', icon: 'star' }),
      createBadge({ label: 'Upozornění', variant: 'red', style: 'filled', icon: 'alert-circle' }),
      createBadge({ label: 'Skladem', variant: 'green', style: 'filled', icon: 'check-circle' }),
      createBadge({ label: 'Novinka', variant: 'blue', style: 'filled', icon: 'info' }),
    ];
    filledBadges.forEach((badge) => filledRow.appendChild(badge));

    wrapper.appendChild(outlineRow);
    wrapper.appendChild(filledRow);
    return wrapper;
  },
};

// All Icons
export const AllIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.gap = '8px';
    wrapper.style.flexWrap = 'wrap';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'flex-start';

    availableIcons.forEach((icon) => {
      const badge = createBadge({
        label: icon,
        variant: 'yellow',
        icon: icon,
      });
      wrapper.appendChild(badge);
    });

    return wrapper;
  },
};
