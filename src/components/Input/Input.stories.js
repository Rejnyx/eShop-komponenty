import { createInput } from './Input.js';
import '../../tokens/tokens.css';
import '../../styles/reset.css';

export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email'],
    },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    showPasswordToggle: { control: 'boolean' },
    onInput: { action: 'input' },
    onChange: { action: 'change' },
  },
};

// Text Input
export const Text = {
  args: {
    type: 'text',
    placeholder: 'Zadejte text',
  },
  render: (args) => createInput(args),
};

// Email Input
export const Email = {
  args: {
    type: 'email',
    placeholder: 'E-mail',
  },
  render: (args) => createInput(args),
};

// Password Input s toggle
export const Password = {
  args: {
    type: 'password',
    placeholder: 'Heslo',
    showPasswordToggle: true,
  },
  render: (args) => createInput(args),
};

// Error State
export const WithError = {
  args: {
    type: 'email',
    placeholder: 'E-mail',
    value: 'invalid-email',
    error: true,
    errorMessage: 'Neplatný formát e-mailu',
  },
  render: (args) => createInput(args),
};

// Disabled
export const Disabled = {
  args: {
    type: 'text',
    placeholder: 'Zakázaný input',
    disabled: true,
  },
  render: (args) => createInput(args),
};

// With Value
export const WithValue = {
  args: {
    type: 'text',
    placeholder: 'Jméno',
    value: 'Jan Novák',
  },
  render: (args) => createInput(args),
};
