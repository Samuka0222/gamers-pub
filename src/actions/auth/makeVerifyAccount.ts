import axios from 'axios';

type IInput = {
  email: string;
  code: string;
};

export async function makeVerifyAccount(options: IInput) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verify-account`,
    {
      email: options.email,
      code: options.code,
    },
  );
}
