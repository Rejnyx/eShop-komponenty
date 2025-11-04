import { createRegistrationForm } from './RegistrationForm.js';
import '../../tokens/tokens.css';
import '../../styles/reset.css';

export default {
  title: 'Components/RegistrationForm',
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
    onSubmit: { action: 'submitted' },
    onGoogleLogin: { action: 'google-login' },
    onAppleLogin: { action: 'apple-login' },
  },
  parameters: {
    layout: 'centered',
  },
};

// Default Registration Form
export const Default = {
  render: (args) => createRegistrationForm(args),
};

// On Light Background
export const OnLightBackground = {
  parameters: {
    backgrounds: { default: 'light' },
  },
  render: (args) => createRegistrationForm(args),
};

// On White Background
export const OnWhiteBackground = {
  parameters: {
    backgrounds: { default: 'white' },
  },
  render: (args) => createRegistrationForm(args),
};

// Mobile View (s wrapper pro simulaci mobilní šířky)
export const MobileView = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.width = '375px';
    wrapper.style.padding = '16px';
    wrapper.appendChild(createRegistrationForm(args));
    return wrapper;
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Tablet View
export const TabletView = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.width = '768px';
    wrapper.style.padding = '20px';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.appendChild(createRegistrationForm(args));
    return wrapper;
  },
};
