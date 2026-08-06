import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Safetly",
  description:
    "Safetly's Terms of Service covering authorized use, accounts, subscriptions, prohibited uses, and liability.",
};

export default function TermsOfServicePage() {
  return (
    <div className="space-y-8 text-sm leading-relaxed text-slate-600">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Safetly Terms of Service
        </h2>
        <p className="mt-3 text-slate-600">
          Welcome to Safetly. Safetly (&quot;Safetly,&quot; &quot;we,&quot;
          &quot;us,&quot; &quot;our,&quot; or the &quot;Safetly
          Authority&quot;) is a parental control and family safety
          application designed to help parents and legal guardians support
          their children&apos;s digital safety, online activities, and
          responsible device use.
        </p>
        <p className="mt-2 text-slate-600">
          By downloading, installing, registering for, subscribing to,
          accessing, or using the Safetly application, website, software,
          or related services (collectively, the &quot;Services&quot;),
          you confirm that you have read, understood, and agreed to these
          Terms of Service (&quot;Terms&quot;).
        </p>
        <p className="mt-2 rounded-lg bg-amber-50 px-4 py-3 text-amber-800">
          If you do not agree to any part of these Terms, you must not use
          Safetly.
        </p>
      </div>

      <div className="space-y-8">
        <Section num="1" title="Purpose of Safetly">
          <p>
            Safetly is designed to help parents and legal guardians support
            children&apos;s digital safety and responsible use of
            technology.
          </p>
          <p>
            Depending on the device, operating system, permissions,
            subscription plan, and availability, Safetly may provide
            features such as:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Live location</li>
            <li>Location history</li>
            <li>Geofencing and location-based alerts</li>
            <li>Screen-time monitoring and management</li>
            <li>App blocking or app-use restrictions</li>
            <li>Website and content filtering</li>
            <li>Screen mirroring</li>
            <li>Remote camera access</li>
            <li>Ambient sound or surrounding-audio access</li>
            <li>Call or SMS-related information</li>
            <li>Notification monitoring</li>
            <li>App usage reports</li>
          </ul>
          <p>
            Not all features may be available on every device, operating
            system, app version, region, or subscription plan. Due to
            technical and platform limitations, Android and iPhone devices
            may not support the same features or may provide different
            levels of functionality.
          </p>
        </Section>

        <Section num="2" title="Who May Use Safetly">
          <p>Safetly is intended only for:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Parents or legal guardians</li>
            <li>Their children or minors under their care</li>
            <li>Authorized family devices under the parent&apos;s or guardian&apos;s lawful supervision</li>
          </ul>
          <p>
            A person must be at least 18 years old to create or manage a
            parent or guardian account.
          </p>
          <p>
            Children under the age of 16 may not independently create or
            manage a parent or guardian account. A child&apos;s device may
            be connected to Safetly only by or under the supervision of a
            parent or legal guardian.
          </p>
          <p>
            Parents and legal guardians are responsible for ensuring that
            they provide any notices and obtain any permissions or
            consents required by applicable law before using Safetly in
            connection with a child or a child&apos;s device.
          </p>
        </Section>

        <Section num="3" title="Authorized Use">
          <p>You may use Safetly only to monitor, manage, or protect the following:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Your own child</li>
            <li>Your own device</li>
            <li>A device that you lawfully own, control, or have the legal authority to supervise</li>
          </ul>
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-amber-800">
            You must not use Safetly to secretly monitor, track, control,
            or surveil another adult&apos;s device, including the device
            of a spouse, partner, friend, colleague, employee, or any
            other person, unless that person has provided clear consent
            and the use is lawful under applicable law.
          </p>
          <p>By using Safetly, you represent and confirm that:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>You have the legal right or authority to use Safetly on each connected device</li>
            <li>You have obtained all required permissions and consents</li>
            <li>You will not violate any law, privacy right, or third-party right</li>
            <li>You will use Safetly only for lawful parental control and family-safety purposes</li>
          </ul>
        </Section>

        <Section num="4" title="Account Registration and Security">
          <p>You may be required to create a Safetly account to access certain services.</p>
          <p>
            You agree to provide accurate, complete, and up-to-date
            information when creating or maintaining your account.
          </p>
          <p>You are responsible for protecting the confidentiality of your:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Password</li>
            <li>Login credentials</li>
            <li>Verification codes</li>
            <li>Account information</li>
            <li>Other security information</li>
          </ul>
          <p>
            You are responsible for activities performed through your
            account. If you suspect unauthorized access, account misuse,
            or suspicious activity, you should contact Safetly Support
            promptly.
          </p>
          <p>
            Safetly will never ask for your password, OTP, bKash PIN,
            Nagad PIN, Rocket PIN, or other confidential payment security
            information.
          </p>
        </Section>

        <Section num="5" title="Device Connection and Required Permissions">
          <p>
            Certain Safetly features may require permissions on a
            connected device. Depending on the feature and platform, these
            permissions may include:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Location access</li>
            <li>Notification access</li>
            <li>App-usage access</li>
            <li>Camera access</li>
            <li>Microphone access</li>
            <li>Screen recording or screen-sharing permission</li>
            <li>Call or SMS-related permissions</li>
            <li>Permission to operate in the background</li>
            <li>Other permissions required by the device operating system</li>
          </ul>
          <p>
            Safetly may use granted permissions only to provide, operate,
            maintain, secure, and improve the relevant services and
            features, subject to the applicable privacy policy.
          </p>
          <p>
            If you deny, disable, revoke, or restrict a required
            permission, certain features may function only partially or
            may stop working entirely.
          </p>
        </Section>

        <Section num="6" title="Location Services and Geofencing">
          <p>
            Live location, location history, and geofencing features may
            depend on GPS, mobile networks, Wi-Fi, internet connectivity,
            device settings, operating-system services, battery status,
            and other technical systems.
          </p>
          <p>Location information may be inaccurate, delayed, incomplete, or unavailable due to factors such as:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Weak or unavailable GPS signals</li>
            <li>Poor internet or mobile-network connectivity</li>
            <li>The device being powered off</li>
            <li>Location services being disabled</li>
            <li>Low or depleted battery</li>
            <li>Operating-system restrictions</li>
            <li>Background activity restrictions</li>
            <li>Device or software limitations</li>
          </ul>
          <p>
            Geofence alerts are intended as helpful tools only. They are
            not emergency services, guarantees of safety, or systems for
            detecting immediate danger.
          </p>
        </Section>

        <Section num="7" title="Screen Mirroring, Remote Camera, and Ambient Sound">
          <p>
            Screen mirroring, remote camera, and ambient-sound features
            may involve sensitive information. These features may be used
            only on:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Your child&apos;s device</li>
            <li>Your own device</li>
            <li>A family device that you are legally authorized to supervise</li>
          </ul>
          <p>
            You are responsible for complying with all applicable laws,
            platform requirements, permission requirements, notice
            obligations, and consent requirements before using these
            features.
          </p>
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-amber-800">
            You must not use Safetly to secretly record private
            conversations, monitor individuals in private locations,
            harass or intimidate anyone, blackmail anyone, or unlawfully
            collect or disclose personal information.
          </p>
        </Section>

        <Section num="8" title="Call, SMS, and Notification-Related Information">
          <p>
            Certain Safetly features may display call-related information,
            SMS-related information, or device notifications, where
            technically supported and legally permitted.
          </p>
          <p>The availability and functionality of these features may vary based on:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Device type</li>
            <li>Operating system</li>
            <li>App version</li>
            <li>Device permissions</li>
            <li>Platform restrictions</li>
            <li>Applicable law</li>
          </ul>
          <p>
            Any information accessed through these features must be used
            only for lawful parental supervision, child protection, and
            family-safety purposes.
          </p>
          <p>
            You must not unlawfully collect, disclose, publish, sell,
            share, or misuse another person&apos;s personal information.
          </p>
        </Section>

        <Section num="9" title="Content Filtering and App Blocking">
          <p>
            Safetly may help identify, filter, restrict, or block
            websites, applications, or content that may be inappropriate,
            harmful, or unsuitable for a child&apos;s age.
          </p>
          <p>However, no filtering or blocking system is completely accurate or effective in every situation. For example:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Harmful content may not always be detected or blocked</li>
            <li>Safe or appropriate content may be blocked by mistake</li>
            <li>New, unknown, encrypted, or technically altered content may bypass filters</li>
            <li>Third-party applications or platforms may change their behavior or technical systems</li>
          </ul>
          <p>
            Parents and guardians should regularly review their
            children&apos;s online activity and take appropriate safety
            measures.
          </p>
          <p>
            Safetly does not guarantee that all harmful or inappropriate
            content will be identified, filtered, or blocked.
          </p>
        </Section>

        <Section num="10" title="Screen Time and App Usage Reports">
          <p>
            Safetly may provide information about device usage, screen
            time, application activity, and related reports.
          </p>
          <p>Such information may be delayed, incomplete, estimated, or inaccurate due to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Device settings</li>
            <li>Operating-system limitations</li>
            <li>Internet connectivity</li>
            <li>Permission status</li>
            <li>Background activity restrictions</li>
            <li>Device or software errors</li>
          </ul>
          <p>
            Safetly reports are intended as helpful informational tools
            and should not be treated as the sole or conclusive evidence
            of a person&apos;s activity or behavior.
          </p>
        </Section>

        <Section num="11" title="Information Collection and Privacy">
          <p>
            Safetly may collect, process, store, or use certain
            information to provide, operate, maintain, secure, support,
            and improve the Services.
          </p>
          <p>Depending on how you use Safetly, such information may include:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Name, email address, mobile phone number</li>
            <li>Account information</li>
            <li>Device information</li>
            <li>Operating-system and app-version information</li>
            <li>Device-permission information</li>
            <li>Location information</li>
            <li>App-usage information</li>
            <li>Screen-time information</li>
            <li>Safetly feature-usage information</li>
            <li>Support requests and communications</li>
          </ul>
          <p>
            Information about how Safetly collects, uses, stores,
            protects, retains, and shares information will be described
            in the Safetly Privacy Policy.
          </p>
          <p>
            By using Safetly, you acknowledge that information may be
            processed in accordance with the applicable privacy policy and
            these terms.
          </p>
        </Section>

        <Section num="12" title="Children's Information and Parental Responsibilities">
          <p>
            Safetly is designed to support child safety. Parents and legal
            guardians are responsible for how Safetly is used in
            connection with children and children&apos;s devices.
          </p>
          <p>Parents and guardians must ensure that:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>They have the legal authority to connect and supervise the child&apos;s device</li>
            <li>All notices, permissions, and consents required by applicable law have been provided or obtained</li>
            <li>Children&apos;s information is used only for lawful, appropriate, and safety-related purposes</li>
            <li>The child&apos;s privacy, dignity, and best interests are respected</li>
          </ul>
          <p>
            Safetly is a support tool and is not a replacement for
            responsible parenting, communication, education, or
            appropriate direct supervision.
          </p>
        </Section>

        <Section num="13" title="Subscriptions and Premium Services">
          <p>
            Some Safetly features may be available free of charge, while
            other features may require a paid subscription or premium
            plan.
          </p>
          <p>Safetly may offer subscription plans with the following durations:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>30 days</li>
            <li>90 days</li>
            <li>180 days</li>
            <li>360 days</li>
          </ul>
          <p>
            The applicable price, duration, available features, device
            limits, and other relevant information will be displayed
            before payment is completed.
          </p>
          <p>
            Safetly may add, remove, modify, or discontinue subscription
            plans, prices, features, or benefits where permitted by
            applicable law.
          </p>
        </Section>

        <Section num="14" title="Payments and Renewals">
          <p>
            Safetly may accept payments through authorized payment
            gateways or mobile financial services in Bangladesh,
            including:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>bKash</li>
            <li>Nagad</li>
            <li>Rocket</li>
          </ul>
          <p>
            Premium features may be activated after successful payment and
            verification.
          </p>
          <p>
            If automatic renewal is offered, the applicable renewal terms
            and any automatic charges will be disclosed before the user
            subscribes or authorizes the relevant payment.
          </p>
          <p>
            Safetly will not intentionally collect an automatic payment
            without the authorization or consent required by applicable
            law and the relevant payment provider.
          </p>
          <p>
            If automatic renewal is not available, users must renew their
            subscriptions manually.
          </p>
          <p>
            Additional payment, billing, subscription, and renewal terms
            may be described in the Safetly Payment Policy.
          </p>
        </Section>

        <Section num="15" title="Refunds">
          <p>
            Under the Safetly Refund Policy, refund requests generally
            must be submitted within 7 (seven) calendar days from the date
            of purchase.
          </p>
          <p>
            If a refund is approved, Safetly will generally aim to process
            the refund within 10 (ten) business days from the date of
            approval.
          </p>
          <p>
            Submitting a refund request does not guarantee that a refund
            will be approved. Each request may be reviewed based on
            payment records, service usage, the nature of the issue,
            applicable policies, and applicable law.
          </p>
          <p>
            Subscription cancellation and refunds are separate processes.
            Canceling a subscription does not automatically entitle a user
            to a refund for unused subscription time.
          </p>
          <p>Additional refund terms are described in the Safetly Refund Policy.</p>
        </Section>

        <Section num="16" title="Prohibited Uses">
          <p>You must not use Safetly to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Secretly monitor, track, or control another adult&apos;s device</li>
            <li>Access another person&apos;s location, screen, camera, microphone, calls, SMS, or notifications without lawful authority and any required consent</li>
            <li>Harass, threaten, stalk, intimidate, or harm another person</li>
            <li>Collect, steal, disclose, publish, sell, or misuse personal information</li>
            <li>Violate privacy, data-protection, child-protection, communications, or surveillance laws</li>
            <li>Bypass, disable, interfere with, or damage Safetly&apos;s security systems</li>
            <li>Reverse engineer, modify, copy, decompile, or unlawfully distribute the Safetly application or software</li>
            <li>Introduce malware, harmful code, or unauthorized software</li>
            <li>Access another person&apos;s account without authorization</li>
            <li>Make fraudulent payments, chargeback claims, or false refund requests</li>
            <li>Use Safetly for any unlawful, harmful, deceptive, abusive, or unethical purpose</li>
          </ul>
        </Section>

        <Section num="17" title="Account Suspension or Termination">
          <p>
            Safetly may restrict, suspend, or terminate your account or
            access to some or all services where reasonably necessary,
            including if:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>You violate these Terms</li>
            <li>Safetly identifies unlawful or unauthorized surveillance</li>
            <li>Fraudulent, abusive, or harmful activity is detected</li>
            <li>Another person&apos;s safety, privacy, or rights may be at risk</li>
            <li>Suspension is required by applicable law, a lawful authority, or a legal process</li>
            <li>Action is necessary to protect the security or integrity of Safetly</li>
          </ul>
          <p>
            In cases of serious or repeated violations, Safetly may
            restrict future access to the Services.
          </p>
          <p>
            Where appropriate and legally required, Safetly may provide
            notice or an opportunity to address the issue.
          </p>
        </Section>

        <Section num="18" title="Third-Party Services">
          <p>Certain Safetly features may rely on third-party services, including:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Device operating systems</li>
            <li>Map or location services</li>
            <li>Payment gateways</li>
            <li>Mobile financial services</li>
            <li>Cloud-service providers</li>
            <li>Communication platforms</li>
            <li>Other technology providers</li>
          </ul>
          <p>
            Changes, outages, restrictions, or discontinuation of
            third-party services may affect Safetly&apos;s functionality.
          </p>
          <p>
            Third-party services may be governed by their own terms,
            privacy policies, and other rules. Safetly is not responsible
            for third-party services beyond the extent required by
            applicable law.
          </p>
        </Section>

        <Section num="19" title="Service Availability and Limitations">
          <p>Safetly aims to provide reliable and secure services. However, we do not guarantee that:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>The Services will always be available</li>
            <li>Every feature will work on every device</li>
            <li>All information will always be accurate or complete</li>
            <li>All harmful content will be blocked</li>
            <li>Location information will always be precise or real-time</li>
            <li>Every alert or notification will be delivered immediately</li>
            <li>The Services will be uninterrupted, secure, or error-free</li>
          </ul>
          <p>
            The Services may be temporarily unavailable because of
            maintenance, updates, security measures, technical problems,
            internet or network failures, server issues, operating-system
            changes, or third-party limitations.
          </p>
        </Section>

        <Section num="20" title="Emergency Situations">
          <p>
            Safetly is not an emergency service, law-enforcement service,
            medical service, emergency-response system, or guaranteed
            safety solution.
          </p>
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-amber-800">
            In an emergency, dangerous situation, or situation involving
            an immediate risk of harm, do not rely solely on Safetly&apos;s
            location, alerts, or other features. Contact local emergency
            services, law-enforcement authorities, medical services, or
            another appropriate authority directly.
          </p>
        </Section>

        <Section num="21" title="Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, Safetly
            will not be liable for indirect, incidental, special,
            consequential, or similar losses arising from:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Inaccurate, delayed, incomplete, or unavailable location information</li>
            <li>A feature not functioning as expected</li>
            <li>Failure to filter or block particular content</li>
            <li>Device, network, internet, operating-system, or software problems</li>
            <li>Third-party service interruptions or limitations</li>
            <li>User error, negligence, misuse, or unauthorized use</li>
            <li>Decisions made solely or primarily based on Safetly information or reports</li>
          </ul>
          <p>
            Nothing in these Terms limits or excludes any right or
            liability that cannot lawfully be limited or excluded.
          </p>
        </Section>

        <Section num="22" title="User Responsibility">
          <p>
            You are responsible for ensuring that your use of Safetly
            complies with applicable laws and respects the rights of
            children and other individuals.
          </p>
          <p>
            You may be responsible, to the extent permitted by applicable
            law, for claims, losses, damages, or legal consequences
            resulting from your:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Unlawful use of Safetly</li>
            <li>Unauthorized monitoring or surveillance</li>
            <li>Violation of privacy or data-protection rights</li>
            <li>Misuse of information obtained through Safetly</li>
            <li>Violation of these Terms</li>
          </ul>
          <p>
            You are responsible for understanding and complying with the
            privacy, child-protection, data-protection, communications,
            monitoring, and surveillance laws that apply in your country
            or region.
          </p>
        </Section>

        <Section num="23" title="Intellectual Property">
          <p>
            The Safetly application, name, logo, software, code, design,
            content, graphics, trademarks, and other intellectual-property
            materials are owned by Safetly or its licensors and are
            protected by applicable laws.
          </p>
          <p>
            Except as expressly permitted by law or with prior written
            authorization, you may not copy, reproduce, modify,
            distribute, sell, publish, license, or commercially exploit
            Safetly materials.
          </p>
        </Section>

        <Section num="24" title="Changes to These Terms">
          <p>Safetly may modify or update these Terms when necessary.</p>
          <p>
            If a change is material, Safetly may provide notice through
            the app, website, email, notification, or another appropriate
            method, where required by applicable law.
          </p>
          <p>
            The updated Terms may take effect on the date stated in the
            updated version. Your continued use of Safetly after the
            updated Terms take effect may constitute acceptance of those
            Terms, where permitted by applicable law.
          </p>
        </Section>

        <Section num="25" title="Governing Law and Dispute Resolution">
          <p>
            These Terms will be governed by and interpreted in accordance
            with the applicable laws of Bangladesh, unless another
            mandatory law applies.
          </p>
          <p>
            If a dispute, concern, or complaint arises, the parties should
            first attempt to resolve the matter through Safetly Support.
          </p>
          <p>
            If the matter cannot be resolved informally, it may be
            referred to the appropriate court, authority, or legal process
            with jurisdiction under applicable law.
          </p>
          <p>
            Nothing in this section limits any mandatory consumer or legal
            rights that apply to you.
          </p>
        </Section>

        <Section num="26" title="Contact Information">
          <p>
            If you have questions about these Terms, Safetly, your
            account, payments, refunds, or the Services, please contact:
          </p>
          <p className="font-medium text-slate-800">
            Safetly Authority
            <br />
            Support Email:{" "}
            <a href="mailto:support@safetly.app" className="text-violet-600 hover:underline">
              support@safetly.app
            </a>
          </p>
        </Section>

        <Section num="27" title="Acceptance of These Terms">
          <p>
            By downloading, installing, registering for, subscribing to,
            accessing, or using Safetly, you confirm that:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>You have read and understood these Terms</li>
            <li>You agree to comply with these Terms</li>
            <li>You will use Safetly only for lawful parental-control and family-safety purposes</li>
            <li>You will not secretly monitor another adult&apos;s device</li>
            <li>You will use Safetly only on your child&apos;s device, your own device, or another device that you are legally authorized to supervise</li>
            <li>You will comply with applicable laws relating to privacy, children&apos;s safety, data protection, communications, monitoring, and surveillance</li>
            <li>You understand that Safetly is a support tool and does not guarantee complete safety, uninterrupted service, or perfect accuracy</li>
          </ul>
        </Section>
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