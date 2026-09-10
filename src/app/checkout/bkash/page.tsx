import BkashCheckout from '@/components/checkout/bkash-checkout';

export default async function BkashCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{
    order_id?: string;
    amount?: string;
    customer_email?: string;
    plan_id?: string;
    package_name?: string;
    original_amount?: string;
    discount_amount?: string;
  }>;
}) {
  const query = await searchParams;
  return (
    <BkashCheckout
      orderId={query.order_id ?? ''}
      amount={query.amount ?? '0.00'}
      customerEmail={query.customer_email ?? ''}
      receiverNumber={process.env.PAYMENT_RECEIVER_NUMBER ?? '01700000000'}
      planId={query.plan_id ?? ''}
      packageName={query.package_name ?? ''}
      originalAmount={query.original_amount ?? ''}
      discountAmount={query.discount_amount ?? ''}
    />
  );
}
