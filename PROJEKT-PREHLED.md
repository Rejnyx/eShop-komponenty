# eShop Komponenty - Přehled Projektu

## 📋 Co je tento projekt?

Moderní knihovna HTML/CSS komponent pro eShop s kompletním design systémem, 100% responzivním designem a Storybook dokumentací.

---

## 🎨 Design System

### Design Tokeny (`src/tokens/tokens.css`)

**100% konzistence** - všechny komponenty používají pouze CSS custom properties z `tokens.css`.

#### Barvy
```css
--color-primary-brand: #ee6b1b     /* Hlavní oranžová */
--color-primary-hover: #b15014     /* Tmavší oranžová */
--color-white: #fff
--color-black: #212121
--color-grey-100 až --color-grey-900  /* Stupnice šedé */
--color-red: #f54900               /* Chybové stavy */
--color-overlay: rgb(0 0 0 / 50%)  /* Modal overlay */
```

#### Spacing
```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 12px
--spacing-lg: 16px
--spacing-xl: 20px
```

#### Ikony
```css
--icon-size-sm: 12px    /* Mini ikony */
--icon-size-md: 14px    /* Malé ikony */
--icon-size: 20px       /* Standardní */
--icon-size-lg: 24px    /* Velké ikony */
--icon-stroke: 1.5      /* Standardní tloušťka */
```

#### Border Radius
```css
--radius-badge: 8px     /* Mini boxy, badges */
--radius-md: 20px
--radius-lg: 30px
--radius-full: 50px     /* Kruhy */
```

---

## 🧩 Komponenty

### Základní Komponenty

#### Button (`src/components/Button/`)
- **Varianty**: `primary` (oranžová), `secondary` (outline)
- **Velikost**: Všechny 48px výška
- **Props**: `label`, `variant`, `fullWidth`, `disabled`, `onClick`

#### Input (`src/components/Input/`)
- **Typy**: `text`, `email`, `password` (s toggle)
- **Stavy**: normal, focus, error, disabled
- **Props**: `type`, `placeholder`, `value`, `error`, `errorMessage`, `onInput`

#### Checkbox (`src/components/Checkbox/`)
- **Vlastní vizuální styl** (ne native checkbox)
- **Props**: `label`, `checked`, `disabled`, `onChange`

#### DatePicker (`src/components/DatePicker/`)
- **HTML5 date input** s custom placeholderem
- **Oranžová ikona kalendáře** 🎯
- **Props**: `placeholder`, `value`, `min`, `max`, `onChange`

#### TagSelector (`src/components/TagSelector/`)
- **Multi-select dropdown** s barevnými badges
- **Typy**: vegetarian, vegan, glutenFree, favorite
- **Props**: `placeholder`, `selectedTags`, `availableTags`, `onChange`

### Komplexní Komponenty

#### AccountCard (`src/components/AccountCard/`)
- **Modal s uživatelským profilem**
- Obsahuje: ProfileHeader, AddressSelector, MenuItem, VIPBanner
- Plně responzivní (desktop → tablet → mobile bottom-sheet)

#### EditProfileModal (`src/components/EditProfileModal/`)
- **Modal pro úpravu profilu**
- Obsahuje všechny formulářové komponenty
- Konzistentní hlavička/patička s AccountCard
- Props: `profile`, `formData`, `onClose`, `onSave`

#### AddressSelector (`src/components/AccountCard/AddressSelector.js`)
- **Výběr doručovací/fakturační adresy**
- Dropdown s adresními položkami
- Možnost přidat novou adresu

#### RegistrationForm (`src/components/RegistrationForm/`)
- Kompletní registrační formulář
- Přihlášení přes Google/Apple
- Souhlas s podmínkami

#### LoginForm (`src/components/LoginForm/`)
- Přihlašovací formulář
- Email/heslo + social login

#### TermsModal (`src/components/TermsModal/`)
- Modal s obchodními podmínkami
- Custom scrollbar (používá design tokeny)

#### Badge (`src/components/Badge/`)
- **4 typy**: `favorite`, `vip`, `coupon`, `club`
- Ikony + text

---

## 📱 Responzivita

**4 breakpointy** pro všechny komponenty:

```css
/* Desktop */
@media (min-width: 769px) { ... }

/* Tablet */
@media (max-width: 768px) and (min-width: 481px) { ... }

/* Mobile */
@media (max-width: 480px) { ... }

/* Small Mobile */
@media (max-width: 360px) { ... }
```

### Specifické úpravy:
- **Modaly na mobilu**: Bottom-sheet styl (plná šířka, zarovnáno dole)
- **Input/DatePicker**: `font-size: 16px` na mobilu (prevence zoom na iOS)
- **Avatar velikosti**: Dynamické zmenšování
- **Spacing**: Adaptivní padding

---

## 🧪 Testování & Kvalita

### Stylelint

**Automatická kontrola design tokenů!**

```bash
npm run lint:css        # Kontrola CSS
npm run lint:css:fix    # Automatická oprava
```

**Co Stylelint hlídá:**
- ❌ Zakáže hard-coded barvy (`#ffffff`, `rgb()`) v properties `color`, `background`, `border-color`
- ✅ Vynutí používání `var(--color-*)` z tokens.css
- ✅ Kontroluje moderní CSS syntax
- ✅ Formátování a konzistenci

**Výsledek:** ✅ 0 hard-coded barev v projektu!

---

## 📦 Struktura Projektu

```
eShop komponenty/
├── src/
│   ├── tokens/
│   │   └── tokens.css              # ⭐ Centrální design tokeny
│   ├── styles/
│   │   └── reset.css               # CSS reset
│   └── components/
│       ├── Button/
│       │   ├── Button.js
│       │   ├── Button.css
│       │   └── Button.stories.js   # Storybook dokumentace
│       ├── Input/
│       ├── Checkbox/
│       ├── DatePicker/             # ⭐ Nová komponenta
│       ├── TagSelector/            # ⭐ Nová komponenta
│       ├── EditProfileModal/       # ⭐ Nová komponenta
│       ├── AccountCard/
│       ├── RegistrationForm/
│       ├── LoginForm/
│       ├── TermsModal/
│       └── Badge/
├── pics/                           # Obrázky (logo, ikony)
├── .storybook/                     # Storybook konfigurace
├── .stylelintrc.json              # ⭐ Stylelint konfigurace
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

- **Vanilla JavaScript** - Factory function pattern (`createComponentName()`)
- **CSS Custom Properties** - 100% tokenizace
- **BEM** - Naming convention (`.block__element--modifier`)
- **Storybook 8.x** - Komponenty dokumentace a vývoj
- **Lucide Icons** - Tree-shakeable SVG ikony
- **Vite** - Build tool
- **Stylelint** - CSS linting a design token enforcement

---

## 🚀 Jak Používat

### 1. Instalace
```bash
npm install
```

### 2. Spuštění Storybooku
```bash
npm run storybook
```
Otevře se na `http://localhost:6006`

### 3. CSS Linting
```bash
npm run lint:css        # Kontrola
npm run lint:css:fix    # Oprava
```

### 4. Build Storybooku
```bash
npm run build-storybook
```

---

## 📝 Coding Standards

### 1. Design Tokeny
**VŽDY používej tokeny z `tokens.css`!**

✅ **Správně:**
```css
.button {
  background: var(--color-primary-brand);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
```

❌ **Špatně:**
```css
.button {
  background: #ee6b1b;  /* ❌ Hard-coded! */
  padding: 12px;        /* ❌ Hard-coded! */
}
```

### 2. Ikony
```javascript
// ✅ Správně - používej Lucide
import { createElement } from 'lucide';
import Calendar from 'lucide/dist/esm/icons/calendar';

const icon = createElement(Calendar);
container.appendChild(icon);
```

**CSS pro ikony:**
```css
.icon {
  width: var(--icon-size);      /* Ne 20px! */
  height: var(--icon-size);
}

.icon svg {
  stroke-width: var(--icon-stroke);  /* Ne 1.5! */
}
```

### 3. BEM Naming
```css
.block { }                  /* Komponenta */
.block__element { }         /* Část komponenty */
.block--modifier { }        /* Varianta */
.block__element--modifier { }
```

### 4. Factory Functions
```javascript
export const createComponentName = ({
  prop1 = 'default',
  prop2 = false,
  onChange,
} = {}) => {
  const element = document.createElement('div');
  element.className = 'component-name';

  // Build component...

  return element;
};
```

---

## 🎯 Další Kroky

### Co je hotovo ✅
- [x] Design token system
- [x] 13 komponent (Button, Input, Checkbox, DatePicker, TagSelector, atd.)
- [x] 100% responzivita (4 breakpointy)
- [x] Storybook dokumentace
- [x] Stylelint pro kontrolu tokenů
- [x] GitHub repo (https://github.com/Rejnyx/eShop-komponenty.git)

### Co by se dalo přidat 💡
- [ ] Visual regression testing (Chromatic)
- [ ] Unit testy (Vitest)
- [ ] E2E testy (Playwright)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] NPM package publikace
- [ ] Více komponent (Toast, Tooltip, Dropdown, atd.)
- [ ] Dark mode podpora
- [ ] Accessibility audit (axe-core)

---

## 📚 Zdroje

- **GitHub Repo**: https://github.com/Rejnyx/eShop-komponenty.git
- **Storybook**: Spusť `npm run storybook`
- **Design Tokeny**: `src/tokens/tokens.css`
- **Stylelint Config**: `.stylelintrc.json`

---

**Vytvořeno pomocí Claude Code** 🤖
