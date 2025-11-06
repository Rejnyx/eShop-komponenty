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

  // Google button - vlastní implementace pro OAuth s ikonou
  const googleButton = document.createElement('button');
  googleButton.className = 'btn btn--secondary btn--full-width registration-form__oauth-button';
  googleButton.type = 'button';

  const googleIcon = document.createElement('img');
  googleIcon.src = '../../../pics/Google_G_Icon.svg';
  googleIcon.alt = '';
  googleIcon.className = 'registration-form__oauth-icon';

  const googleLabel = document.createElement('span');
  googleLabel.className = 'btn__label';
  googleLabel.textContent = 'Přihlásit se pomocí Googlu';

  googleButton.appendChild(googleIcon);
  googleButton.appendChild(googleLabel);

  if (onGoogleLogin) {
    googleButton.addEventListener('click', onGoogleLogin);
  }

  // Apple button - vlastní implementace pro OAuth s ikonou
  const appleButton = document.createElement('button');
  appleButton.className = 'btn btn--secondary btn--full-width registration-form__oauth-button';
  appleButton.type = 'button';

  const appleIcon = document.createElement('img');
  appleIcon.src = '../../../pics/Apple.svg';
  appleIcon.alt = '';
  appleIcon.className = 'registration-form__oauth-icon';

  const appleLabel = document.createElement('span');
  appleLabel.className = 'btn__label';
  appleLabel.textContent = 'Přihlásit se pomocí Apple';

  appleButton.appendChild(appleIcon);
  appleButton.appendChild(appleLabel);

  if (onAppleLogin) {
    appleButton.addEventListener('click', onAppleLogin);
  }

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
