import './LoginForm.css';
import { createInput } from '../Input/Input.js';
import { createButton } from '../Button/Button.js';
import { createElement } from 'lucide';
import X from 'lucide/dist/esm/icons/x';

/**
 * Vytvoří Login Form
 * @param {Object} props - Vlastnosti formuláře
 * @param {Function} props.onClose - Handler pro zavření formuláře
 * @param {Function} props.onSubmit - Handler pro odeslání formuláře
 * @param {Function} props.onGoogleLogin - Handler pro Google login
 * @param {Function} props.onAppleLogin - Handler pro Apple login
 * @param {Function} props.onForgotPassword - Handler pro zapomenuté heslo
 * @returns {HTMLElement} Login form element
 */
export const createLoginForm = ({
  onClose,
  onSubmit,
  onGoogleLogin,
  onAppleLogin,
  onForgotPassword,
} = {}) => {
  // Main wrapper
  const form = document.createElement('div');
  form.className = 'login-form';

  // Header
  const header = document.createElement('div');
  header.className = 'login-form__header';

  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'login-form__close';
  closeButton.setAttribute('aria-label', 'Zavřít');
  const closeIcon = createElement(X);
  closeIcon.setAttribute('width', '24');
  closeIcon.setAttribute('height', '24');
  closeIcon.setAttribute('stroke-width', '1.5');
  closeButton.appendChild(closeIcon);
  if (onClose) {
    closeButton.addEventListener('click', onClose);
  }

  // Title wrapper
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'login-form__title-wrapper';

  const title = document.createElement('h2');
  title.className = 'login-form__title';
  title.textContent = 'Přihlášení';

  titleWrapper.appendChild(title);
  header.appendChild(closeButton);
  header.appendChild(titleWrapper);

  // Fields section
  const fields = document.createElement('div');
  fields.className = 'login-form__fields';

  // Email input
  const emailInput = createInput({
    type: 'email',
    placeholder: 'E-mail',
  });

  // Password input with toggle
  const passwordInput = createInput({
    type: 'password',
    placeholder: 'Heslo',
    showPasswordToggle: true,
  });

  fields.appendChild(emailInput);
  fields.appendChild(passwordInput);

  // Forgot password link
  if (onForgotPassword) {
    const forgotPassword = document.createElement('a');
    forgotPassword.className = 'login-form__forgot-password';
    forgotPassword.href = '#';
    forgotPassword.textContent = 'Zapomněli jste heslo?';
    forgotPassword.addEventListener('click', (e) => {
      e.preventDefault();
      onForgotPassword();
    });
    fields.appendChild(forgotPassword);
  }

  // Submit button
  const submitButton = createButton({
    label: 'Přihlásit se',
    variant: 'primary',
    fullWidth: true,
    onClick: (e) => {
      if (onSubmit) {
        const email = emailInput.querySelector('.input__field').value;
        const password = passwordInput.querySelector('.input__field').value;
        onSubmit({ email, password });
      }
    },
  });
  submitButton.classList.add('login-form__submit');

  // Divider
  const divider = document.createElement('div');
  divider.className = 'login-form__divider';
  divider.textContent = 'nebo';

  // OAuth buttons section
  const oauth = document.createElement('div');
  oauth.className = 'login-form__oauth';

  const googleButton = createButton({
    label: 'Přihlásit se pomocí Googlu',
    variant: 'secondary',
    size: 'large',
    fullWidth: true,
    icon: '../../../pics/Google_G_Icon.svg',
    onClick: onGoogleLogin,
  });

  const appleButton = createButton({
    label: 'Přihlásit se pomocí Apple',
    variant: 'secondary',
    size: 'large',
    fullWidth: true,
    icon: '../../../pics/Apple.svg',
    onClick: onAppleLogin,
  });

  oauth.appendChild(googleButton);
  oauth.appendChild(appleButton);

  // Footer
  const footer = document.createElement('div');
  footer.className = 'login-form__footer';

  const footerText = document.createElement('div');
  footerText.className = 'login-form__footer-text';
  footerText.textContent = 'Tuto službu provozuje';

  const footerLogo = document.createElement('img');
  footerLogo.className = 'login-form__footer-logo';
  footerLogo.src = '../../../pics/orderMage logo.png';
  footerLogo.alt = 'OrderMage';

  footer.appendChild(footerText);
  footer.appendChild(footerLogo);

  // Compose all sections
  form.appendChild(header);
  form.appendChild(fields);
  form.appendChild(submitButton);
  form.appendChild(divider);
  form.appendChild(oauth);
  form.appendChild(footer);

  return form;
};
