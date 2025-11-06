# Component Development Guide

**Verze:** 1.0.0
**Datum:** 2025-01-04
**Status:** ✅ Mandatory - Všechny komponenty MUSÍ dodržovat tato pravidla

---

## 📋 Obsah

1. [Mandatory Patterns](#mandatory-patterns)
2. [Design Token System](#design-token-system)
3. [Responsive Design Rules](#responsive-design-rules)
4. [Icon Usage Rules](#icon-usage-rules)
5. [Validation & Testing](#validation--testing)
6. [Component Checklist](#component-checklist)
7. [Examples](#examples)

---

## 1. Mandatory Patterns

### 1.1 Factory Function Pattern

**✅ SPRÁVNĚ - Vždy použij factory function:**

```javascript
/**
 * Vytvoří ComponentName
 * @param {Object} props - Vlastnosti komponenty
 * @param {string} props.label - Popisek
 * @param {Function} props.onClick - Handler pro kliknutí
 * @returns {HTMLElement} Component element
 */
export const createComponentName = ({
  label = '',
  onClick,
} = {}) => {
  const component = document.createElement('div');
  component.className = 'component-name';

  // Implementation

  return component;
};
```

**❌ ŠPATNĚ - Nikdy nepoužívej class:**

```javascript
// NIKDY TAKHLE!
class ComponentName {
  constructor(props) { ... }
}
```

---

### 1.2 BEM Naming Convention

**Pattern:** `.block__element--modifier`

```css
/* Block */
.button { }

/* Element */
.button__icon { }
.button__label { }

/* Modifier */
.button--primary { }
.button--secondary { }
.button--full-width { }
```

**Pravidla:**
- Komponenta = **block** (např. `button`, `input`, `modal`)
- Potomek = **element** (např. `button__icon`, `input__field`)
- Varianta = **modifier** (např. `button--primary`, `input--error`)
- Nikdy **ne** více než 2 úrovně zanoření (`block__element` ano, `block__element__subelement` NE)

---

### 1.3 Design Token ONLY Policy

**🚨 KRITICKÉ PRAVIDLO:** Nikdy nepoužívej hard-coded hodnoty!

**✅ SPRÁVNĚ:**

```css
.component {
  padding: var(--spacing-md);
  color: var(--color-primary-brand);
  font-size: var(--font-size-md);
  border-radius: var(--radius-md);
  gap: var(--spacing-sm);
}
```

**❌ ŠPATNĚ:**

```css
.component {
  padding: 16px;          /* ❌ */
  color: #FF6B00;         /* ❌ */
  font-size: 16px;        /* ❌ */
  border-radius: 8px;     /* ❌ */
  gap: 8px;               /* ❌ */
}
```

**Validace:** Stylelint automaticky detekuje hard-coded hodnoty.

---

## 2. Design Token System

### 2.1 Spacing Tokens

```css
--spacing-xs: 4px;    /* Micro spacing (icon padding, tight gaps) */
--spacing-sm: 8px;    /* Small spacing (form elements) */
--spacing-md: 16px;   /* Medium spacing (cards, sections) */
--spacing-lg: 24px;   /* Large spacing (page margins) */
--spacing-xl: 32px;   /* Extra large spacing (hero sections) */
--spacing-2xl: 48px;  /* Double extra large spacing */
```

**Kdy použít:**
- `xs` - Gap mezi ikonou a textem v buttonu
- `sm` - Padding v input fieldu
- `md` - Padding v card komponentách
- `lg` - Margin mezi sekcemi
- `xl` - Padding v modálech
- `2xl` - Spacing v hero sekcích

---

### 2.2 Color Tokens

```css
/* Primary */
--color-primary-brand: #FF6B00;
--color-primary-hover: #E66100;

/* Neutrals */
--color-black: #000000;
--color-white: #FFFFFF;
--color-grey-100: #F5F5F5;
--color-grey-200: #E0E0E0;
--color-grey-300: #BDBDBD;
--color-grey-400: #9E9E9E;
--color-grey-500: #757575;
--color-grey-600: #616161;
--color-grey-800: #424242;

/* Semantic */
--color-success: #4CAF50;
--color-error: #F44336;
--color-warning: #FF9800;
--color-info: #2196F3;

/* Functional */
--color-overlay: rgba(0, 0, 0, 0.5);
--color-transparent: transparent;
```

---

### 2.3 Typography Tokens

```css
/* Font Sizes */
--font-size-xs: 12px;   /* Captions, footnotes */
--font-size-sm: 14px;   /* Small text, labels */
--font-size-md: 16px;   /* Body text (DEFAULT) */
--font-size-lg: 18px;   /* Headings, emphasis */
--font-size-xl: 24px;   /* Large headings */
--font-size-2xl: 32px;  /* Hero text */

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;

/* Letter Spacing */
--letter-spacing-tight: -0.01em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
```

---

### 2.4 Border & Radius Tokens

```css
/* Border */
--border-width: 1px;
--border-color: var(--color-grey-300);

/* Border Radius */
--radius-sm: 4px;     /* Small elements (badges) */
--radius-md: 8px;     /* Medium elements (cards) */
--radius-lg: 12px;    /* Large elements (modals) */
--radius-full: 999px; /* Pills, circular buttons */
```

---

### 2.5 Icon Tokens

```css
/* Icon Sizes */
--icon-size: 20px;        /* Default icon size */
--icon-size-sm: 16px;     /* Small icons (chevrons) */
--icon-size-lg: 24px;     /* Large icons (headers, OAuth) */
--icon-size-xl: 32px;     /* Extra large icons */

/* Icon Stroke */
--icon-stroke: 1.5;       /* Default stroke width */
--icon-stroke-bold: 2;    /* Bold stroke (checkmarks) */
```

---

### 2.6 Button Tokens

```css
--button-height: 48px;
--button-padding-horizontal: 32px;
--button-font-size: var(--font-size-md);
--button-font-weight: var(--font-weight-bold);
--button-border-radius: var(--radius-full);
--button-gap: 10px;  /* Gap mezi ikonou a textem */
```

---

### 2.7 Transition Tokens

```css
--transition-fast: 150ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;
```

---

### 2.8 Shadow Tokens

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

---

### 2.9 Backdrop Tokens

```css
--backdrop-blur: blur(8px);
```

---

## 3. Responsive Design Rules

### 3.1 Breakpoint System

**4 breakpoints - Mobile First:**

```css
/* 1. Mobile (default) - 320px+ */
/* Žádné media query, toto je výchozí */

/* 2. Small Mobile - 360px+ */
@media (width <= 480px) { }

/* 3. Tablet - 481px - 768px */
@media (width >= 481px) and (width <= 768px) { }

/* 4. Desktop - 769px+ */
@media (width >= 769px) { }
```

---

### 3.2 Mobile-First Approach

**✅ SPRÁVNĚ - Začni mobilem:**

```css
/* Mobile (default) */
.component {
  padding: var(--spacing-md);
  font-size: var(--font-size-sm);
}

/* Tablet */
@media (width >= 481px) and (width <= 768px) {
  .component {
    padding: var(--spacing-lg);
  }
}

/* Desktop */
@media (width >= 769px) {
  .component {
    padding: var(--spacing-xl);
    font-size: var(--font-size-md);
  }
}
```

**❌ ŠPATNĚ - Desktop-first:**

```css
/* NIKDY TAKHLE! */
.component {
  padding: var(--spacing-xl); /* Desktop first */
}

@media (max-width: 768px) {
  .component {
    padding: var(--spacing-md);
  }
}
```

---

### 3.3 Responsive Patterns

#### 3.3.1 Modal Behavior

**Desktop:**
- Centrovaný v obrazovce
- Maximální šířka (např. 442px)
- Border radius na všech stranách
- Backdrop s blur

**Mobile:**
- Bottom sheet (přichycený dole)
- 100% šířka
- Border radius pouze nahoře
- Slide-up animace

```css
/* Desktop */
.modal {
  max-width: 442px;
  border-radius: var(--radius-lg);
  margin: auto;
}

/* Mobile */
@media (width <= 768px) {
  .modal {
    max-width: 100%;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    position: fixed;
    bottom: 0;
  }
}
```

---

#### 3.3.2 Grid Layouts

```css
/* Mobile - single column */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

/* Tablet - 2 columns */
@media (width >= 481px) and (width <= 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop - 3 columns */
@media (width >= 769px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-lg);
  }
}
```

---

#### 3.3.3 Typography Scaling

```css
/* Mobile */
.heading {
  font-size: var(--font-size-lg);
}

/* Desktop */
@media (width >= 769px) {
  .heading {
    font-size: var(--font-size-xl);
  }
}
```

---

#### 3.3.4 Spacing Scaling

```css
/* Mobile - tighter spacing */
.section {
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
}

/* Desktop - more breathing room */
@media (width >= 769px) {
  .section {
    padding: var(--spacing-xl);
    gap: var(--spacing-md);
  }
}
```

---

### 3.4 Touch Target Minimum

**Pravidlo:** Všechny interaktivní elementy MUSÍ mít minimálně **44×44px** touch target.

```css
/* ✅ SPRÁVNĚ */
.button {
  min-height: 48px;  /* > 44px */
  min-width: 48px;
}

/* ❌ ŠPATNĚ */
.button {
  height: 32px;  /* < 44px - příliš malé! */
}
```

---

### 3.5 Responsive Storybook Stories

**Každá komponenta MUSÍ mít:**

```javascript
export default {
  title: 'Components/MyComponent',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

// Desktop (default)
export const Default = { ... };

// Mobile
export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => { ... },
};

// Tablet
export const TabletView = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => { ... },
};
```

---

## 4. Icon Usage Rules

### 4.1 Import Pattern

**✅ SPRÁVNĚ:**

```javascript
// 1. Import createElement helper
import { createElement } from 'lucide';

// 2. Import ikony individuálně
import X from 'lucide/dist/esm/icons/x';
import ChevronRight from 'lucide/dist/esm/icons/chevron-right';
import Eye from 'lucide/dist/esm/icons/eye';
```

**❌ ŠPATNĚ:**

```javascript
// ❌ Named import z root
import { X, ChevronRight } from 'lucide';

// ❌ Import bez createElement
import X from 'lucide/dist/esm/icons/x';
const icon = X; // Takhle to nefunguje!

// ❌ Neúplný import
import X from 'lucide/dist/esm/icons';
```

---

### 4.2 Icon Creation Pattern

**✅ SPRÁVNĚ - Použij createElement:**

```javascript
import { createElement } from 'lucide';
import X from 'lucide/dist/esm/icons/x';

const closeIcon = createElement(X);
closeButton.appendChild(closeIcon);
```

**❌ ŠPATNĚ - setAttribute:**

```javascript
// ❌ NIKDY nepoužívej setAttribute na Lucide ikonách!
const closeIcon = createElement(X);
closeIcon.setAttribute('width', '24');   // ❌
closeIcon.setAttribute('height', '24');  // ❌
closeIcon.setAttribute('stroke-width', '1.5'); // ❌
```

---

### 4.3 Icon Sizing via CSS

**Styling ikon POUZE přes CSS:**

```css
/* Container pro ikonu */
.component__icon {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
}

/* SVG element */
.component__icon svg {
  width: 100%;
  height: 100%;
  stroke-width: var(--icon-stroke);
}
```

---

### 4.4 Icon + Text Pattern

**Ikona + Text v buttonu/linku:**

```javascript
const button = document.createElement('button');
button.className = 'btn';

// Ikona vlevo
const iconContainer = document.createElement('span');
iconContainer.className = 'btn__icon';
const icon = createElement(Search);
iconContainer.appendChild(icon);

// Text
const label = document.createElement('span');
label.className = 'btn__label';
label.textContent = 'Hledat';

button.appendChild(iconContainer);
button.appendChild(label);
```

```css
.btn {
  display: flex;
  align-items: center;
  gap: var(--button-gap);
}

.btn__icon {
  width: var(--icon-size);
  height: var(--icon-size);
}

.btn__icon svg {
  width: 100%;
  height: 100%;
  stroke-width: var(--icon-stroke);
}
```

---

### 4.5 OAuth Buttons Pattern

**Raster ikony (Google, Apple) vs Lucide:**

```javascript
// OAuth button s PNG/SVG ikonou
const googleButton = document.createElement('button');
googleButton.className = 'btn btn--secondary btn--full-width';

const googleIcon = document.createElement('img');
googleIcon.src = '../../../pics/Google_G_Icon.svg';
googleIcon.alt = '';
googleIcon.className = 'btn__oauth-icon';

const googleLabel = document.createElement('span');
googleLabel.className = 'btn__label';
googleLabel.textContent = 'Přihlásit se pomocí Googlu';

googleButton.appendChild(googleIcon);
googleButton.appendChild(googleLabel);
```

```css
.btn__oauth-icon {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
  object-fit: contain;
}
```

**Pravidlo:** OAuth ikony (Google, Apple) používají `<img>`, Lucide ikony používají `createElement()`.

---

## 5. Validation & Testing

### 5.1 Pre-Commit Validation

**Před každým commitem spusť:**

```bash
npm run validate
```

Spustí:
1. **Stylelint** - kontrola CSS (design tokens, syntax)
2. **Icon Validator** - kontrola Lucide importů a použití

---

### 5.2 Stylelint Rules

**Poznámka:** Pravidlo `no-descending-specificity` je v konfiguraci vypnuto (`null`), aby se předešlo falešným chybám a zjednodušil se vývoj. Hlavní cíl – vynucení design tokenů – zůstává v platnosti.

**Automaticky detekuje:**
- ❌ Hard-coded colors (např. `#FF6B00`)
- ❌ Hard-coded spacing (např. `16px`, `1rem`)
- ❌ Nevalidní CSS syntaxe
- ❌ Missing semicolons
- ❌ Nesprávné BEM naming

**Fix automaticky:**

```bash
npm run lint:css:fix
```

---

### 5.3 Icon Validator Rules

**Automaticky detekuje:**
- ❌ Špatné importy (`import X from 'lucide'`)
- ❌ `setAttribute` na ikonách
- ❌ `createElement` se stringem
- ❌ Chybějící `createElement` import

**Výstup:**

```
src\components\MyComponent\MyComponent.js
  ✖ 42:1  Nepoužívej setAttribute na Lucide ikony
    icon.setAttribute('width', '24');
```

---

### 5.4 Manual Testing Checklist

Před oznámením komponenty jako hotové:

- [ ] Komponenta funguje v Desktop view (1920px)
- [ ] Komponenta funguje v Tablet view (768px)
- [ ] Komponenta funguje v Mobile view (375px)
- [ ] Všechny interaktivní elementy mají min 44×44px
- [ ] Hover states fungují (desktop)
- [ ] Touch states fungují (mobile)
- [ ] Focus states jsou viditelné
- [ ] `npm run validate` prošel ✅
- [ ] Storybook stories fungují pro všechny viewporty

---

## 6. Component Checklist

### 6.1 Nová komponenta - Krok za krokem

#### Krok 1: Vytvoř strukturu souborů

```
src/components/MyComponent/
├── MyComponent.js          # Factory function
├── MyComponent.css         # Styles (BEM + design tokens)
└── MyComponent.stories.js  # Storybook stories
```

---

#### Krok 2: Implementuj JavaScript

```javascript
/**
 * Vytvoří MyComponent
 * @param {Object} props - Vlastnosti komponenty
 * @param {string} props.label - Popisek
 * @returns {HTMLElement}
 */
export const createMyComponent = ({
  label = '',
} = {}) => {
  const component = document.createElement('div');
  component.className = 'my-component';

  // Implementation

  return component;
};
```

**Checklist:**
- [ ] Factory function pattern
- [ ] JSDoc dokumentace
- [ ] Default parametry
- [ ] Return HTMLElement

---

#### Krok 3: Implementuj CSS

```css
/* Mobile (default) */
.my-component {
  padding: var(--spacing-md);
  background: var(--color-white);
  border-radius: var(--radius-md);
}

/* Tablet */
@media (width >= 481px) and (width <= 768px) {
  .my-component {
    padding: var(--spacing-lg);
  }
}

/* Desktop */
@media (width >= 769px) {
  .my-component {
    padding: var(--spacing-xl);
  }
}
```

**Checklist:**
- [ ] BEM naming
- [ ] 100% design tokens (žádné hard-coded hodnoty)
- [ ] Mobile-first (žádné `max-width`)
- [ ] Všechny 3 breakpoints (mobile/tablet/desktop)
- [ ] Touch targets min 44×44px

---

#### Krok 4: Vytvoř Storybook Stories

```javascript
import { createMyComponent } from './MyComponent.js';

export default {
  title: 'Components/MyComponent',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => createMyComponent({ label: 'Example' }),
};

export const MobileView = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => createMyComponent({ label: 'Example' }),
};

export const TabletView = {
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
  render: () => createMyComponent({ label: 'Example' }),
};
```

**Checklist:**
- [ ] `tags: ['autodocs']`
- [ ] Default story
- [ ] Mobile story
- [ ] Tablet story

---

#### Krok 5: Validace

```bash
npm run validate
```

**Musí projít:**
- [ ] Stylelint ✅
- [ ] Icon validator ✅
- [ ] 0 chyb, 0 varování

---

## 7. Examples

### 7.1 Button Component - Reference Implementation

**Button.js:**

```javascript
import './Button.css';
import { createElement } from 'lucide';

export const createButton = ({
  label = 'Button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  onClick,
} = {}) => {
  const button = document.createElement('button');
  button.className = 'btn';
  button.type = 'button';

  // Variants
  if (variant === 'primary') button.classList.add('btn--primary');
  if (variant === 'secondary') button.classList.add('btn--secondary');
  if (fullWidth) button.classList.add('btn--full-width');
  if (disabled) button.disabled = true;

  // Icon left
  if (icon && iconPosition === 'left') {
    const iconContainer = document.createElement('span');
    iconContainer.className = 'btn__icon';
    const iconElement = createElement(icon);
    iconContainer.appendChild(iconElement);
    button.appendChild(iconContainer);
  }

  // Label
  const labelSpan = document.createElement('span');
  labelSpan.className = 'btn__label';
  labelSpan.textContent = label;
  button.appendChild(labelSpan);

  // Icon right
  if (icon && iconPosition === 'right') {
    const iconContainer = document.createElement('span');
    iconContainer.className = 'btn__icon';
    const iconElement = createElement(icon);
    iconContainer.appendChild(iconElement);
    button.appendChild(iconContainer);
  }

  // Event handler
  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
};
```

**Button.css:**

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--button-gap);

  height: var(--button-height);
  padding: 0 var(--button-padding-horizontal);
  border-radius: var(--button-border-radius);

  font-size: var(--button-font-size);
  font-weight: var(--button-font-weight);
  line-height: var(--line-height-tight);

  transition: background-color var(--transition-normal);
  cursor: pointer;
  border: none;
}

.btn--primary {
  background: var(--color-primary-brand);
  color: var(--color-white);
}

.btn--primary:hover {
  background: var(--color-primary-hover);
}

.btn--secondary {
  background: var(--color-white);
  color: var(--color-black);
  outline: var(--border-width) var(--border-color) solid;
  outline-offset: calc(var(--border-width) * -1);
}

.btn--full-width {
  width: 100%;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size);
  height: var(--icon-size);
}

.btn__icon svg {
  width: 100%;
  height: 100%;
  stroke-width: var(--icon-stroke);
}
```

---

### 7.2 Modal Pattern - Reference Implementation

**Modal responsive behavior:**

```css
/* Desktop - centered */
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.modal {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  max-width: 442px;
  width: 100%;
  box-shadow: var(--shadow-lg);
}

/* Mobile - bottom sheet */
@media (width <= 768px) {
  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }

  .modal {
    max-width: 100%;
    max-height: 95vh;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
}
```

---

### 7.3 Anti-Patterns - Vyhni se těmto chybám

#### ❌ Hard-coded hodnoty

```css
/* ŠPATNĚ */
.component {
  padding: 16px;
  color: #FF6B00;
  font-size: 16px;
}
```

#### ❌ setAttribute na ikonách

```javascript
// ŠPATNĚ
const icon = createElement(X);
icon.setAttribute('width', '24');
```

#### ❌ Desktop-first media queries

```css
/* ŠPATNĚ */
@media (max-width: 768px) { }
```

#### ❌ Class komponenty

```javascript
// ŠPATNĚ
class MyComponent {
  constructor() { }
}
```

#### ❌ Nested BEM

```css
/* ŠPATNĚ */
.block__element__subelement { }
```

#### ❌ Malé touch targets

```css
/* ŠPATNĚ */
.button {
  height: 32px;  /* < 44px */
}
```

---

## 8. Workflow Summary

### Nová komponenta od Figma po produkci:

```
1. Figma Design
   ↓
2. Analýza (breakpoints, states, interactions)
   ↓
3. Vytvoř soubory (JS, CSS, Stories)
   ↓
4. Implementuj JavaScript (Factory pattern)
   ↓
5. Implementuj CSS (BEM + tokens + responsive)
   ↓
6. Vytvoř Storybook stories (Desktop/Tablet/Mobile)
   ↓
7. Manual testing (všechny viewporty)
   ↓
8. npm run validate ✅
   ↓
9. Commit & Push
```

---

## 9. Quick Reference

### Design Tokens Cheat Sheet

```
Spacing:    xs=4px  sm=8px  md=16px  lg=24px  xl=32px
Icons:      sm=16px default=20px lg=24px xl=32px
Font Size:  xs=12px sm=14px md=16px lg=18px xl=24px
Radius:     sm=4px  md=8px   lg=12px  full=999px
```

### Breakpoints Cheat Sheet

```
Mobile:     320px - 480px   (default, no media query)
Tablet:     481px - 768px   (@media (width >= 481px) and (width <= 768px))
Desktop:    769px+          (@media (width >= 769px))
```

### BEM Cheat Sheet

```
Block:      .component
Element:    .component__element
Modifier:   .component--modifier
```

---

## 10. Dodatek: Migrace existujících komponent

Pokud najdeš starou komponentu, která nedodržuje tento guide:

1. **Refaktoruj na factory function**
2. **Přejmenuj CSS na BEM**
3. **Nahraď hard-coded hodnoty design tokeny**
4. **Přidej responsive breakpoints**
5. **Oprav ikony (odstranit setAttribute)**
6. **Přidej Storybook stories pro všechny viewporty**
7. **Spusť `npm run validate`**

---

## Kontakt & Podpora

- **Otázky:** Zeptej se @Amelia (Developer Agent)
- **Návrhy na vylepšení:** Vytvoř issue v projektu
- **Validace:** `npm run validate`

---

**© 2025 eShop komponenty - Component Development Guide v1.0.0**
