import { zbd } from "@zbd/node";

const API_KEY = process.env.API_KEY;
const project = new zbd(API_KEY);

export default async function Home() {
  let response: object = await project.getWallet();
  let balance: number = Number(response.data.balance) / 1000;

  return (
    <div className="p-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome to the ZBD Nextjs Starter Codebase 👋!
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          You may edit the app/page.tsx to begin writing code.
        </p>
      </div>

      <div className="mt-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-2">
          Your Project Wallet Balance:
        </h3>
        <p>{balance} sats.</p>
      </div>
    </div>
  );
}
