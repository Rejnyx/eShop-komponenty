import { createTermsModal } from './TermsModal.js';
import '../../tokens/tokens.css';
import '../../styles/reset.css';

export default {
  title: 'Components/TermsModal',
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
    onAccept: { action: 'accepted' },
  },
  parameters: {
    layout: 'centered',
  },
};

// Default Terms Modal
export const Default = {
  render: (args) => createTermsModal(args),
};

// With Long Content (demonstrating scroll)
export const WithLongContent = {
  render: (args) => {
    const longContent = `Prodávající a provozovatel pro oblast Frýdek-Místek a okolí: CartelFM s.r.o. se sídlem Fryčovice 774, 739 45, IČ: 11693827, vedená pod sp.zn. 86505 C u Krajského soudu v Ostravě, kontaktní údaje: +420 722 808 606, dále jen jako „Cartel Pizza Frýdek-Místek" nebo „Cartel Pizza FM".

V případě, že se podmínky vztahují na všechny prodávající (provozovatele), jsou v podmínkách označeni jako Cartel Pizza.

Kupující – fyzická nebo právnická osoba, která si objednala zboží (potraviny a nápoje) a jeho dovoz přes internetový obchod http://www.cartelpizza.cz prostřednictvím elektronického formuláře, specifikovaná údaji, které zadala v objednávce v internetovém formuláři, případně jiným z níže uvedených způsobů.

Spotřebitel – kupující fyzická osoba, která je člověk, který mimo rámec své podnikatelské činnosti nebo mimo rámec samostatného výkonu svého povolání uzavírá smlouvu s Cartel Pizza FM nebo s ním jinak jedná.

Strana smlouvy nebo také účastník smlouvy – Cartel pizza FM nebo kupující.

Další text podmínek pro demonstraci scrollování...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`;

    return createTermsModal({
      ...args,
      content: longContent,
    });
  },
};

// On Light Background
export const OnLightBackground = {
  parameters: {
    backgrounds: { default: 'light' },
  },
  render: (args) => createTermsModal(args),
};

// On White Background
export const OnWhiteBackground = {
  parameters: {
    backgrounds: { default: 'white' },
  },
  render: (args) => createTermsModal(args),
};

// Mobile View
export const MobileView = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.width = '375px';
    wrapper.style.padding = '16px';
    wrapper.appendChild(createTermsModal(args));
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
    wrapper.appendChild(createTermsModal(args));
    return wrapper;
  },
};
