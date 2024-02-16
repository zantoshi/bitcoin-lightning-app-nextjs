import { zbd } from '@zbd/node';

const API_KEY = process.env.ZEBEDEE_API_KEY;
const project = new zbd(API_KEY);

export default async function Home() {
  return <div className='p-5'>hello world.</div>;
}
