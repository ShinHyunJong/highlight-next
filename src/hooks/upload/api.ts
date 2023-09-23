import { api } from '@/requests';

export async function postHighlightApi(body: FormData) {
  const { data } = await api.post('/highlight', body, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return data;
}
