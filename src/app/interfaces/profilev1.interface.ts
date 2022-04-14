/**
 *  Profile interface to store User  detail
 */
export interface iProfileV1 {
  FirstName: string;
  Lastname: string;
  Dob?: string;
  Gender: string;

  MobileNumber: string;
  CountryCode: string;

  Email: string;
  Address?: string;
  ProfilePic?: string;
};
