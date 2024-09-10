import axios from 'axios';

type IInput = {
  email: string;
  password: string;
};

export async function makeSignIn(user: IInput) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/sign-in`,
    {
      email: user.email,
      password: user.password,
    },
  );
}
