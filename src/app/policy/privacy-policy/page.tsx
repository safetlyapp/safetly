import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Safetly",
  description:
    "Safetly's Privacy Policy explaining what information is collected, how it's used, protected, and your rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 text-sm leading-relaxed text-slate-600">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Safetly Privacy Policy
        </h2>
        <p className="mt-3 text-slate-600">
          Welcome to Safetly. Safetly (&quot;Safetly,&quot; &quot;we,&quot;
          &quot;us,&quot; &quot;our,&quot; or &quot;Safetly Authority&quot;)
          is a Parental Control and Family Safety application designed to
          help parents and legal guardians support their children&apos;s
          online safety, monitor and manage digital activity, supervise
          device usage, and promote family safety.
        </p>
        <p className="mt-2 text-slate-600">This Privacy Policy explains:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>What information Safetly may collect or process</li>
          <li>Why and how we use information</li>
          <li>Where and for how long information may be retained</li>
          <li>How we seek to protect information</li>
          <li>When information may be shared</li>
          <li>How children&apos;s information is handled</li>
          <li>What rights users may have regarding their information</li>
        </ul>
        <p className="mt-3 text-slate-600">
          By downloading, installing, registering for, subscribing to,
          accessing, or using the Safetly application, website, or related
          services, you acknowledge that you have read and understood this
          Privacy Policy.
        </p>
        <p className="mt-2 rounded-lg bg-amber-50 px-4 py-3 text-amber-800">
          If you do not agree with any part of this Privacy Policy, please
          do not use Safetly.
        </p>
      </div>

      <div className="space-y-8">
        <Section num="1" title="Purpose and Features of Safetly">
          <p>
            Safetly is primarily designed for parents and legal guardians.
            The application may provide tools that help parents supervise
            children&apos;s online safety, digital activities, and device
            usage.
          </p>
          <p>
            Depending on the device, operating system, application version,
            permissions granted, subscription plan, and technical
            limitations, Safetly may offer features such as:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Live location</li>
            <li>Location history</li>
            <li>Geofencing and location-based alerts</li>
            <li>Screen-time monitoring and management</li>
            <li>App usage monitoring</li>
            <li>App blocking or usage restrictions</li>
            <li>Website and content filtering</li>
            <li>Screen mirroring</li>
            <li>Remote camera access</li>
            <li>Ambient sound or audio-related features</li>
            <li>Call or SMS-related information</li>
            <li>Device notification viewing</li>
            <li>App usage reports</li>
          </ul>
          <p>
            Not all features may be available on every Android or iPhone
            device. Feature availability and functionality may vary due to
            operating-system restrictions, device manufacturers, app-store
            policies, platform requirements, permissions, and technical
            limitations.
          </p>
        </Section>

        <Section num="2" title="Information We May Collect or Process">
          <p>
            Safetly may collect or process different types of information
            as necessary to provide, operate, secure, support, and improve
            our services.
          </p>

          <SubSection title="2.1 Information You Provide">
            <p>
              When you create a Safetly account, sign in, purchase a
              subscription, contact support, or otherwise communicate with
              us, you may provide information such as:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Name</li>
              <li>Email address</li>
              <li>Mobile phone number</li>
              <li>Account and profile information</li>
              <li>Support requests or communications</li>
              <li>Other information you voluntarily provide</li>
            </ul>
            <p className="mt-2">
              You are responsible for ensuring that the information you
              provide is accurate, complete, and up to date.
            </p>
          </SubSection>

          <SubSection title="2.2 Device and Technical Information">
            <p>
              Safetly may collect or process certain device and technical
              information to operate the application, identify technical
              issues, maintain security, and improve service performance,
              including device type and model, operating system and
              version, app version, language/region, permission status,
              performance and error information, and limited network
              information.
            </p>
          </SubSection>

          <SubSection title="2.3 Location Information">
            <p>
              When the required permissions are granted by the parent,
              legal guardian, or authorized user, Safetly may collect or
              process location-related information, including current or
              live location, location history, geofence-related
              information, and location update times.
            </p>
            <p className="mt-2">
              Location information may depend on GPS, Wi-Fi, mobile
              networks, internet connectivity, and the device&apos;s
              location services, and may not always be accurate, current,
              continuous, or available.
            </p>
          </SubSection>

          <SubSection title="2.4 App Usage and Screen-Time Information">
            <p>
              To support parental supervision and screen-time management,
              Safetly may process information such as applications used,
              app usage times, total screen time, duration of app usage,
              app blocking or restriction status, and device usage
              summaries or reports.
            </p>
          </SubSection>

          <SubSection title="2.5 Website and Content-Related Information">
            <p>
              When content filtering or web-safety features are enabled,
              Safetly may process website, domain, URL, or content-category
              information to identify inappropriate or potentially harmful
              content, block or restrict selected websites, and support
              safer browsing.
            </p>
            <p className="mt-2">
              No filtering system can guarantee that all content will be
              identified, categorized, blocked, or filtered accurately in
              every situation.
            </p>
          </SubSection>

          <SubSection title="2.6 Screen Mirroring, Remote Camera, and Ambient Sound">
            <p>
              These features may be used for parental supervision and
              family-safety purposes. Information transmitted through
              these features is transmitted in encrypted form through
              secure communication systems to help reduce the risk of
              unauthorized access while the information is being
              transmitted.
            </p>
            <p className="mt-2">
              Live information transmitted through these features is not
              permanently stored on Safetly&apos;s servers. It may be
              temporarily processed or transmitted only for the limited
              period necessary to operate the relevant feature and display
              it live to the authorized Parent Account. Safetly does not
              intentionally record, archive, or permanently retain live
              screen content, camera content, or ambient audio.
            </p>
          </SubSection>

          <SubSection title="2.7 Call, SMS, and Notification-Related Information">
            <p>
              Subject to device capabilities, operating-system
              restrictions, granted permissions, and applicable law,
              Safetly may process or display certain call, SMS, or
              notification-related information to an authorized Parent
              Account, transmitted using encrypted methods.
            </p>
            <p className="mt-2">
              This information is not permanently stored on Safetly&apos;s
              servers, and is not intentionally retained permanently, sold,
              or used for advertising purposes. Availability and
              functionality may vary depending on the device, operating
              system, internet connection, technical limitations, and
              applicable platform policies.
            </p>
          </SubSection>
        </Section>

        <Section num="3" title="How We Use Information">
          <p>Safetly may use collected or processed information to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Create and manage Safetly accounts</li>
            <li>Provide and operate Safetly features and services</li>
            <li>Connect parent and child devices</li>
            <li>Operate live-location, location-history, and geofencing features</li>
            <li>Generate screen-time, app-usage, and activity reports</li>
            <li>Apply app-blocking, content-filtering, and other parental controls</li>
            <li>Display relevant information to authorized Parent Accounts</li>
            <li>Manage subscriptions and premium services</li>
            <li>Verify payments or provide payment-related support</li>
            <li>Respond to user questions and support requests</li>
            <li>Identify and resolve technical issues</li>
            <li>Improve the functionality, stability, security, and reliability of the application</li>
            <li>Prevent misuse, fraud, unauthorized access, or other harmful activity</li>
            <li>Comply with applicable laws, legal obligations, or valid legal requests</li>
          </ul>
        </Section>

        <Section num="4" title="Device Permissions">
          <p>Certain Safetly features may require specific device permissions, including:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Location permission</li>
            <li>Notification access</li>
            <li>App usage or Usage Access permission</li>
            <li>Camera permission</li>
            <li>Microphone permission</li>
            <li>Screen-sharing or screen-recording permission</li>
            <li>Call or SMS-related permissions</li>
            <li>Permission to operate in the background</li>
            <li>Other permissions required for specific features</li>
          </ul>
          <p>
            You may disable or withdraw certain permissions at any time
            through your device settings. However, disabling required
            permissions may cause some Safetly features to function
            partially, become unavailable, or stop working.
          </p>
        </Section>

        <Section num="5" title="Children's Information and Parental Responsibilities">
          <p>
            Safetly is designed to support children&apos;s digital safety.
            Parents or legal guardians are responsible for connecting and
            supervising children&apos;s devices through Safetly.
          </p>
          <p>Parents or legal guardians are responsible for ensuring that:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>They have the legal authority to supervise the child&apos;s device</li>
            <li>Any required permission or consent has been obtained under applicable law</li>
            <li>Children&apos;s information is used only for lawful, safe, and appropriate purposes</li>
            <li>The child&apos;s privacy, dignity, rights, and best interests are considered</li>
          </ul>
          <p>
            Safetly is not a substitute for responsible parenting,
            communication with children, education, or direct supervision.
          </p>
        </Section>

        <Section num="6" title="How We May Share Information">
          <p>Safetly does not generally sell users&apos; personal information.</p>
          <p>
            However, we may share limited information when necessary to
            operate our services or comply with legal requirements,
            including with:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>The relevant authorized Parent Account</li>
            <li>Cloud, server, or data-hosting service providers</li>
            <li>Payment gateways or payment-service providers</li>
            <li>Email, notification, or technical-service providers</li>
            <li>Customer-support or security-service providers</li>
            <li>Government authorities, courts, or other parties when required by law, a court order, or a valid legal request</li>
            <li>Other parties when reasonably necessary to protect the rights, safety, security, users, or services of Safetly</li>
          </ul>
          <p>
            When information is shared, we may take appropriate steps to
            help protect its confidentiality and security.
          </p>
        </Section>

        <Section num="7" title="Payment-Related Information">
          <p>
            Payments for Safetly Premium or other paid services may be
            processed through bKash, Nagad, Rocket, or other approved
            payment gateways.
          </p>
          <p>Safetly does not normally request or seek to store your:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>bKash PIN</li>
            <li>Nagad PIN</li>
            <li>Rocket PIN</li>
            <li>One-Time Password (OTP)</li>
            <li>Confidential payment password</li>
          </ul>
          <p>
            Payment-service providers may process payment-related
            information under their own privacy policies, security
            practices, and terms.
          </p>
        </Section>

        <Section num="8" title="Information Security">
          <p>
            Safetly uses reasonable technical, administrative, and
            organizational measures designed to help protect user
            information.
          </p>
          <p>
            Encryption technology is used during the transmission of
            information associated with screen mirroring, remote camera,
            ambient sound, call/SMS, and notification-related features to
            help reduce the risk of unauthorized access during
            transmission.
          </p>
          <p>
            The sensitive information transmitted through these features
            is not permanently stored on Safetly&apos;s servers. Safetly
            does not sell this information or use it for advertising or
            advertising-based user profiling.
          </p>
          <p>
            However, no internet connection, mobile network, electronic
            communication system, or data-storage method is completely
            secure or risk-free. Therefore, Safetly cannot guarantee
            absolute security or prevent every unauthorized access attempt.
          </p>
          <p>
            You are responsible for keeping your account password, OTP,
            and login information confidential.
          </p>
        </Section>

        <Section num="9" title="Data Retention">
          <p>Safetly may retain information only for as long as reasonably necessary to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Provide and maintain our services</li>
            <li>Manage user accounts</li>
            <li>Provide security and technical support</li>
            <li>Resolve disputes, complaints, or service-related issues</li>
            <li>Meet legal, accounting, or regulatory obligations</li>
            <li>Fulfill legitimate operational purposes</li>
          </ul>
          <p>
            The following information transmitted through Safetly features
            is not permanently stored on Safetly&apos;s servers:
            screen-mirroring information, remote-camera information,
            ambient-sound information, call-related information,
            SMS-related information, and device-notification information.
          </p>
          <p>
            This information may be temporarily processed or transmitted
            in encrypted form only for the limited period necessary to
            operate the relevant feature or display it to an authorized
            parent account.
          </p>
          <p>
            Account information, subscription information, payment
            records, device-related information, location information,
            security logs, or information required by law may be retained
            for different periods depending on the nature of the
            information, service requirements, and applicable legal
            obligations.
          </p>
        </Section>

        <Section num="10" title="Your Information Rights">
          <p>Subject to applicable law, you may have the right to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Request information about your personal data</li>
            <li>Request a copy of certain personal information</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Request deletion of information in certain circumstances</li>
            <li>Object to certain types of information processing</li>
            <li>Withdraw certain permissions or consent</li>
            <li>Request closure of your Safetly account</li>
            <li>Submit questions, concerns, or complaints regarding this Privacy Policy</li>
          </ul>
          <p>
            Some requests may not be fully fulfilled due to legal
            requirements, security concerns, technical limitations, or
            lawful record-retention obligations.
          </p>
        </Section>

        <Section num="11" title="Account Closure and Data Deletion">
          <p>
            You may request the closure of your Safetly account or the
            deletion of eligible information.
          </p>
          <p>
            After an account is closed, some information may not be
            deleted immediately. Certain information may be retained for a
            limited period when necessary for security, fraud prevention,
            dispute resolution, payment records, legal obligations, or
            other legitimate purposes.
          </p>
          <p>
            To request account closure or data deletion, contact:{" "}
            <a href="mailto:support@safetly.app" className="font-medium text-violet-600 hover:underline">
              support@safetly.app
            </a>
          </p>
        </Section>

        <Section num="12" title="Third-Party Services">
          <p>Safetly may rely on third-party technologies or services, including:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Cloud and server services</li>
            <li>Map or location services</li>
            <li>Payment services</li>
            <li>Operating-system services</li>
            <li>App stores</li>
            <li>Notification or communication services</li>
            <li>Technical analytics or security services</li>
          </ul>
          <p>
            These third-party services may have their own privacy policies
            and terms of service. We encourage users to review the privacy
            policies and terms of any third-party services they use.
          </p>
        </Section>

        <Section num="13" title="Third-Party Websites and Links">
          <p>
            The Safetly application or website may contain links to
            third-party websites, applications, or services.
          </p>
          <p>
            Safetly does not control and is not responsible for the
            privacy practices, security, content, or policies of
            third-party websites or services.
          </p>
          <p>
            You should review the applicable privacy policies and terms
            before using any third-party service.
          </p>
        </Section>

        <Section num="14" title="Changes to This Privacy Policy">
          <p>Safetly may update or modify this Privacy Policy from time to time.</p>
          <p>
            When significant changes are made, we may provide notice
            through the application, website, email, notification, or
            another appropriate method, where required or appropriate.
          </p>
          <p>The updated Privacy Policy will include a revised &quot;Last Updated&quot; date.</p>
          <p>
            Your continued use of Safetly after an updated Privacy Policy
            becomes effective may be treated, where permitted by
            applicable law, as acceptance of the updated policy.
          </p>
        </Section>

        <Section num="15" title="Authorized Use of Safetly">
          <p>Safetly may be used only for:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Your own child&apos;s device</li>
            <li>Your own device</li>
            <li>A device that you are legally authorized to supervise</li>
          </ul>
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-amber-800">
            Using Safetly to secretly monitor, track, control, or surveil
            another adult&apos;s device without lawful authority or
            required consent is prohibited.
          </p>
          <p>
            Users must comply with applicable privacy, data-protection,
            child-protection, communication, monitoring, and surveillance
            laws when using Safetly.
          </p>
        </Section>

        <Section num="16" title="Emergency Situations">
          <p>
            Safetly is not an emergency service, law-enforcement service,
            medical service, or emergency-response system.
          </p>
          <p>
            Location information, geofence alerts, notifications, and
            other Safetly features may not always be immediate, accurate,
            continuous, or available.
          </p>
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-amber-800">
            Do not rely solely on Safetly during an emergency or dangerous
            situation. If immediate assistance is required, contact local
            emergency services, law-enforcement authorities, medical
            services, or other appropriate authorities directly.
          </p>
        </Section>

        <Section num="17" title="Contact Us">
          <p>
            If you have any questions, requests, concerns, or complaints
            regarding this Privacy Policy, your information, your account,
            or Safetly services, please contact us:
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

        <Section num="18" title="Acceptance of This Privacy Policy">
          <p>
            By downloading, installing, registering for, subscribing to,
            accessing, or using Safetly or its related services, you
            acknowledge and agree that:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>You have read and understood this Privacy Policy</li>
            <li>Your information may be collected or processed as described in this Privacy Policy</li>
            <li>You will use Safetly only for lawful Parental Control and Family Safety purposes</li>
            <li>You will use Safetly only on your own device, your child&apos;s device, or a device you are legally authorized to supervise</li>
            <li>You are responsible for obtaining any required permissions and, where applicable, consent</li>
            <li>You will comply with applicable laws</li>
            <li>You will respect the privacy and legal rights of others</li>
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
      <div className="text-slate-600">{children}</div>
    </div>
  );
}