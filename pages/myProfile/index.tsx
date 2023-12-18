import { Button } from '@/shared/ui';
import { AvatarRadix } from '@/shared/ui/avatar';

export const MyProfile = () => {
  return (
    <>
      <AvatarRadix urlAdress={'https://'} />
      <Button>Profile Settings</Button>
    </>
  );
};
