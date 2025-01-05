import { useEffect, useState } from 'react';

import { SearchItemSkeleton } from '@/features/search/SearchItemSkeleton';
import { useAddFollowerMutation, useGetUsersQuery } from '@/shared/api/users/users-api';
import { User } from '@/shared/api/users/users-api.types';
import { Button, Typography, UserBanner } from '@/shared/ui';

type Props = {
  searchParams: string;
};

export const SearchList = ({ searchParams }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading } = useGetUsersQuery({
    pageNumber: currentPage,
    search: searchParams,
  });

  const [addFollower] = useAddFollowerMutation();
  const usersData = data?.items;

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [searchParams, currentPage, usersData]);

  if (!usersData || isLoading) {
    return <SearchItemSkeleton />;
  }

  if (usersData.length === 0) {
    return (
      <div>
        <Typography.Bold16>Recent requests</Typography.Bold16>
        <div>
          <Typography.Bold14>Oops! This place looks empty!</Typography.Bold14>
          <Typography.SmallText>No recent requests</Typography.SmallText>
        </div>
      </div>
    );
  }

  const addFollowerHandler = (id: number) => {
    addFollower({ selectedUserId: id });
  };

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          <UserBanner userName={user.userName} />
          <Button onClick={() => addFollowerHandler(user.id)}>Following</Button>
        </div>
      ))}
    </div>
  );
};
