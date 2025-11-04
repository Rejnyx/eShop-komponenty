import { createButton } from './Button.js';

// Import design tokens a reset
import '../../tokens/tokens.css';
import '../../styles/reset.css';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'large'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

// Default Primary Button
export const Primary = {
  args: {
    label: 'Registrovat se',
    variant: 'primary',
    size: 'default',
  },
  render: (args) => createButton(args),
};

// Secondary Button (outline)
export const Secondary = {
  args: {
    label: 'Zrušit',
    variant: 'secondary',
    size: 'default',
  },
  render: (args) => createButton(args),
};

// Large Primary
export const LargePrimary = {
  args: {
    label: 'Přihlásit se pomocí Googlu',
    variant: 'primary',
    size: 'large',
  },
  render: (args) => createButton(args),
};

// Large Secondary (OAuth buttons)
export const LargeSecondary = {
  args: {
    label: 'Přihlásit se pomocí Apple',
    variant: 'secondary',
    size: 'large',
  },
  render: (args) => createButton(args),
};

// Full Width
export const FullWidth = {
  args: {
    label: 'Registrovat se',
    variant: 'primary',
    fullWidth: true,
  },
  render: (args) => createButton(args),
};

// Disabled State
export const Disabled = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
  render: (args) => createButton(args),
};
