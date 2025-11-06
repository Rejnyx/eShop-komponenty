import { createEditProfileModal } from './EditProfileModal.js';

export default {
  title: 'Components/EditProfileModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
  argTypes: {
    profile: {
      control: 'object',
      description: 'Profilová data uživatele',
    },
    formData: {
      control: 'object',
      description: 'Formulářová data',
    },
  },
};

export const Default = {
  args: {
    profile: {
      avatar: 'https://i.pravatar.cc/150?img=12',
      name: 'Adam Zdravý',
      verified: true,
      premium: true,
    },
    formData: {
      firstName: 'Adam',
      lastName: 'Zdravý',
      birthDate: '1990-05-15',
      phone: '+420 777 123 456',
      email: 'adam@example.com',
      tags: ['vegetarian'],
      newsletter: true,
    },
  },
  render: (args) => {
    const modal = createEditProfileModal({
      ...args,
      onClose: () => {
        console.log('Modal closed');
        modal.remove();
      },
      onSave: (formData) => {
        console.log('Form saved:', formData);
        modal.remove();
      },
    });

    return modal;
  },
};

export const EmptyForm = {
  args: {
    profile: {
      avatar: '',
      name: 'Adam Zdravý',
      verified: true,
      premium: true,
    },
    formData: {
      firstName: '',
      lastName: '',
      birthDate: '',
      phone: '',
      email: '',
      tags: [],
      newsletter: false,
    },
  },
  render: (args) => {
    const modal = createEditProfileModal({
      ...args,
      onClose: () => {
        console.log('Modal closed');
        modal.remove();
      },
      onSave: (formData) => {
        console.log('Form saved:', formData);
        alert('Formulář uložen! Zkontroluj konzoli.');
      },
    });

    return modal;
  },
};

export const WithoutPremium = {
  args: {
    profile: {
      avatar: 'https://i.pravatar.cc/150?img=8',
      name: 'Jana Nováková',
      verified: false,
      premium: false,
    },
    formData: {
      firstName: 'Jana',
      lastName: 'Nováková',
      birthDate: '1995-03-22',
      phone: '+420 603 456 789',
      email: 'jana@example.com',
      tags: ['vegan', 'glutenFree'],
      newsletter: false,
    },
  },
  render: (args) => {
    const modal = createEditProfileModal({
      ...args,
      onClose: () => {
        console.log('Modal closed');
        modal.remove();
      },
      onSave: (formData) => {
        console.log('Form saved:', formData);
        modal.remove();
      },
    });

    return modal;
  },
};

export const AllTags = {
  args: {
    profile: {
      avatar: 'https://i.pravatar.cc/150?img=15',
      name: 'Petr Svoboda',
      verified: true,
      premium: true,
    },
    formData: {
      firstName: 'Petr',
      lastName: 'Svoboda',
      birthDate: '1988-11-08',
      phone: '+420 734 567 890',
      email: 'petr@example.com',
      tags: ['vegetarian', 'vegan', 'glutenFree', 'favorite'],
      newsletter: true,
    },
  },
  render: (args) => {
    const modal = createEditProfileModal({
      ...args,
      onClose: () => {
        console.log('Modal closed');
        modal.remove();
      },
      onSave: (formData) => {
        console.log('Form saved:', formData);
        modal.remove();
      },
    });

    return modal;
  },
};

export const MobilePreview = {
  args: {
    profile: {
      avatar: 'https://i.pravatar.cc/150?img=10',
      name: 'Lucie Malá',
      verified: true,
      premium: true,
    },
    formData: {
      firstName: 'Lucie',
      lastName: 'Malá',
      birthDate: '1992-07-14',
      phone: '+420 777 888 999',
      email: 'lucie@example.com',
      tags: ['vegetarian'],
      newsletter: true,
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => {
    const modal = createEditProfileModal({
      ...args,
      onClose: () => {
        console.log('Modal closed');
        modal.remove();
      },
      onSave: (formData) => {
        console.log('Form saved:', formData);
        modal.remove();
      },
    });

    return modal;
  },
};

export const TabletPreview = {
  args: {
    profile: {
      avatar: 'https://i.pravatar.cc/150?img=20',
      name: 'Martin Dvořák',
      verified: true,
      premium: false,
    },
    formData: {
      firstName: 'Martin',
      lastName: 'Dvořák',
      birthDate: '1985-12-01',
      phone: '+420 602 111 222',
      email: 'martin@example.com',
      tags: ['glutenFree'],
      newsletter: false,
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: (args) => {
    const modal = createEditProfileModal({
      ...args,
      onClose: () => {
        console.log('Modal closed');
        modal.remove();
      },
      onSave: (formData) => {
        console.log('Form saved:', formData);
        modal.remove();
      },
    });

    return modal;
  },
};
