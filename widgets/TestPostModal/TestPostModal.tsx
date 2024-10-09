import { CloseIcon } from '@/assets/icons/close';
import { PublicPostByIdResponse } from '@/shared/types/public.types';
import { Button, Card, Modal } from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  open: boolean;
  post: PublicPostByIdResponse;
  setOpen: (open: boolean) => void;
};

export const TestPostModal = (props: Props) => {
  return (
    <Modal open={props.open}>
      <Card
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '300px',

          justifyContent: 'center',
          padding: '30px',
          width: '300px',
        }}
      >
        <Image alt={'opened-post'} height={'150'} src={props.post.images[0].url} width={'150'} />
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Image
            alt={'opened-post'}
            height={'30'}
            src={props.post.avatarOwner}
            style={{ borderRadius: '50%' }}
            width={'30'}
          />
          {props.post.userName}
        </div>
      </Card>
      <Button onClick={() => props.setOpen(false)} variant={'text'}>
        <CloseIcon />
      </Button>
    </Modal>
  );
};
