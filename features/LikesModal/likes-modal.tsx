import { ReactNode, useEffect, useState } from 'react';

import { TextField } from '@/shared/ui';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/modal';
import { ModalCard } from '@/shared/ui/modal-card';

import s from './likes-modal.module.scss';
type LikesModalProps = {
  children?: ReactNode;
  headerTitle: string;
  onClose: (open: boolean) => void;
  open: boolean;
  people: { followed: boolean; name: string }[];
};

export const LikesModal = (props: LikesModalProps) => {
  const { people } = props;
  const [inputValue, setInputValue] = useState('');
  const closeModalOnOpenChange = () => {
    if (props.open !== undefined) {
      props.onClose?.(!open);
      setInputValue('');
    }
  };

  const Debounce = (
    array: { followed: boolean; name: string }[],
    inputValue: string,
    delay: number
  ) => {
    const [debouncedValue, setDebouncedValue] = useState(array);

    useEffect(
      () => {
        const t = setTimeout(() => {
          setDebouncedValue(
            array.filter(p => p.name.toLowerCase().includes(inputValue.toLowerCase()))
          );
        }, delay);

        // clean up the timeout after value changes
        return () => {
          clearTimeout(t);
        };
      },
      [array, inputValue, delay] // re-run if value or delay changes
    );

    return debouncedValue;
  };
  const NewArr = Debounce(people, inputValue, 1000);

  return (
    <Modal.Root
      classes={{ content: s.modalContent }}
      onOpenChange={closeModalOnOpenChange}
      {...props}
    >
      <ModalCard.Root
        classes={{ cardRoot: s.cardRoot }}
        headerTitle={props.headerTitle}
        onClose={() => props.onClose(!open)}
        style={{ overflow: 'auto' }}
      >
        <ModalCard.Content className={s.cardContent}>
          <TextField
            inputType={'search'}
            onChange={setInputValue}
            placeholder={'Search'}
            value={inputValue}
          />
          {props.children}
          {NewArr.map(p => (
            <div className={s.buttonsGroup} key={p.name}>
              {p.name}
              <span>
                {p.followed ? <Button>Follow</Button> : ''}
                <button style={{ marginLeft: '100px' }}>delete</button>
              </span>
            </div>
          ))}
        </ModalCard.Content>
      </ModalCard.Root>
    </Modal.Root>
  );
};
