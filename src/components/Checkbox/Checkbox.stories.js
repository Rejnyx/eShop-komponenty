import { createCheckbox } from './Checkbox.js';
import '../../tokens/tokens.css';
import '../../styles/reset.css';

export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

// Default Unchecked
export const Default = {
  args: {
    label: 'Souhlasím s podmínkami',
  },
  render: (args) => createCheckbox(args),
};

// Checked
export const Checked = {
  args: {
    label: 'Souhlasím s podmínkami',
    checked: true,
  },
  render: (args) => createCheckbox(args),
};

// With Link (HTML v labelu)
export const WithLink = {
  args: {
    label: 'Souhlasím se <a href="#">smluvními podmínkami</a>',
  },
  render: (args) => createCheckbox(args),
};

// Disabled Unchecked
export const DisabledUnchecked = {
  args: {
    label: 'Zakázaný checkbox',
    disabled: true,
  },
  render: (args) => createCheckbox(args),
};

// Disabled Checked
export const DisabledChecked = {
  args: {
    label: 'Zakázaný zaškrtnutý',
    checked: true,
    disabled: true,
  },
  render: (args) => createCheckbox(args),
};

// Long Label
export const LongLabel = {
  args: {
    label: 'Souhlasím se zpracováním osobních údajů a marketingovou komunikací v souladu s GDPR',
    checked: false,
  },
  render: (args) => createCheckbox(args),
};
