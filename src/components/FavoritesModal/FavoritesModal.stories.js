/**
 * Favorites Modal - Storybook Stories
 * Universal modal pro oblíbené položky a kupóny
 */

import { createFavoritesModal } from './FavoritesModal.js';

export default {
  title: 'Components/FavoritesModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    coupons: { control: 'object' },
    onClose: { action: 'closed' },
    onBack: { action: 'back clicked' },
    onFindFavorites: { action: 'find favorites clicked' },
    onCouponClick: { action: 'coupon clicked' },
  },
};

// Mock data pro kupóny
const mockCoupons = [
  {
    id: '1',
    image: 'https://placehold.co/90x68/FFC712/white?text=50%25',
    title: '50% Sleva na drink',
    code: 'EKEA11',
    validUntil: 'do 6.1.2025',
    isActive: true,
    isHistory: false,
  },
  {
    id: '2',
    image: 'https://placehold.co/90x68/4CAF50/white?text=20%25',
    title: '20% Sleva na nákup',
    code: 'SAVE20',
    validUntil: 'do 15.1.2025',
    isActive: true,
    isHistory: false,
  },
  {
    id: '3',
    image: 'https://placehold.co/90x68/2196F3/white?text=Doprava',
    title: 'Doprava zdarma',
    code: 'FREESHIP',
    validUntil: 'do 31.1.2025',
    isActive: true,
    isHistory: false,
  },
];

const mockHistoryCoupons = [
  {
    id: '4',
    image: 'https://placehold.co/90x68/9C9C9C/white?text=Použito',
    title: '10% Sleva na vše',
    code: 'WINTER10',
    validUntil: 'do 1.1.2025',
    isActive: false,
    isHistory: true,
  },
];

/**
 * Empty State - bez kupónů/položek
 */
export const EmptyState = {
  args: {
    title: 'Oblíbené položky',
    coupons: [],
  },
  render: (args) => createFavoritesModal(args),
};

/**
 * With Coupons - s kupóny (výchozí stav)
 */
export const WithCoupons = {
  args: {
    title: 'Moje Kupóny',
    coupons: mockCoupons,
  },
  render: (args) => createFavoritesModal(args),
};

/**
 * With History - kupóny s historií
 */
export const WithHistory = {
  args: {
    title: 'Moje Kupóny',
    coupons: [...mockCoupons, ...mockHistoryCoupons],
  },
  render: (args) => createFavoritesModal(args),
};

/**
 * With Back Button - s tlačítkem zpět
 */
export const WithBackButton = {
  args: {
    title: 'Moje Kupóny',
    coupons: [...mockCoupons, ...mockHistoryCoupons],
    onBack: () => console.log('Back clicked'),
  },
  render: (args) => createFavoritesModal(args),
};

/**
 * Mobile View - empty state
 */
export const MobileEmptyState = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    title: 'Oblíbené položky',
    coupons: [],
  },
  render: (args) => createFavoritesModal(args),
};

/**
 * Mobile View - s kupóny
 */
export const MobileWithCoupons = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    title: 'Moje Kupóny',
    coupons: [...mockCoupons, ...mockHistoryCoupons],
    onBack: () => console.log('Back clicked'),
  },
  render: (args) => createFavoritesModal(args),
};

/**
 * Tablet View
 */
export const TabletView = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    title: 'Moje Kupóny',
    coupons: [...mockCoupons, ...mockHistoryCoupons],
  },
  render: (args) => createFavoritesModal(args),
};
