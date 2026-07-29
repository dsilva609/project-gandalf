import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const { default: tailwindcss } = await import('@tailwindcss/vite');

    // Storybook auto-merges the root vite.config.ts, which pulls in the TanStack
    // Start (SSR/server-fn), TanStack Router codegen, and Nitro plugins. Those
    // assume a single-entry app build/route tree and break Storybook's
    // multi-entry preview build, so drop them here.
    const blockedPrefixes = ['tanstack-start', 'tanstack-router', 'tanstack:router', 'nitro'];
    config.plugins = (config.plugins || []).flat(Infinity).filter((plugin) => {
      const name = plugin && typeof plugin === 'object' && 'name' in plugin ? plugin.name : undefined;
      return !name || !blockedPrefixes.some((prefix) => name.startsWith(prefix));
    });
    config.plugins.push(tailwindcss());
    return config;
  },
};
export default config;
