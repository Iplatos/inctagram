import { ComponentProps, FC, ReactNode, SVGProps } from 'react';

import { Button, Typography } from '@/shared/ui';
import { clsx } from 'clsx';

import s from './sidebar.module.scss';

interface RootProps {
  children: ReactNode;
}

const Root = ({ children }: RootProps) => {
  return <div className={s.root}>{children}</div>;
};

interface SectionProps {
  children?: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <div className={s.section}>{children}</div>;
};

//   TODO: activ
type ItemProps = {
  className?: string;
  disabled?: boolean;
  href?: string;
  icon?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  title: string;
} & Omit<ComponentProps<typeof Typography.Bold14>, 'children'>;

const Item = ({
  className,
  disabled,
  href,
  icon,
  isActive,
  onClick,
  title,
  ...typographyProps
}: ItemProps) => {
  return (
    <Button
      className={clsx(s.button, className, isActive && s.buttonActive)}
      disabled={disabled}
      href={href}
      onClick={onClick}
      tabIndex={1}
      {...typographyProps}
      variant={'text'}
    >
      {icon}
      {title}
    </Button>
  );
};

interface FooterProps {
  children: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <div className={s.footer}>{children}</div>;
};

export const UiSidebar = { Footer, Item, Root, Section };
