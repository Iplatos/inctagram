import { ReactNode } from 'react';

import { clsx } from 'clsx';

import s from './TemplateCard.module.scss';

type TemplateCardProps = {
  children?: ReactNode;
  className?: string;
};

type ContentProps = {
  children?: ReactNode;
  className?: string;
};

type HeaderProps = {
  children?: ReactNode;
  className?: string;
};

export const TemplateCard = (props: TemplateCardProps) => {
  return <div className={clsx(s.component, props.className)}>{props.children}</div>;
};

export const Content = (props: ContentProps) => {
  return <div className={clsx(s.content, props.className)}>{props.children}</div>;
};

export const Header = (props: HeaderProps) => {
  return <Content className={clsx(s.header, props.className)}>{props.children}</Content>;
};

TemplateCard.Content = Content;

TemplateCard.Header = Header;
