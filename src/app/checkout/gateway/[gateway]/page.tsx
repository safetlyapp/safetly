import { notFound } from 'next/navigation';
import GatewayCheckout from '@/components/gateway-checkout';

type Props = {
  params: Promise<{ gateway: string }>;
  searchParams: Promise<{
    order_id?: string;
    amount?: string;
    customer_email?: string;
  }>;
};

export default async function GatewayPage({ params, searchParams }: Props) {
  const { gateway } = await params;
  if (gateway !== 'bkash' && gateway !== 'nagad' && gateway !== 'rocket')
    notFound();
  const query = await searchParams;
  return (
    <GatewayCheckout
      gateway={gateway}
      orderId={query.order_id ?? ''}
      amount={query.amount ?? '0.00'}
      customerEmail={query.customer_email ?? ''}
      receiverNumber={process.env.PAYMENT_RECEIVER_NUMBER ?? '01700000000'}
    />
  );
}
