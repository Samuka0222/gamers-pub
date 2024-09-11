import axios from 'axios';

type IInput = {
  email: string;
  code: string;
  newPassword: string;
};

export async function makeNewPassword({ email, code, newPassword }: IInput) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/reset-password`,
    {
      email,
      code,
      newPassword,
    },
  );
}
