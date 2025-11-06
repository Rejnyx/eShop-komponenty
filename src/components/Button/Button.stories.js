import { createButton } from './Button.js';
import ChevronRight from 'lucide/dist/esm/icons/chevron-right';
import ChevronLeft from 'lucide/dist/esm/icons/chevron-left';
import Search from 'lucide/dist/esm/icons/search';
import ShoppingCart from 'lucide/dist/esm/icons/shopping-cart';

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
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    onClick: { action: 'clicked' },
  },
};

// Default Primary Button
export const Primary = {
  args: {
    label: 'Registrovat se',
    variant: 'primary',
  },
  render: (args) => createButton(args),
};

// Secondary Button (outline)
export const Secondary = {
  args: {
    label: 'Zrušit',
    variant: 'secondary',
  },
  render: (args) => createButton(args),
};

// Button s ikonou vlevo
export const WithIconLeft = {
  args: {
    label: 'Hledat',
    variant: 'primary',
  },
  render: (args) => createButton({
    ...args,
    icon: Search,
    iconPosition: 'left',
  }),
};

// Button s ikonou vpravo
export const WithIconRight = {
  args: {
    label: 'Pokračovat',
    variant: 'primary',
  },
  render: (args) => createButton({
    ...args,
    icon: ChevronRight,
    iconPosition: 'right',
  }),
};

// Secondary s ikonou
export const SecondaryWithIcon = {
  args: {
    label: 'Zpět',
    variant: 'secondary',
  },
  render: (args) => createButton({
    ...args,
    icon: ChevronLeft,
    iconPosition: 'left',
  }),
};

// Shopping cart button
export const ShoppingCartButton = {
  args: {
    label: 'Do košíku',
    variant: 'primary',
  },
  render: (args) => createButton({
    ...args,
    icon: ShoppingCart,
    iconPosition: 'left',
  }),
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
