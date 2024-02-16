import { headers } from 'next/headers';

export async function GET(request) {
  console.log(request);

  return new Response('Payment Successful', {
    status: 200,
    headers: { referer: referer },
  });
}
