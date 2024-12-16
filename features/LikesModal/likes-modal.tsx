import { ReactNode, useState } from 'react';

import { useDebouncedCallBack } from '@/shared/hooks/useDebouncedCallback';
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

  const [filter, setFilter] = useState('');

  const setDebouncedFilter = useDebouncedCallBack((e: string) => {
    setFilter(e);
  }, 1000);

  const filteredPeople = people.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

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
          <input
            onChange={event => {
              setDebouncedFilter(event.currentTarget.value);
              setInputValue(event.currentTarget.value);
            }}
            type={'text'}
            value={inputValue}
          />
          <TextField
            inputType={'search'}
            onChange={value => {
              setDebouncedFilter(value);
              setInputValue(value);
            }}
            placeholder={'Search'}
            value={inputValue}
          />
          {props.children}
          {filteredPeople.map(p => (
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
