/**
 * Icon Validation Script
 * Kontroluje správné použití Lucide ikon v celém projektu
 *
 * Validuje:
 * 1. Správný formát importů z lucide (z 'lucide/dist/esm/icons/[icon-name]')
 * 2. Zakázané použití setAttribute na Lucide ikonách
 * 3. Použití createElement z lucide s ikonami
 *
 * Spuštění: node scripts/validate-icons.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Barvy pro console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

let totalErrors = 0;
let totalWarnings = 0;
let filesScanned = 0;

/**
 * Rekurzivně najde všechny .js soubory v dané složce
 */
function findJSFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Přeskočit node_modules a build složky
      if (!file.match(/node_modules|dist|build|\.storybook/)) {
        findJSFiles(filePath, fileList);
      }
    } else if (file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Kontrola 1: Validace Lucide importů
 * Správný formát:
 *   - import IconName from 'lucide/dist/esm/icons/icon-name'
 *   - import { createElement } from 'lucide' (VÝJIMKA - toto je správně)
 * Špatný formát:
 *   - import { IconName } from 'lucide'
 *   - import IconName from 'lucide'
 */
function validateLucideImports(content, filePath) {
  const errors = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Detekce špatných importů z lucide
    // VÝJIMKA: import { createElement } from 'lucide' je správně
    if (line.match(/import\s+.*\s+from\s+['"]lucide['"]/) &&
        !line.match(/import\s+\{\s*createElement\s*\}\s+from\s+['"]lucide['"]/)) {
      errors.push({
        type: 'error',
        line: lineNumber,
        message: `Špatný import z 'lucide'. Ikony musí být importovány z: import IconName from 'lucide/dist/esm/icons/icon-name'`,
        code: line.trim(),
      });
    }

    // Detekce neúplných importů (chybí název ikony)
    if (line.match(/import\s+.*\s+from\s+['"]lucide\/dist\/esm\/icons['"]\s*$/)) {
      errors.push({
        type: 'error',
        line: lineNumber,
        message: `Neúplný import - chybí název ikony. Použij: import IconName from 'lucide/dist/esm/icons/icon-name'`,
        code: line.trim(),
      });
    }

    // Detekce named importů místo default importů pro ikony
    if (line.match(/import\s+\{[^}]+\}\s+from\s+['"]lucide\/dist\/esm\/icons\/.+['"]/)) {
      errors.push({
        type: 'warning',
        line: lineNumber,
        message: `Použij default import místo named import: import IconName from 'lucide/dist/esm/icons/icon-name'`,
        code: line.trim(),
      });
    }
  });

  return errors;
}

/**
 * Kontrola 2: Detekce setAttribute na ikonách
 * setAttribute by se neměl používat na Lucide SVG elementech - styling přes CSS
 */
function validateSetAttribute(content, filePath) {
  const errors = [];
  const lines = content.split('\n');

  // Najdeme všechny proměnné, které jsou ikony (vznikly přes createElement)
  const iconVariables = new Set();
  lines.forEach((line) => {
    const match = line.match(/const\s+(\w+)\s*=\s*createElement\(/);
    if (match) {
      iconVariables.add(match[1]);
    }
  });

  // Teď hledáme setAttribute na těchto proměnných
  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    iconVariables.forEach((iconVar) => {
      // Hledáme pattern: iconVar.setAttribute(...)
      if (line.includes(`${iconVar}.setAttribute(`)) {
        errors.push({
          type: 'error',
          line: lineNumber,
          message: `Nepoužívej setAttribute na Lucide ikony. Styling se dělá přes CSS třídy.`,
          code: line.trim(),
          variable: iconVar,
        });
      }
    });
  });

  return errors;
}

/**
 * Kontrola 3: Validace createElement použití
 * Zkontroluje, že createElement je importován a používán správně
 * POZOR: Nevaliduje document.createElement - to je standardní DOM API
 */
function validateCreateElement(content, filePath) {
  const errors = [];
  const lines = content.split('\n');

  // Zkontrolujeme, jestli je importován createElement z lucide
  const hasLucideImport = lines.some((line) =>
    line.match(/import\s+\{[^}]*createElement[^}]*\}\s+from\s+['"]lucide['"]/)
  );

  if (hasLucideImport) {
    // Zkontrolujeme pattern - createElement by měl být volán s importovanou ikonou, ne se stringem
    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Hledáme POUZE createElement (ne document.createElement) se stringem
      // Pozitivní lookahead: není před tím "document."
      if (line.match(/(?<!document\.)createElement\s*\(\s*['"`]/) && !line.includes('document.createElement')) {
        errors.push({
          type: 'error',
          line: lineNumber,
          message: `createElement očekává objekt ikony, ne string. Použij: createElement(IconName)`,
          code: line.trim(),
        });
      }
    });
  }

  return errors;
}

/**
 * Validace jednoho souboru
 */
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(process.cwd(), filePath);

  const lucideImportErrors = validateLucideImports(content, filePath);
  const setAttributeErrors = validateSetAttribute(content, filePath);
  const createElementErrors = validateCreateElement(content, filePath);

  const allErrors = [...lucideImportErrors, ...setAttributeErrors, ...createElementErrors];

  if (allErrors.length > 0) {
    console.log(`\n${colors.blue}${relativePath}${colors.reset}`);

    allErrors.forEach((error) => {
      const icon = error.type === 'error' ? `${colors.red}✖${colors.reset}` : `${colors.yellow}⚠${colors.reset}`;
      const lineInfo = `${colors.gray}${error.line}:1${colors.reset}`;

      console.log(`  ${icon} ${lineInfo}  ${error.message}`);

      if (error.code) {
        console.log(`    ${colors.gray}${error.code}${colors.reset}`);
      }

      if (error.type === 'error') {
        totalErrors++;
      } else {
        totalWarnings++;
      }
    });
  }

  filesScanned++;
}

/**
 * Main funkce
 */
function main() {
  console.log(`${colors.blue}===========================================`);
  console.log(`Validace Lucide ikon`);
  console.log(`===========================================${colors.reset}\n`);

  const srcPath = path.join(path.dirname(__dirname), 'src');

  if (!fs.existsSync(srcPath)) {
    console.error(`${colors.red}Chyba: Složka 'src' neexistuje${colors.reset}`);
    process.exit(1);
  }

  const jsFiles = findJSFiles(srcPath);

  if (jsFiles.length === 0) {
    console.log(`${colors.yellow}Nenalezeny žádné .js soubory ke kontrole${colors.reset}`);
    process.exit(0);
  }

  jsFiles.forEach((file) => validateFile(file));

  // Závěrečné shrnutí
  console.log(`\n${colors.blue}===========================================`);
  console.log(`Shrnutí`);
  console.log(`===========================================${colors.reset}`);
  console.log(`${colors.gray}Skenováno souborů: ${filesScanned}${colors.reset}`);

  if (totalErrors > 0) {
    console.log(`${colors.red}✖ Chyby: ${totalErrors}${colors.reset}`);
  } else {
    console.log(`${colors.green}✓ Žádné chyby${colors.reset}`);
  }

  if (totalWarnings > 0) {
    console.log(`${colors.yellow}⚠ Varování: ${totalWarnings}${colors.reset}`);
  }

  console.log();

  // Exit s chybou, pokud byly nalezeny chyby
  if (totalErrors > 0) {
    process.exit(1);
  }
}

// Spuštění
main();
