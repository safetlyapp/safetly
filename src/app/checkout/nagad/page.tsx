import NagadCheckout from '@/components/checkout/nagad-checkout';

export default async function NagadCheckoutPage({
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
    <NagadCheckout
      orderId={query.order_id ?? 'ORDER-001'}
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
