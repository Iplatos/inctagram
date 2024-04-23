import type { Preview } from '@storybook/react';

import { Provider } from 'react-redux';

import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import '../styles/index.scss';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'background',
      values: [
        {
          name: 'background',
          value: '#0D0D0D',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: { toc: true },
    nextRouter: {
      Provider: AppRouterContext.Provider,
    },
  },
};

export default preview;
