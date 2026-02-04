import { Member } from ".";

export const getCurrentMember = async (): Promise<Member | null> => {
  try {
    // Return null or mock data instead of Wix members
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
