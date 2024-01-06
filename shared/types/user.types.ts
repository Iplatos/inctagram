export type UserProfileType = {
  aboutMe: string;
  dateOfBirth: string;
  familyName: string;
  firstName: string;
  photos: [
    {
      authorId: string;
      createdAt: string;
      cropProps: string;
      id: string;
      title: string;
      updatedAt: string;
      url: string;
    },
  ];
  userId: string;
};

export type ChangeProfileType = {
  aboutMe: string;
  city: string;
  country: string;
  dateOfBirth: string;
  firstname: string;
  lastname: string;
  username: string;
};
