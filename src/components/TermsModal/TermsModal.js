import './TermsModal.css';
import { createButton } from '../Button/Button.js';
import { createElement } from 'lucide';
import X from 'lucide/dist/esm/icons/x';

/**
 * Vytvoří Terms Modal - modální okno s obchodními podmínkami
 * @param {Object} props - Vlastnosti modalu
 * @param {Function} props.onClose - Handler pro zavření modalu
 * @param {Function} props.onAccept - Handler pro přijetí podmínek
 * @param {string} props.content - Text obchodních podmínek (volitelné)
 * @returns {HTMLElement} Terms modal element
 */
export const createTermsModal = ({
  onClose,
  onAccept,
  content = `Prodávající a provozovatel pro oblast Frýdek-Místek a okolí: CartelFM s.r.o. se sídlem Fryčovice 774, 739 45, IČ: 11693827, vedená pod sp.zn. 86505 C u Krajského soudu v Ostravě, kontaktní údaje: +420 722 808 606, dále jen jako „Cartel Pizza Frýdek-Místek" nebo „Cartel Pizza FM".

V případě, že se podmínky vztahují na všechny prodávající (provozovatele), jsou v podmínkách označeni jako Cartel Pizza.

Kupující – fyzická nebo právnická osoba, která si objednala zboží (potraviny a nápoje) a jeho dovoz přes internetový obchod http://www.cartelpizza.cz prostřednictvím elektronického formuláře, specifikovaná údaji, které zadala v objednávce v internetovém formuláři, případně jiným z níže uvedených způsobů.

Spotřebitel – kupující fyzická osoba, která je člověk, který mimo rámec své podnikatelské činnosti nebo mimo rámec samostatného výkonu svého povolání uzavírá smlouvu s Cartel Pizza FM nebo s ním jinak jedná.

Strana smlouvy nebo také účastník smlouvy – Cartel pizza FM nebo kupující.`,
} = {}) => {
  // Main wrapper
  const modal = document.createElement('div');
  modal.className = 'terms-modal';

  // Header
  const header = document.createElement('div');
  header.className = 'terms-modal__header';

  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'terms-modal__close';
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
  titleWrapper.className = 'terms-modal__title-wrapper';

  const title = document.createElement('h2');
  title.className = 'terms-modal__title';
  title.textContent = 'Obchodní podmínky';

  titleWrapper.appendChild(title);
  header.appendChild(closeButton);
  header.appendChild(titleWrapper);

  // Content section (scrollovatelný)
  const contentSection = document.createElement('div');
  contentSection.className = 'terms-modal__content';

  const contentText = document.createElement('div');
  contentText.className = 'terms-modal__text';
  contentText.textContent = content;

  contentSection.appendChild(contentText);

  // Accept button
  const acceptButton = createButton({
    label: 'Souhlasím a přijímám',
    variant: 'primary',
    fullWidth: true,
    onClick: (e) => {
      if (onAccept) {
        onAccept();
      }
    },
  });
  acceptButton.classList.add('terms-modal__accept');

  // Footer
  const footer = document.createElement('div');
  footer.className = 'terms-modal__footer';

  const footerText = document.createElement('div');
  footerText.className = 'terms-modal__footer-text';
  footerText.textContent = 'Tuto službu provozuje';

  const footerLogo = document.createElement('img');
  footerLogo.className = 'terms-modal__footer-logo';
  footerLogo.src = '../../../pics/orderMage logo.png';
  footerLogo.alt = 'OrderMage';

  footer.appendChild(footerText);
  footer.appendChild(footerLogo);

  // Compose all sections
  modal.appendChild(header);
  modal.appendChild(contentSection);
  modal.appendChild(acceptButton);
  modal.appendChild(footer);

  return modal;
};
