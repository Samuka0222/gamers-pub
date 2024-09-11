import axios from 'axios';

type IInput = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export async function makeSignUp(user: IInput) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/sign-up`,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
    },
  );
}
