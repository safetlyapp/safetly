import Link from 'next/link';

const facebookPageUrl =
  process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL ?? 'https://facebook.com';

export default function MessengerChatButton() {
  return (
    <Link
      href={facebookPageUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on Facebook Messenger"
      className="fixed right-5 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0084ff] text-white shadow-lg shadow-blue-500/30 transition hover:scale-105 hover:bg-[#0077e6] focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none"
    >
      <MessengerIcon className="h-7 w-7" />
      <span className="sr-only">Chat with us on Facebook Messenger</span>
    </Link>
  );
}

function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.25c-5.52 0-9.75 4.1-9.75 9.45 0 2.98 1.4 5.65 3.6 7.4v2.65l2.58-1.42c1.1.3 2.3.47 3.57.47 5.52 0 9.75-4.1 9.75-9.45S17.52 2.25 12 2.25Zm.97 12.72-2.48-2.64-4.84 2.64 5.33-5.66 2.54 2.64 4.78-2.64-5.33 5.66Z" />
    </svg>
  );
}
