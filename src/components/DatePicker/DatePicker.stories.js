import { createDatePicker } from './DatePicker.js';

export default {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text zobrazený když není vybrané datum',
    },
    value: {
      control: 'text',
      description: 'Hodnota date pickeru (YYYY-MM-DD format)',
    },
    error: {
      control: 'boolean',
      description: 'Error stav',
    },
    errorMessage: {
      control: 'text',
      description: 'Chybová zpráva',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled stav',
    },
    min: {
      control: 'text',
      description: 'Minimální datum (YYYY-MM-DD)',
    },
    max: {
      control: 'text',
      description: 'Maximální datum (YYYY-MM-DD)',
    },
  },
};

export const Default = {
  args: {
    placeholder: 'Vyberte datum narození',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const datePicker = createDatePicker({
      ...args,
      onChange: (value) => console.log('Selected date:', value),
    });

    container.appendChild(datePicker);
    return container;
  },
};

export const WithValue = {
  args: {
    placeholder: 'Vyberte datum',
    value: '1990-05-15',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const datePicker = createDatePicker({
      ...args,
      onChange: (value) => console.log('Selected date:', value),
    });

    container.appendChild(datePicker);
    return container;
  },
};

export const WithError = {
  args: {
    placeholder: 'Vyberte datum',
    error: true,
    errorMessage: 'Toto pole je povinné',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const datePicker = createDatePicker(args);

    container.appendChild(datePicker);
    return container;
  },
};

export const Disabled = {
  args: {
    placeholder: 'Vyberte datum',
    value: '1990-05-15',
    disabled: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const datePicker = createDatePicker(args);

    container.appendChild(datePicker);
    return container;
  },
};

export const WithMinMax = {
  args: {
    placeholder: 'Vyberte datum (2020-2025)',
    min: '2020-01-01',
    max: '2025-12-31',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const datePicker = createDatePicker({
      ...args,
      onChange: (value) => console.log('Selected date:', value),
    });

    container.appendChild(datePicker);
    return container;
  },
};

export const BirthDateExample = {
  args: {
    placeholder: '* Datum narození',
    max: new Date().toISOString().split('T')[0], // Today
    min: '1920-01-01',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.maxWidth = '400px';
    container.style.padding = '20px';

    const datePicker = createDatePicker({
      ...args,
      onChange: (value) => console.log('Birth date selected:', value),
    });

    container.appendChild(datePicker);
    return container;
  },
};
