import axios from 'axios';

export async function makeForgotPassword(email: string) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/forgot-password`,
    {
      email,
    },
  );
}
