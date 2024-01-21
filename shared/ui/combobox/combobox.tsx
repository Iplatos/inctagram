import React, { ChangeEvent, FC, MouseEventHandler, useState } from 'react';

import { Combobox as ComboboxUI } from '@headlessui/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { clsx } from 'clsx';
import Image from 'next/image';

import style from './combobox.module.scss';

import { Typography } from '..';
import ArrowDown from '../../../assets/icons/arrow-down.svg?url';
import Close from '../../../assets/icons/close.svg?url';

type Option = {
  label: string;
  value: number | string;
};

export type ComboboxProps = {
  disabled?: boolean;
  errorMessage?: string;
  inputValue: string;
  label?: string;
  name?: string;
  onChange: (value: null | string) => void;
  onClear?: () => void;
  onInputChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  showClearButton?: boolean;
  value: string;
};

export const Combobox: FC<ComboboxProps> = props => {
  const {
    disabled,
    errorMessage,
    inputValue,
    label,
    name,
    onChange,
    onClear,
    onInputChange,
    options,
    placeholder,
    showClearButton = true,
    value,
  } = props;

  const showError = !!errorMessage && errorMessage.length > 0;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      onChange(null);
    }
    onInputChange(e.currentTarget.value);
  };

  const handleClearButtonClicked: MouseEventHandler<HTMLDivElement> = () => {
    onInputChange('');
    onChange(null);
  };

  const filteredOptions =
    inputValue === ''
      ? options
      : options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));

  const getDisplayingValue = (value: number | string) =>
    options?.find(option => option.value === value)?.label || '';

  const s = {
    box: style.boxContainer,
    button: style.button,
    clearButton: style.clearButton,
    container: style.container,
    input: clsx(
      style.inputField,
      style.input,
      showError && style.error,
      showClearButton && style.hasClearButton
    ),
    item: style.item,
    options: clsx(style.content, filteredOptions.length === 0 && style.empty),
    viewport: style.viewport,
  };

  return (
    <ComboboxUI
      {...{
        disabled,
        name,
        onChange,
        value,
      }}
      as={'div'}
      className={s.container}
    >
      <div className={s.box}>
        {label && (
          <Typography.Regular14 color={'var(--color-light-900)'}>{label}</Typography.Regular14>
        )}

        <ComboboxUI.Button as={'div'}>
          <ComboboxUI.Input
            className={s.input}
            displayValue={getDisplayingValue}
            onChange={inputChangeHandler}
            placeholder={placeholder}
          />

          <div className={s.button}>
            <Image alt={'arrow down'} className={style.icon} src={ArrowDown} />
          </div>
        </ComboboxUI.Button>

        {showClearButton && !!value && (
          <div className={s.clearButton} onClick={onClear ?? handleClearButtonClicked}>
            <Image alt={'close'} src={Close} />
          </div>
        )}
      </div>

      <ComboboxUI.Options as={'div'} className={s.options}>
        <ScrollArea.Root asChild type={'auto'}>
          <div>
            <ScrollArea.Viewport className={s.viewport}>
              {filteredOptions.map(option => (
                <ComboboxUI.Option
                  as={'button'}
                  className={s.item}
                  key={option.value}
                  type={'button'}
                  value={option.value}
                >
                  <span>{option.label}</span>
                </ComboboxUI.Option>
              ))}
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar orientation={'vertical'}>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </div>
        </ScrollArea.Root>
      </ComboboxUI.Options>

      <>
        {showError && (
          <Typography.Regular14 color={'var(--color-danger-500)'}>
            {errorMessage}
          </Typography.Regular14>
        )}
      </>
    </ComboboxUI>
  );
};
