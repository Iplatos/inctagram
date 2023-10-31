import styles from './SelectBox.module.scss';
import * as Select from '@radix-ui/react-select';
import Image from 'next/image';
import Arrow from '../../assets/icons/arrow.svg';
import { useState } from 'react';

type Option = {
  value: string;
  image?: string;
  label?: string;
};

type SelectProps = Select.SelectValueProps & {
  width?: 'medium' | 'small' | 'tiny';
  disabled?: boolean;
  options?: Option[];
};

export const SelectBox = ({ placeholder, options, width, disabled, ...props }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const widthClassName = !width ? 'width-medium' : `width-${width}`;

  const handleValueChange = (value: string): void => {
    const option = options?.find(opt => opt.value === value) || null;
    setSelectedOption(option);
  };

  return (
    <Select.Root onValueChange={handleValueChange}>
      <div>
        <Select.Trigger
          aria-label={selectedOption?.label ?? ''}
          disabled={disabled}
          className={`${styles.selectBtn} ${styles[widthClassName]}`}
        >
          <div className={styles.valueWrapper}>
            {selectedOption && selectedOption.image && (
              <Image src={selectedOption.image} alt="Select arrow" />
            )}
            <Select.Value placeholder={placeholder} />
          </div>
          <Image src={Arrow} alt="Select arrow" />
        </Select.Trigger>
        <Select.Content className={styles.viewport}>
          {options?.map((option, i) => (
            <Select.Item
              key={i}
              value={option.value}
              className={`${styles.option} ${styles[widthClassName]}`}
            >
              {option.image && <Image src={option.image} alt="Option image" />}
              {option.label && <Select.ItemText>{option.label}</Select.ItemText>}
            </Select.Item>
          ))}
        </Select.Content>
      </div>
    </Select.Root>
  );
};
