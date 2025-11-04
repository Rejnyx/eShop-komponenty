import { createLoginForm } from './LoginForm.js';
import '../../tokens/tokens.css';
import '../../styles/reset.css';

export default {
  title: 'Components/LoginForm',
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
    onSubmit: { action: 'submitted' },
    onGoogleLogin: { action: 'google-login' },
    onAppleLogin: { action: 'apple-login' },
    onForgotPassword: { action: 'forgot-password' },
  },
  parameters: {
    layout: 'centered',
  },
};

// Default Login Form
export const Default = {
  render: (args) => createLoginForm(args),
};

// On Light Background
export const OnLightBackground = {
  parameters: {
    backgrounds: { default: 'light' },
  },
  render: (args) => createLoginForm(args),
};

// On White Background
export const OnWhiteBackground = {
  parameters: {
    backgrounds: { default: 'white' },
  },
  render: (args) => createLoginForm(args),
};

// Mobile View
export const MobileView = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.width = '375px';
    wrapper.style.padding = '16px';
    wrapper.appendChild(createLoginForm(args));
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
    wrapper.appendChild(createLoginForm(args));
    return wrapper;
  },
};
