export type UserProfileType = {
  aboutMe: string;
  city: string;
  country: string;
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

export type UpdateProfileType = {
  aboutMe: string;
  city: string;
  country: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  userName: string;
};
