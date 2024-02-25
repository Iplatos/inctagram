import { UserProfileType } from "@/shared/types/user.types";

export type CountriesApiResponse<T> = {
  data: T;
  error: boolean;
  msg: string;
};

export type CountryWithCitiesApiData = {
  cities: string[];
  country: string;
  iso2: string;
  iso3: string;
};

export type CountryWithFlagApiData = {
  iso2: string;
  iso3: string;
  name: string;
  unicodeFlag: string;
};

export type SelectType = {
  id: string;
  label: string;
  value: string;
};

export type OptionsType = {
  label: string;
  value: string;
};

type ProfileFormProps = {
  onSubmitChanges: () => void;
  profile: UserProfileType;
  username: string;
};
