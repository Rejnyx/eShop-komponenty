# eShop Komponenty

Moderní HTML/CSS komponenty pro eShop vytvořené pomocí Storybook.

## 🚀 Rychlý Start

### Instalace

```bash
npm install
```

### Spuštění Storybook

```bash
npm run storybook
```

Storybook se otevře na `http://localhost:6006`

### Build Storybook

```bash
npm run build-storybook
```

## 📁 Struktura Projektu

```
eShop komponenty/
├── .storybook/          # Konfigurace Storybook
│   ├── main.js
│   └── preview.js
├── src/
│   ├── components/      # Komponenty
│   │   └── Button/
│   │       ├── Button.css
│   │       ├── Button.js
│   │       └── Button.stories.js
│   ├── tokens/          # Design tokens (CSS Variables)
│   │   └── tokens.css
│   └── styles/          # Globální styly
│       └── reset.css
└── package.json
```

## 🎨 Design Tokens

Projekt používá CSS Custom Properties pro konzistentní design:

- **Barvy**: `--color-primary-brand`, `--color-black`, `--color-white`, `--color-grey-500`
- **Spacing**: `--spacing-xs` až `--spacing-xl`
- **Border Radius**: `--radius-sm` až `--radius-full`
- **Typography**: `--font-family`, `--font-size-*`, `--font-weight-*`

## 📦 Komponenty

### Button
Moderní, přístupné tlačítko s variantami:
- Primary (hlavní CTA)
- Secondary (outline)
- Large size
- Full width
- Disabled state

## 🛠️ Vývoj

Každá komponenta obsahuje:
- `.css` - Styly komponenty
- `.js` - JavaScript factory funkce
- `.stories.js` - Storybook stories s příklady použití

## 📚 Dokumentace

Dokumentace komponent je dostupná přímo ve Storybook s interaktivními příklady a controls.
