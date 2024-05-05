import type { Meta } from '@storybook/react';

import { Typography } from './';

const meta = {
  component: Typography.H1,
  tags: ['autodocs'],
  title: 'UI/Typography',
} satisfies Meta<typeof Typography.H1>;

export default meta;

export const AllTypography = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography.Large>Large</Typography.Large>
      <Typography.H1>H1</Typography.H1>
      <Typography.H2>H2</Typography.H2>
      <Typography.H3>H2</Typography.H3>
      <Typography.Regular16>Regular16</Typography.Regular16>
      <Typography.Bold16>Bold16</Typography.Bold16>
      <Typography.Regular14>Regular14</Typography.Regular14>
      <Typography.Medium14>Medium14</Typography.Medium14>
      <Typography.Bold14>Bold14</Typography.Bold14>
      <Typography.Regular12>Regular12</Typography.Regular12>
      <Typography.Semibold12>Regular12</Typography.Semibold12>
      <Typography.RegularLink>Regular12</Typography.RegularLink>
      <Typography.SmallLink>Regular12</Typography.SmallLink>
    </div>
  ),
};

export const H1 = {
  render: () => <Typography.H1>Hello world</Typography.H1>,
};

export const H1WithComponent = {
  render: () => (
    <Typography.H1 component={'div'} style={{ color: '#8D9094' }}>
      Hello world
    </Typography.H1>
  ),
};
