import axios from 'axios';

export async function uploadFile(url: string, file: File) {
  return await axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
}
