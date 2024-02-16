export async function GET(request) {
  console.log(request.data);

  return new Response('Hello there.', {
    status: 200,
  });
}

export async function POST(request) {
  const body = await request.json();
  console.log(body);

  if (body.status === 'completed') {
    // Fixed to use === for comparison
    let amount_sats = body.amount / 1000;
    console.log('amount sats: ', amount_sats);
    if (amount_sats >= 100) {
      const lightning_addresses = [
        'heidi@zbd.gg',
        'perla@zbd.gg',
        'durablefeeling54@walletofsatoshi.com',
      ];
      const divide_by_three = Math.floor(amount_sats / 3);
      console.log('amount to payout: ', divide_by_three);
      console.log('executing payouts...');
      for (const lightning_address of lightning_addresses) {
        console.log('lightning address ', lightning_address);
        const payload = {
          amount: `${divide_by_three}000`,
          lnAddress: lightning_address,
          comment: 'Tip Split!',
        };
        try {
          const data = await zbd.sendLightningAddressPayment(payload); // Assuming `zbd.sendLightningAddressPayment` is defined elsewhere
          if (!data.success) {
            return new Response('Split failed.', {
              status: 400,
            });
          }
        } catch (e) {
          console.log(e);
          return new Response(`Error. ${e}`, {
            status: 400,
          });
        }
      }

      return new Response('Splits Successful', {
        status: 200,
      });
    } else {
      return new Response('Tip amount must be greater than 100.', {
        status: 200,
      });
    }
  } else {
    return new Response('Invalid request.', {
      status: 400,
    });
  }
}
