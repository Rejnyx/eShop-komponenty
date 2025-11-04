import { createAccountCard } from './AccountCard.js';
import '../../tokens/tokens.css';
import '../../styles/reset.css';

export default {
  title: 'Components/AccountCard',
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Default Account Card
export const Default = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';

    const modal = createAccountCard({
      ...args,
      user: {
        name: 'Adam Zdravý',
        avatarUrl: '',
        isVerified: true,
        isPremium: true,
      },
      badges: [
        { label: 'Oblíbené', variant: 'yellow', icon: 'star' },
        { label: 'Oblíbené', variant: 'yellow', icon: 'star' },
      ],
      vipBanner: {
        text: 'VIP cashback|15% sleva|+10 b.',
      },
      addresses: [
        {
          label: 'Domov',
          address: 'Křižíkova 1234/56, 186 00 Praha 8',
          iconType: 'home',
        },
        {
          label: 'Práce',
          address: 'Na Příkopě 12, 110 00 Praha 1',
          iconType: 'work',
        },
        {
          label: 'Škola',
          address: 'Karlovo náměstí 13, 120 00 Praha 2',
          iconType: 'school',
        },
      ],
      menuItems: [
        { label: 'Oblíbené položky', iconType: 'favorites', count: 8 },
        { label: 'Historie objednávek', iconType: 'history', count: 24 },
        { label: 'Moje kupóny', iconType: 'coupons', count: 3 },
      ],
    });

    container.appendChild(modal);
    return container;
  },
};


// Without Premium
export const WithoutPremium = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';

    const modal = createAccountCard({
      ...args,
      user: {
        name: 'Jan Novák',
        avatarUrl: '',
        isVerified: true,
        isPremium: false,
      },
      badges: [{ label: 'Nové', variant: 'blue', icon: 'info' }],
      vipBanner: {
        text: 'VIP cashback|15% sleva|+10 b.',
      },
      addresses: [
        {
          label: 'Domov',
          address: 'Křižíkova 1234/56, 186 00 Praha 8',
          iconType: 'home',
        },
      ],
      menuItems: [
        { label: 'Oblíbené položky', iconType: 'favorites' },
        { label: 'Historie objednávek', iconType: 'history' },
        { label: 'Moje kupóny', iconType: 'coupons' },
      ],
    });

    container.appendChild(modal);
    return container;
  },
};

// With Avatar Image
export const WithAvatarImage = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';

    const modal = createAccountCard({
      ...args,
      user: {
        name: 'Adam Zdravý',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
        isVerified: true,
        isPremium: true,
      },
      badges: [
        { label: 'Oblíbené', variant: 'yellow', icon: 'star' },
        { label: 'Top 10%', variant: 'green', icon: 'check-circle' },
      ],
      vipBanner: {
        text: 'VIP cashback|15% sleva|+10 b.',
      },
      addresses: [
        {
          label: 'Domov',
          address: 'Křižíkova 1234/56, 186 00 Praha 8',
          iconType: 'home',
        },
        {
          label: 'Práce',
          address: 'Na Příkopě 12, 110 00 Praha 1',
          iconType: 'work',
        },
      ],
      menuItems: [
        { label: 'Oblíbené položky', iconType: 'favorites', count: 12 },
        { label: 'Historie objednávek', iconType: 'history', count: 45 },
        { label: 'Moje kupóny', iconType: 'coupons', count: 5 },
      ],
    });

    container.appendChild(modal);
    return container;
  },
};

// Minimal Configuration
export const MinimalConfiguration = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';

    const modal = createAccountCard({
      ...args,
      user: {
        name: 'Nový Uživatel',
        avatarUrl: '',
        isVerified: false,
        isPremium: false,
      },
      badges: [],
      vipBanner: null,
      addresses: [],
      menuItems: [
        { label: 'Oblíbené položky', iconType: 'favorites' },
        { label: 'Historie objednávek', iconType: 'history' },
        { label: 'Moje kupóny', iconType: 'coupons' },
      ],
    });

    container.appendChild(modal);
    return container;
  },
};

// Multiple Badges Variant
export const MultipleBadges = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';

    const modal = createAccountCard({
      ...args,
      user: {
        name: 'Power User',
        avatarUrl: '',
        isVerified: true,
        isPremium: true,
      },
      badges: [
        { label: 'Oblíbené', variant: 'yellow', icon: 'star' },
        { label: 'Top zákazník', variant: 'green', icon: 'check-circle' },
        { label: 'VIP', variant: 'blue', icon: 'info' },
        { label: 'Aktivní', variant: 'green', icon: 'check-circle' },
      ],
      vipBanner: {
        text: 'VIP cashback|15% sleva|+10 b.',
      },
      addresses: [
        {
          label: 'Domov',
          address: 'Křižíkova 1234/56, 186 00 Praha 8',
          iconType: 'home',
        },
      ],
      menuItems: [
        { label: 'Oblíbené položky', iconType: 'favorites', count: 25 },
        { label: 'Historie objednávek', iconType: 'history', count: 100 },
        { label: 'Moje kupóny', iconType: 'coupons', count: 10 },
      ],
    });

    container.appendChild(modal);
    return container;
  },
};

// Mobile View
export const MobileView = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.width = '375px';
    wrapper.style.height = '667px';
    const modal = createAccountCard({
      ...args,
      user: {
        name: 'Adam Zdravý',
        avatarUrl: '',
        isVerified: true,
        isPremium: true,
      },
      badges: [
        { label: 'Oblíbené', variant: 'yellow', icon: 'star' },
        { label: 'Oblíbené', variant: 'yellow', icon: 'star' },
      ],
      vipBanner: {
        text: 'VIP cashback|15% sleva|+10 b.',
      },
      addresses: [
        {
          label: 'Domov',
          address: 'Křižíkova 1234/56, 186 00 Praha 8',
          iconType: 'home',
        },
      ],
      menuItems: [
        { label: 'Oblíbené položky', iconType: 'favorites', count: 8 },
        { label: 'Historie objednávek', iconType: 'history', count: 24 },
        { label: 'Moje kupóny', iconType: 'coupons', count: 3 },
      ],
    });
    wrapper.appendChild(modal);
    return wrapper;
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
