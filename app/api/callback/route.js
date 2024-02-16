import { headers } from 'next/headers';

export async function GET(request) {
  console.log(request.data);

  //   {'confirmedAt': '2022-12-01T22:52:13.196Z',
  //  'chargeId': '{{id}}',
  //  'amount': '1000',
  //  'unit': 'msats',
  //  'slots': 0,
  //  'staticChargeId': '{{staticChargeId}}',
  //  'internalId': None,
  //  'chargeRequest': 'lnbc...',
  //  'callbackUrl': '{{callbackUrl}}',
  //  'staticChargeRequest': 'lnurl...',
  //  'allowedSlots': 1000,
  //  'successMessage': 'Congratulations your payment was successful!',
  //  'status': 'completed',
  //  'staticChargeDescription':
  //  'test', 'comment': '',
  //  'senderName': 'user@zbd.gg'}

  return new Response('Hello there.', {
    status: 200,
  });
}

export async function POST(request) {
  const body = await request.json();
  console.log(body);

  if (body.status === 'completed') {
    // Fixed to use === for comparison
    const amount_sats = body.amount / 1000; // Assuming `body.amount` is directly accessible and correct
    if (amount_sats >= 100) {
      const lightning_addresses = ['heidi@zbd.gg', 'perla@zbd.gg'];
      const divide_by_three = Math.floor(amount_sats / 3);

      for (const lightning_address of lightning_addresses) {
        // Changed to `of` to get the value directly
        const payload = {
          amount: divide_by_three,
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
          return new Response(`Error. ${e}`, {
            status: 400,
          });
        }
      }

      return new Response('Splits Successful', {
        status: 200,
      });
    }
  } else {
    return new Response('Invalid request.', {
      status: 400,
    });
  }
}
