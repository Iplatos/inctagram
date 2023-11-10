import { useState } from 'react';

import Arrow from '@/assets/icons/arrow.svg?url';
import * as Select from '@radix-ui/react-select';
import Image from 'next/image';

import styles from './SelectBox.module.scss';

type Option = {
  image?: string;
  label?: string;
  value: string;
};

type SelectProps = Select.SelectValueProps & {
  disabled?: boolean;
  onChangeFn?: (value: string) => void;
  options?: Option[];
  width?: 'medium' | 'small' | 'tiny';
};

const DefaultFieldCreator = ({ image, label }: Option) => {
  return (
    <div className={`${styles.default}`}>
      {image && <Image alt={'Option image'} src={image} />}
      {label && <span>{label}</span>}
    </div>
  );
};

export const SelectBox = (props: SelectProps) => {
  const { defaultValue, disabled, onChangeFn, options, placeholder, width } = props;
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const widthClassName = !width ? 'width-medium' : `width-${width}`;
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
    <Select.Root onValueChange={handleValueChange}>
      <div>
        <Select.Trigger
          aria-label={selectedOption?.label ?? ''}
          className={`${styles.selectBtn} ${styles[widthClassName]}`}
          disabled={disabled}
        >
          <div className={styles.valueWrapper}>
            {selectedOption && selectedOption.image && (
              <Image alt={'Select arrow'} src={selectedOption.image} />
            )}
            <Select.Value placeholder={defaultField ?? placeholder} />
          </div>
          <Image alt={'Select arrow'} src={Arrow} />
        </Select.Trigger>
        <Select.Content className={styles.viewport}>
          {options?.map((option, i) => (
            <Select.Item
              className={`${styles.option} ${styles[widthClassName]}`}
              key={i}
              value={option.value}
            >
              {option.image && <Image alt={'Option image'} src={option.image} />}
              {option.label && <Select.ItemText>{option.label}</Select.ItemText>}
            </Select.Item>
          ))}
        </Select.Content>
      </div>
    </Select.Root>
  );
};
