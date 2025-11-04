/**
 * Vytvoří VIPBanner element pro propagaci cashback programu
 * @param {Object} props - Vlastnosti VIP banner
 * @param {string} props.text - Text banneru ve formátu "VIP cashback|15% sleva|+10 b." (odděleno |)
 * @returns {HTMLElement} VIPBanner element
 */
export const createVIPBanner = ({
  text = 'VIP cashback|15% sleva|+10 b.',
} = {}) => {
  const banner = document.createElement('div');
  banner.className = 'vip-banner';

  // Content wrapper
  const content = document.createElement('div');
  content.className = 'vip-banner__content';

  // Icon container with SVG placeholder
  const iconContainer = document.createElement('div');
  iconContainer.className = 'vip-banner__icon';

  // Coupon icon SVG
  const svgNS = 'http://www.w3.org/2000/svg';
  const icon = document.createElementNS(svgNS, 'svg');
  icon.setAttribute('width', '25');
  icon.setAttribute('height', '20');
  icon.setAttribute('viewBox', '0 0 25 20');
  icon.setAttribute('fill', 'none');

  // Coupon ticket shape with notches
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute(
    'd',
    'M2 0H23C24.1046 0 25 0.89543 25 2V7C23.8954 7 23 7.89543 23 9C23 10.1046 23.8954 11 25 11V18C25 19.1046 24.1046 20 23 20H2C0.895431 20 0 19.1046 0 18V11C1.10457 11 2 10.1046 2 9C2 7.89543 1.10457 7 0 7V2C0 0.89543 0.895431 0 2 0Z'
  );
  path.setAttribute('fill', 'var(--color-coupon)');
  icon.appendChild(path);

  iconContainer.appendChild(icon);

  // Text container
  const textEl = document.createElement('div');
  textEl.className = 'vip-banner__text';

  // Parse text and create spans
  const parts = text.split('|');
  parts.forEach((part, index) => {
    const span = document.createElement('span');
    // First and last parts are bold
    if (index === 0 || index === parts.length - 1) {
      span.className = 'vip-banner__text-bold';
    } else {
      span.className = 'vip-banner__text-regular';
    }
    span.textContent = part + (index < parts.length - 1 ? ' ' : '');
    textEl.appendChild(span);
  });

  content.appendChild(iconContainer);
  content.appendChild(textEl);
  banner.appendChild(content);

  return banner;
};
