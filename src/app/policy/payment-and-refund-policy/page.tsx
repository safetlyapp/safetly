import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment and Refund Policy | Safetly",
  description:
    "Safetly's payment and refund policy covering subscriptions, pricing, payment methods, and refund eligibility.",
};

export default function PaymentAndRefundPolicyPage() {
  return (
    <div className="space-y-14 text-sm leading-relaxed text-slate-600">
      {/* ===== PAYMENT POLICY ===== */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
          Part 1
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Safetly Payment Policy
        </h2>
        <p className="mt-3 text-slate-600">
          Safetly (&quot;Safetly,&quot; &quot;we,&quot; &quot;us,&quot;
          &quot;our,&quot; or &quot;Safetly Authority&quot;) is a parental
          control and family safety application. This Payment Policy
          explains how Safetly subscriptions, pricing, payments, payment
          verification, subscription activation, and payment-related
          responsibilities are handled.
        </p>
        <p className="mt-2 text-slate-600">
          By purchasing or using any paid Safetly service or subscription,
          you agree to this Payment Policy, the Safetly Terms of Service,
          and the Privacy Policy.
        </p>

        <div className="mt-8 space-y-8">
          <Section num="1" title="Subscription Plans">
            <p>Safetly may currently offer the following subscription plans:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>30-Day Subscription Plan</li>
              <li>90-Day Subscription Plan</li>
              <li>180-Day Subscription Plan</li>
              <li>360-Day Subscription Plan</li>
            </ul>
            <p>
              The price, subscription period, included features, and
              applicable terms for each plan will be displayed in the
              Safetly app, website, or relevant payment page before payment
              is completed.
            </p>
            <p>
              Certain features may not be available on every subscription
              plan or device. Feature availability may depend on the
              device type, Android or iPhone version, operating system,
              permissions granted, technical limitations, and selected
              subscription plan.
            </p>
          </Section>

          <Section num="2" title="Payment Methods">
            <p>
              Safetly payments may currently be accepted through the
              following Bangladeshi mobile financial services:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>bKash</li>
              <li>Nagad</li>
              <li>Rocket</li>
            </ul>
            <p>
              Safetly may add, change, or discontinue payment methods in
              the future when necessary.
            </p>
            <p>
              The terms, security policies, and privacy policies of the
              relevant payment service provider may also apply when you
              make a payment.
            </p>
          </Section>

          <Section num="3" title="Payment Completion and Subscription Activation">
            <p>
              Your Safetly subscription will be activated after the
              payment has been successfully completed and any required
              verification has been completed.
            </p>
            <p>
              Subscriptions may generally be activated shortly after
              payment verification. However, activation may be delayed
              due to internet connectivity, payment gateway processing,
              mobile financial service systems, servers, app-related
              issues, or other technical reasons.
            </p>
            <p>
              If your payment is successful but your subscription is not
              activated, please contact Safetly Support and provide the
              following information where available:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Your Safetly account email or registered account information</li>
              <li>Payment date and time</li>
              <li>Payment amount</li>
              <li>Transaction ID</li>
              <li>Payment method used</li>
              <li>A brief description of the issue</li>
            </ul>
          </Section>

          <Section num="4" title="Pricing and Payment Amount">
            <p>
              Safetly subscription prices may be displayed in Bangladeshi
              Taka (BDT).
            </p>
            <p>
              Before making a payment, you are responsible for reviewing
              the displayed price, subscription duration, and included
              features.
            </p>
            <p>
              Additional charges may apply through payment gateways,
              mobile financial service providers, or other payment
              services. Any such charges may be determined according to
              the policies of the relevant payment provider.
            </p>
            <p>
              Safetly may change the prices, features, or availability of
              future subscription plans. However, the subscription period
              and terms displayed at the time of purchase will generally
              continue to apply to an already purchased and active
              subscription, unless a change is required by law, security,
              or technical necessity.
            </p>
          </Section>

          <Section num="5" title="Subscription Duration">
            <p>The duration of your subscription will depend on the plan you select.</p>
            <p>
              The subscription period may begin when the subscription is
              successfully activated. After the subscription expires,
              paid features may be limited, suspended, or unavailable
              unless you purchase or renew a subscription.
            </p>
            <p>
              Whether a refund is available for unused subscription time
              will be determined under the Safetly Refund Policy and
              applicable law.
            </p>
          </Section>

          <Section num="6" title="Automatic Renewal">
            <p>
              If a subscription plan includes automatic renewal, this
              will be clearly disclosed before payment or during the
              subscription process.
            </p>
            <p>
              If automatic renewal is not enabled, you will need to
              purchase a new subscription after your current subscription
              period ends.
            </p>
          </Section>

          <Section num="7" title="Payment Security">
            <p>Safetly does not normally request or store your:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>bKash PIN</li>
              <li>Nagad PIN</li>
              <li>Rocket PIN</li>
              <li>One-Time Password (OTP)</li>
              <li>Confidential payment password</li>
              <li>Other secret payment security credentials</li>
            </ul>
            <p>
              Do not share your PIN, OTP, password, or other confidential
              payment information with any person or unauthorized source.
            </p>
            <p>
              Payment information may be processed according to the
              security and privacy policies of the relevant payment
              service provider.
            </p>
          </Section>

          <Section num="8" title="Failed or Incomplete Payments">
            <p>
              If a payment fails, is canceled, or remains incomplete,
              your subscription may not be activated.
            </p>
            <p>
              If money is deducted from your payment account but your
              Safetly subscription is not activated, please contact
              Safetly Support and provide the relevant payment
              information.
            </p>
            <p>
              If a transaction remains pending or incomplete in the
              payment provider&apos;s system, the transaction may be
              completed, canceled, reversed, or otherwise adjusted
              according to the policies and procedures of the relevant
              payment provider.
            </p>
          </Section>

          <Section num="9" title="Duplicate or Multiple Payments">
            <p>
              If you are accidentally charged more than once for the
              same subscription, Safetly will review the matter.
            </p>
            <p>
              You may be asked to provide the transaction IDs, payment
              dates, payment times, payment amounts, and relevant Safetly
              account information.
            </p>
            <p>
              If an additional or duplicate payment is verified, Safetly
              may provide a refund or another appropriate solution in
              accordance with the Safetly Refund Policy.
            </p>
          </Section>

          <Section num="10" title="User Responsibilities">
            <p>When making a payment, you are responsible for ensuring that:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You have selected the correct subscription plan</li>
              <li>You have reviewed the payment amount</li>
              <li>You are using the correct Safetly account</li>
              <li>The information you provide is accurate and up to date</li>
              <li>You have the legal authority to use the payment account or payment method</li>
            </ul>
            <p>
              Safetly may not be responsible for problems caused by an
              incorrect account, incorrect payment number, incorrect
              subscription plan, or inaccurate information provided by
              the user.
            </p>
          </Section>

          <Section num="11" title="Fraudulent or Unauthorized Payments">
            <p>
              If you believe that a payment was unauthorized or
              fraudulent, you should promptly contact Safetly and the
              relevant payment service provider.
            </p>
            <p>
              Safetly may temporarily limit or suspend an account or
              service when reasonably necessary for security, fraud
              prevention, investigation, or legal compliance.
            </p>
          </Section>

          <Section num="12" title="Changes to This Payment Policy">
            <p>Safetly may update or modify this Payment Policy from time to time.</p>
            <p>
              Important changes may be communicated through the Safetly
              app, website, email, notifications, or another appropriate
              method.
            </p>
            <p>The updated policy will include a revised &quot;Last Updated&quot; date.</p>
          </Section>

          <Section num="13" title="Contact Us">
            <p>For payment-related questions, concerns, or support, please contact:</p>
            <p className="font-medium text-slate-800">
              Safetly Authority
              <br />
              Support Email:{" "}
              <a href="mailto:support@safetly.app" className="text-violet-600 hover:underline">
                support@safetly.app
              </a>
            </p>
          </Section>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ===== REFUND POLICY ===== */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
          Part 2
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Safetly Refund Policy
        </h2>
        <p className="mt-3 text-slate-600">
          This Refund Policy explains Safetly&apos;s policies regarding
          paid subscriptions, refund eligibility, refund requests,
          verification, and refund processing.
        </p>
        <p className="mt-2 text-slate-600">
          By purchasing a Safetly subscription, you agree to this Refund
          Policy, the Safetly Payment Policy, the Terms of Service, and
          the Privacy Policy.
        </p>

        <div className="mt-8 space-y-8">
          <Section num="1" title="General Refund Policy">
            <p>
              Safetly provides digital subscription-based services. After
              payment has been successfully completed and verified, your
              subscription may be activated and the features included in
              your selected plan may become available.
            </p>
            <p>
              Refunds are not automatically guaranteed. Each refund
              request may be reviewed individually based on factors
              including:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>The payment status</li>
              <li>Whether the subscription was activated</li>
              <li>The extent to which the service was used</li>
              <li>The nature of the reported issue</li>
              <li>Relevant technical information</li>
              <li>Proof of payment</li>
              <li>Applicable law</li>
              <li>The terms of this Refund Policy</li>
            </ul>
          </Section>

          <Section num="2" title="Situations Where a Refund May Be Considered">
            <SubSection title="2.1 Duplicate or Excess Payment">
              If you were accidentally charged more than once for the
              same subscription and the additional payment is verified,
              the excess amount may be refunded.
            </SubSection>
            <SubSection title="2.2 Payment Successful but Subscription Not Activated">
              If your payment was successful but your subscription was
              not activated, and Safetly is unable to resolve the issue
              within a reasonable period, a refund may be considered.
            </SubSection>
            <SubSection title="2.3 Verified Technical Issue Caused by Safetly">
              If a verified technical issue caused by Safetly prevents
              you from using a paid service and the issue cannot be
              reasonably resolved, a refund or another appropriate
              solution may be considered.
            </SubSection>
            <SubSection title="2.4 Unauthorized Payment">
              If you report that a payment was made without your
              authorization, Safetly may review the matter based on the
              available information and supporting evidence. You may
              also need to contact the relevant payment service provider
              regarding the unauthorized transaction.
            </SubSection>
            <SubSection title="2.5 Refunds Required by Applicable Law">
              If a refund is required under applicable law, Safetly will
              take the appropriate action required by that law.
            </SubSection>
          </Section>

          <Section num="3" title="Situations Where a Refund May Not Be Available">
            <p>A refund may be denied in situations including:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>The subscription was successfully activated and the service was used</li>
              <li>You selected the wrong subscription plan</li>
              <li>You purchased a subscription for the wrong Safetly account</li>
              <li>The issue resulted from inaccurate information provided by you</li>
              <li>A feature did not work because of device incompatibility, operating-system restrictions, or technical limitations</li>
              <li>The service was interrupted because of internet connectivity, mobile-network issues, or third-party service problems</li>
              <li>You did not grant the permissions required for the relevant feature</li>
              <li>Safetly was not installed or configured correctly</li>
              <li>A feature was affected by device settings, battery restrictions, or background-operation limitations</li>
              <li>Your account was suspended or terminated because you violated the Terms of Service</li>
              <li>Safetly was used for unlawful, unauthorized, or secret surveillance</li>
              <li>You request a refund for unused subscription time after using part of the subscription, unless applicable law provides otherwise</li>
              <li>You request a refund solely because you changed your mind after the subscription was activated or used</li>
            </ul>
          </Section>

          <Section num="4" title="Device and Feature Limitations">
            <p>Not all Safetly features may work in the same way on every Android or iPhone device.</p>
            <p>Feature performance may depend on:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Device model</li>
              <li>Android or iOS version</li>
              <li>Operating-system policies</li>
              <li>App permissions</li>
              <li>Internet connectivity</li>
              <li>Battery or background settings</li>
              <li>Device-manufacturer restrictions</li>
              <li>The selected subscription plan</li>
            </ul>
            <p>
              If a feature does not work as expected because of a
              limitation that is not caused by Safetly, a refund may not
              be available solely for that reason.
            </p>
          </Section>

          <Section num="5" title="How to Request a Refund">
            <p>To request a refund, please contact:</p>
            <p>
              <a href="mailto:support@safetly.app" className="font-medium text-violet-600 hover:underline">
                support@safetly.app
              </a>
            </p>
            <p>
              To help us review your request, please provide the
              following information where available:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Your Safetly account name or email address</li>
              <li>Payment date and time</li>
              <li>Payment amount</li>
              <li>Payment method used</li>
              <li>Transaction ID</li>
              <li>Relevant details of the payment number</li>
              <li>The reason for the refund request</li>
              <li>A description of the issue</li>
              <li>Proof of payment or screenshots, if necessary</li>
            </ul>
            <p className="rounded-lg bg-amber-50 px-4 py-3 text-amber-800">
              For your security, never send your bKash, Nagad, or Rocket
              PIN, OTP, or confidential payment password by email.
            </p>
          </Section>

          <Section num="6" title="Refund Review and Verification">
            <p>When reviewing a refund request, Safetly may verify:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>The authenticity of the payment</li>
              <li>Transaction information</li>
              <li>Safetly account information</li>
              <li>Subscription status</li>
              <li>Service usage</li>
              <li>Relevant technical logs or information</li>
              <li>The reason for the refund request</li>
            </ul>
            <p>
              Safetly may request additional information or supporting
              evidence where necessary.
            </p>
            <p>
              Incorrect, incomplete, or misleading information may delay
              or result in the denial of a refund request.
            </p>
          </Section>

          <Section num="7" title="Refund Processing Time">
            <p>
              If a refund is approved, Safetly aims to process the
              refund within 10 business days.
            </p>
            <p>However, additional time may be required because of:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Payment gateway processing</li>
              <li>bKash, Nagad, or Rocket processing procedures</li>
              <li>Delays caused by banks or financial service providers</li>
              <li>Public holidays</li>
              <li>Additional verification requirements</li>
              <li>Payment disputes or security reviews</li>
            </ul>
            <p>
              &quot;10 business days&quot; generally means working days
              excluding weekly holidays and applicable public holidays.
            </p>
          </Section>

          <Section num="8" title="Refund Method">
            <p>Approved refunds will generally be issued through:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>The original payment method; or</li>
              <li>Another appropriate method approved by Safetly</li>
            </ul>
            <p>
              If a refund cannot be issued through the original payment
              method because of security requirements, payment-provider
              policies, or technical limitations, Safetly may determine
              an alternative refund method after completing the
              necessary verification.
            </p>
          </Section>

          <Section num="9" title="Partial Refunds">
            <p>In special circumstances, Safetly may consider a partial refund based on:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>The amount of time the subscription was used</li>
              <li>The remaining subscription period</li>
              <li>The nature of the issue</li>
              <li>Technical circumstances</li>
              <li>Applicable law</li>
            </ul>
            <p>
              A partial refund is not automatic and will be reviewed on
              a case-by-case basis.
            </p>
          </Section>

          <Section num="10" title="Alternative Solutions">
            <p>
              In some cases, Safetly may offer an alternative solution
              instead of a refund, such as:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Resolving a technical issue</li>
              <li>Activating or reactivating a subscription</li>
              <li>Correcting an account issue</li>
              <li>Assisting with a subscription-plan correction</li>
              <li>Adjusting the subscription period</li>
              <li>Providing another appropriate solution</li>
            </ul>
            <p>
              Where applicable law gives you a right to a refund, an
              alternative solution will not limit that legal right.
            </p>
          </Section>

          <Section num="11" title="Chargebacks and Payment Disputes">
            <p>
              If you experience a payment-related problem, we request
              that you contact Safetly Support first so that we can
              review and attempt to resolve the issue.
            </p>
            <p>
              If a chargeback, payment dispute, or financial claim is
              initiated, Safetly may temporarily limit the relevant
              account or service while the matter is being reviewed.
            </p>
            <p>
              After verification, Safetly will take appropriate action
              based on the applicable policies, available evidence, and
              applicable law.
            </p>
          </Section>

          <Section num="12" title="Changes to This Refund Policy">
            <p>Safetly may update or modify this Refund Policy from time to time.</p>
            <p>
              Any updated policy will generally apply to future payments
              or subscriptions. If a different application is required
              by law or specific circumstances, Safetly will follow
              applicable legal requirements.
            </p>
          </Section>

          <Section num="13" title="Contact Us">
            <p>For refund-related questions, requests, or complaints, please contact:</p>
            <p className="font-medium text-slate-800">
              Safetly Authority
              <br />
              Support Email:{" "}
              <a href="mailto:support@safetly.app" className="text-violet-600 hover:underline">
                support@safetly.app
              </a>
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-2 flex items-baseline gap-2 text-base font-semibold text-slate-900">
        <span className="text-violet-500">{num}.</span>
        {title}
      </h3>
      <div className="space-y-3 pl-0.5">{children}</div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
      <p className="mb-1 text-sm font-semibold text-slate-800">{title}</p>
      <p className="text-slate-600">{children}</p>
    </div>
  );
}