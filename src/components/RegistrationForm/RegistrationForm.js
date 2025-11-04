import './RegistrationForm.css';
import { createInput } from '../Input/Input.js';
import { createButton } from '../Button/Button.js';
import { createCheckbox } from '../Checkbox/Checkbox.js';
import { createElement } from 'lucide';
import X from 'lucide/dist/esm/icons/x';

/**
 * Vytvoří Registration Form
 * @param {Object} props - Vlastnosti formuláře
 * @param {Function} props.onClose - Handler pro zavření formuláře
 * @param {Function} props.onSubmit - Handler pro odeslání formuláře
 * @param {Function} props.onGoogleLogin - Handler pro Google login
 * @param {Function} props.onAppleLogin - Handler pro Apple login
 * @returns {HTMLElement} Registration form element
 */
export const createRegistrationForm = ({
  onClose,
  onSubmit,
  onGoogleLogin,
  onAppleLogin,
} = {}) => {
  // Main wrapper
  const form = document.createElement('div');
  form.className = 'registration-form';

  // Header
  const header = document.createElement('div');
  header.className = 'registration-form__header';

  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'registration-form__close';
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
  titleWrapper.className = 'registration-form__title-wrapper';

  const title = document.createElement('h2');
  title.className = 'registration-form__title';
  title.textContent = 'Registrace';

  titleWrapper.appendChild(title);
  header.appendChild(closeButton);
  header.appendChild(titleWrapper);

  // Fields section
  const fields = document.createElement('div');
  fields.className = 'registration-form__fields';

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

  // Checkbox s podmínkami
  const termsCheckbox = createCheckbox({
    label: 'Souhlasím se <a href="#" onclick="event.preventDefault()">smluvními podmínkami</a>',
  });

  const checkboxWrapper = document.createElement('div');
  checkboxWrapper.className = 'registration-form__checkbox-wrapper';
  checkboxWrapper.appendChild(termsCheckbox);

  fields.appendChild(emailInput);
  fields.appendChild(passwordInput);
  fields.appendChild(checkboxWrapper);

  // Submit button
  const submitButton = createButton({
    label: 'Registrovat se',
    variant: 'primary',
    fullWidth: true,
    onClick: (e) => {
      if (onSubmit) {
        const email = emailInput.querySelector('.input__field').value;
        const password = passwordInput.querySelector('.input__field').value;
        const termsAccepted = termsCheckbox.querySelector('.checkbox__input').checked;
        onSubmit({ email, password, termsAccepted });
      }
    },
  });
  submitButton.classList.add('registration-form__submit');

  // Divider
  const divider = document.createElement('div');
  divider.className = 'registration-form__divider';
  divider.textContent = 'nebo';

  // OAuth buttons section
  const oauth = document.createElement('div');
  oauth.className = 'registration-form__oauth';

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
  footer.className = 'registration-form__footer';

  const footerText = document.createElement('div');
  footerText.className = 'registration-form__footer-text';
  footerText.textContent = 'Tuto službu provozuje';

  const footerLogo = document.createElement('img');
  footerLogo.className = 'registration-form__footer-logo';
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
