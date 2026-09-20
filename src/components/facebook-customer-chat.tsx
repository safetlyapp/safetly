'use client';

import Script from 'next/script';

const facebookPageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;

declare global {
  interface Window {
    FB?: {
      XFBML?: {
        parse: (root?: HTMLElement) => void;
      };
    };
  }
}

function configureChat(node: HTMLDivElement | null) {
  if (!node || !facebookPageId) return;

  node.setAttribute('page_id', facebookPageId);
  node.setAttribute('attribution', 'biz_inbox');
  node.setAttribute('theme_color', '#ff6b00');
  node.setAttribute('logged_in_greeting', 'Hi! How can we help you?');
  node.setAttribute('logged_out_greeting', 'Hi! How can we help you?');
}

export default function FacebookCustomerChat() {
  if (!facebookPageId) return null;

  return (
    <>
      <div id="fb-root" />
      <div
        id="facebook-customer-chat"
        ref={configureChat}
        className="fb-customerchat"
      />
      <Script
        id="facebook-jssdk"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v23.0"
        strategy="afterInteractive"
        onLoad={() =>
          window.FB?.XFBML?.parse(
            document.getElementById('facebook-customer-chat') ?? undefined
          )
        }
      />
    </>
  );
}
