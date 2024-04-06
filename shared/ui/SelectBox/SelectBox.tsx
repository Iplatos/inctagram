import { useState } from 'react';

import Arrow from '@/assets/icons/arrow.svg?url';
import * as Select from '@radix-ui/react-select';
import Image, { StaticImageData } from 'next/image';

import styles from './SelectBox.module.scss';

import { Typography } from '..';

export type SelectBoxOption = {
  image?: StaticImageData;
  label?: string;
  value: string;
};

type SelectProps = Select.SelectValueProps & {
  disabled?: boolean;
  labelField?: string;
  onChangeFn?: (value: string) => void;
  options?: SelectBoxOption[];
};

const DefaultFieldCreator = ({ image, label }: SelectBoxOption) => {
  return (
    <div className={`${styles.default}`}>
      {image && <Image alt={'Option image'} src={image} />}
      {label && <span>{label}</span>}
    </div>
  );
};

export const SelectBox = (props: SelectProps) => {
  const { defaultValue, disabled, labelField, onChangeFn, options, placeholder } = props;
  const [selectedOption, setSelectedOption] = useState<SelectBoxOption | null>(null);
  const defaultField =
    typeof defaultValue === 'number' && options?.[defaultValue]
      ? DefaultFieldCreator(options[defaultValue])
      : defaultValue;

  const handleValueChange = (value: string): void => {
    const option = options?.find(opt => opt.value === value) || null;

    setSelectedOption(option);
    onChangeFn?.(value);
  };

  return (
    <div>
      <Typography.Regular14 color={'var(--color-light-900)'}>{labelField}</Typography.Regular14>
      <Select.Root onValueChange={handleValueChange}>
        <Select.Trigger
          aria-label={selectedOption?.label ?? ''}
          className={styles.selectTrigger}
          disabled={disabled}
        >
          <div className={styles.valueWrapper}>
            {selectedOption && selectedOption.image && (
              <Image alt={'image'} src={selectedOption.image} />
            )}
            <Select.Value placeholder={defaultField ?? placeholder} />
          </div>

          <Image alt={'Select arrow'} src={Arrow} />
        </Select.Trigger>

        <Select.Content className={styles.selectContent} position={'popper'}>
          <Select.ScrollUpButton />

          <Select.Viewport className={styles.selectViewport}>
            {options?.map((option, i) => (
              <Select.Item className={styles.selectItem} key={i} value={option.value}>
                {option.image && <Image alt={'Option image'} src={option.image} />}
                {option.label && <Select.ItemText>{option.label}</Select.ItemText>}
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Root>
    </div>
  );
};
