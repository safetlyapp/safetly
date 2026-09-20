'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Activity,
  Baby,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Grid2x2,
  LogOut,
  MoreHorizontal,
  Receipt,
  ShieldCheck,
  Tag,
  Ticket,
  UserRound,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Account = {
  role: 'kid' | 'parent';
  identifier: string;
  accountId?: string;
  email?: string;
  username?: string;
  name?: string;
};
type Child = {
  name: string;
  id: string;
  device: string;
  active: boolean;
  lastSeen: string;
  expireDate: string | null;
  isPremium: boolean;
  daysRemaining: number;
};
type DashboardData =
  | {
      role: 'parent';
      children: Child[];
      activeCount: number;
      connectionStatus: string;
    }
  | {
      role: 'kid';
      device: { active: boolean; status: string; message: string };
      subscription: {
        packageName: string;
        isTrial?: boolean;
        originalAmount: number;
        discountAmount: number;
        paidAmount: number;
        paidAt: string;
        paymentStatus:
          | 'approved'
          | 'pending'
          | 'rejected'
          | 'held_for_review'
          | 'manual_review';
        orderId: string;
        transactionId: string;
        expireDate: string;
        daysRemaining: number;
      } | null;
      paymentHistory: Array<{
        orderId: string;
        transactionId: string;
        submittedAmount: number;
        verifiedAmount: number | null;
        packageName: string;
        originalAmount: number | null;
        discountAmount: number | null;
        status: string;
        paidAt: string;
      }>;
    };

export default function DashboardPage() {
  const router = useRouter();
  const [account] = useState<Account | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const raw = window.localStorage.getItem('Seftly-account');
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as Account;
    } catch {
      window.localStorage.removeItem('Seftly-account');
      return null;
    }
  });
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [productsOpen, setProductsOpen] = useState(true);

  useEffect(() => {
    if (!account) {
      router.replace('/login');
      return;
    }

    const token = window.localStorage.getItem('Seftly-token') ?? '';
    fetch(
      `/api/dashboard?role=${account.role}&identifier=${encodeURIComponent(account.identifier)}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
      .then((response) => {
        if (!response.ok) throw new Error('Could not load dashboard data.');
        return response.json() as Promise<DashboardData>;
      })
      .then(setData)
      .catch(() =>
        setError('Could not load your dashboard. Please try again.')
      );
  }, [account, router]);

  function signOut() {
    window.localStorage.removeItem('Seftly-account');
    window.localStorage.removeItem('Seftly-token');
    router.replace('/login');
  }

  if (!account || !data) {
    if (error)
      return (
        <div className="flex min-h-[70vh] items-center justify-center text-sm text-red-600">
          {error}
        </div>
      );
    return <div className="min-h-[70vh] bg-slate-50" />;
  }

  const isParent = account.role === 'parent';

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-4 sm:p-6">
      <div className="mx-auto flex max-w-6xl overflow-hidden rounded-2xl bg-white shadow-sm">
        <aside className="hidden w-64 shrink-0 border-r border-slate-100 p-6 md:block">
          <h2 className="mb-8 text-lg font-semibold text-slate-900">
            User Center
          </h2>
          <div className="mb-2 flex flex-col items-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-500">
              {account.identifier.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex max-w-full items-center gap-1.5">
              <span className="truncate text-[15px] font-semibold text-slate-900">
                Hi, {account.identifier}
              </span>
              <span>🏅</span>
            </div>
          </div>
          <nav className="mt-8 space-y-1">
            <a
              href="#dashboard"
              className="flex items-center gap-2.5 rounded-lg bg-indigo-50 px-3 py-2.5 text-[14px] font-semibold text-indigo-700"
            >
              <ShieldCheck className="h-4 w-4" /> Dashboard
            </a>
            <button
              type="button"
              onClick={() => setProductsOpen((value) => !value)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Grid2x2 className="h-4 w-4" /> Manage Product(s)
              <ChevronDown
                className={`ml-auto h-3.5 w-3.5 text-slate-400 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {productsOpen && (
              <div className="ml-7 space-y-1 border-l border-slate-100 pl-4">
                <a
                  href="#premium"
                  className="block rounded-lg py-2 text-[13.5px] text-slate-500 hover:text-slate-900"
                >
                  Seftly Parental Control
                </a>
                <a
                  href="/dashboard/billing-history"
                  className="block rounded-lg py-2 text-[13.5px] text-slate-500 hover:text-slate-900"
                >
                  Payment history
                </a>
              </div>
            )}
            <a
              href="/checkout"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Ticket className="h-4 w-4" /> Redeem Activation Code
            </a>
            <a
              href="/dashboard/billing-history"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Receipt className="h-4 w-4" /> Billing History
            </a>
          </nav>
        </aside>
        <main id="dashboard" className="min-w-0 flex-1 p-5 sm:p-8">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-600">
                <ShieldCheck className="h-5 w-5" /> Seftly dashboard
              </div>
              <h1 className="text-xl font-semibold text-slate-900">
                Account Settings
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
              <Button
                variant="outline"
                onClick={signOut}
                className="gap-2 bg-white"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </div>
          </header>

          <AccountDetails account={account} />

          {isParent ? (
            <>
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <SummaryCard
                  icon={<Baby className="h-5 w-5" />}
                  label="Children"
                  value={String(
                    data.role === 'parent' ? data.children.length : 0
                  )}
                />
                <SummaryCard
                  icon={<Wifi className="h-5 w-5" />}
                  label="Active now"
                  value={String(data.role === 'parent' ? data.activeCount : 0)}
                  tone="green"
                />
                <SummaryCard
                  icon={<Activity className="h-5 w-5" />}
                  label="Connection status"
                  value={
                    data.role === 'parent' ? data.connectionStatus : 'Protected'
                  }
                  tone="purple"
                />
              </div>
              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Children</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {data.role === 'parent' &&
                    data.children.map((child) => (
                      <ChildCard key={child.id} child={child} />
                    ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="w-full border-slate-200/80 shadow-sm">
              <CardContent className="p-8">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <CheckCircle2 className="h-7 w-7" />
                    <div>
                      <p className="font-semibold">
                        Your device is{' '}
                        {data.role === 'kid' && data.device.active
                          ? 'active'
                          : 'inactive'}
                      </p>
                      <p className="mt-1 text-sm text-emerald-700/80">
                        {data.role === 'kid' ? data.device.message : ''}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm">
                  <span className="text-slate-500">Connection</span>
                  <span className="flex items-center gap-2 font-medium text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />{' '}
                    Active
                  </span>
                </div>
                {data.role === 'kid' && data.subscription && (
                  <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50/60 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-purple-600">
                          Premium plan
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-slate-900">
                          {data.subscription.packageName}
                        </h2>
                      </div>
                      {data.subscription.isTrial ? (
                        <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">Active trial</span>
                      ) : <PaymentStatus status={data.subscription.paymentStatus} />}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <SubscriptionStat
                        label="Paid"
                        value={`৳${data.subscription.paidAmount.toFixed(2)}`}
                      />
                      <SubscriptionStat
                        label="Discount"
                        value={`৳${data.subscription.discountAmount.toFixed(2)}`}
                        icon={<Tag className="h-3.5 w-3.5" />}
                      />
                      <SubscriptionStat
                        label="Days left"
                        value={String(data.subscription.daysRemaining)}
                      />
                    </div>
                    <div className="mt-4 space-y-1 text-xs text-slate-500">
                      {!data.subscription.isTrial && data.subscription.paidAt ? <p>Paid on {new Date(data.subscription.paidAt).toLocaleString()}</p> : <p>Trial started for your child account</p>}
                      {!data.subscription.isTrial && data.subscription.orderId ? <p>Order ID: {data.subscription.orderId}</p> : null}
                      {!data.subscription.isTrial && data.subscription.transactionId ? <p>Transaction ID: {data.subscription.transactionId}</p> : null}
                      <p>
                        Expires on{' '}
                        {new Date(
                          data.subscription.expireDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

function SubscriptionStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-3">
      <p className="flex items-center gap-1 text-xs text-slate-500">
        {icon}
        {label}
      </p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function PaymentStatus({
  status,
}: {
  status:
    'approved' | 'pending' | 'rejected' | 'held_for_review' | 'manual_review';
}) {
  const approved = status === 'approved';
  const pending =
    status === 'pending' ||
    status === 'held_for_review' ||
    status === 'manual_review';
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${approved ? 'bg-emerald-100 text-emerald-700' : pending ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}
    >
      {approved
        ? 'Payment approved'
        : pending
          ? 'Payment under review'
          : 'Payment rejected'}
    </span>
  );
}

function AccountDetails({ account }: { account: Account }) {
  const [editing, setEditing] = useState<'email' | 'password' | null>(null);
  const [newEmail, setNewEmail] = useState(account.email ?? '');
  const [emailPassword, setEmailPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [savingEmail, setSavingEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const email =
    account.email ??
    (account.identifier.includes('@') ? account.identifier : 'Not provided');
  const username =
    account.username ??
    (!account.identifier.includes('@') ? account.identifier : 'Not provided');
  return (
    <Card id="account-details" className="mb-6 rounded-xl border border-slate-100 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Account details</CardTitle>
          <span className="text-xs text-slate-400">
            Username is fixed; email can be updated
          </span>
          <span className="text-xs capitalize text-slate-500">
            {account.role} account
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <DetailRow
          label="Account ID"
          value={account.accountId ?? account.identifier}
        />
        <DetailRow
          label="Username"
          value={username}
        />
        <DetailRow
          label="Email"
          value={email}
          onChange={() => {
            setEditing('email');
            setNewEmail(account.email ?? email);
            setEmailError('');
            setEmailMessage('');
          }}
        />
        <DetailRow
          label="Password"
          value="••••••••"
          onChange={() => setEditing('password')}
        />
        {editing === 'email' ? (
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
            <p className="mb-3 text-sm font-medium text-slate-700">Change email</p>
            <form
              className="flex flex-wrap gap-2"
              onSubmit={async (event) => {
                event.preventDefault();
                setEmailError('');
                setEmailMessage('');
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {
                  setEmailError('Enter a valid email address.');
                  return;
                }
                if (!emailPassword) {
                  setEmailError('Enter your current password to continue.');
                  return;
                }
                const token = window.localStorage.getItem('Seftly-token');
                setSavingEmail(true);
                try {
                  const response = await fetch('/api/account/email', {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token ?? ''}`,
                    },
                    body: JSON.stringify({
                      newEmail: newEmail.trim().toLowerCase(),
                      currentPassword: emailPassword,
                    }),
                  });
                  const payload = (await response.json().catch(() => null)) as {
                    message?: string;
                    error?: string;
                  } | null;
                  if (!response.ok) {
                    setEmailError(payload?.error ?? 'Could not change email.');
                    return;
                  }
                  setEmailPassword('');
                  setEmailMessage(payload?.message ?? 'Email changed successfully.');
                } catch {
                  setEmailError('Unable to reach the account service.');
                } finally {
                  setSavingEmail(false);
                }
              }}
            >
              <input
                type="email"
                placeholder="New email address"
                autoComplete="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                className="h-9 min-w-56 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary"
              />
              <input
                type="password"
                placeholder="Current password"
                autoComplete="current-password"
                value={emailPassword}
                onChange={(event) => setEmailPassword(event.target.value)}
                className="h-9 min-w-48 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary"
              />
              <Button type="submit" size="sm" disabled={savingEmail}>
                {savingEmail ? 'Saving…' : 'Save email'}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>
            </form>
            {emailError ? <p className="mt-2 text-xs text-red-600">{emailError}</p> : null}
            {emailMessage ? <p className="mt-2 text-xs text-emerald-700">{emailMessage}</p> : null}
          </div>
        ) : editing === 'password' ? (
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
            <p className="mb-3 text-sm font-medium text-slate-700">Change password</p>
            <form
              className="grid gap-3 sm:grid-cols-3"
              onSubmit={async (event) => {
                event.preventDefault();
                setPasswordError('');
                setPasswordMessage('');
                if (!currentPassword || !newPassword || !confirmPassword) {
                  setPasswordError('Complete all password fields.');
                  return;
                }
                if (newPassword !== confirmPassword) {
                  setPasswordError('New passwords do not match.');
                  return;
                }
                const token = window.localStorage.getItem('Seftly-token');
                setSavingPassword(true);
                try {
                  const response = await fetch('/api/account/password', {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token ?? ''}`,
                    },
                    body: JSON.stringify({
                      currentPassword,
                      newPassword,
                      confirmPassword,
                    }),
                  });
                  const payload = (await response.json().catch(() => null)) as {
                    message?: string;
                    error?: string;
                  } | null;
                  if (!response.ok) {
                    setPasswordError(payload?.error ?? 'Could not change password.');
                    return;
                  }
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setPasswordMessage(payload?.message ?? 'Password changed successfully.');
                } catch {
                  setPasswordError('Unable to reach the account service.');
                } finally {
                  setSavingPassword(false);
                }
              }}
            >
              <input
                type="password"
                placeholder="Current password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary"
              />
              <input
                type="password"
                placeholder="New password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary"
              />
              <div className="flex gap-2 sm:col-span-3">
                <Button type="submit" size="sm" disabled={savingPassword}>
                  {savingPassword ? 'Saving…' : 'Save password'}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditing(null);
                    setPasswordError('');
                    setPasswordMessage('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
            {passwordError ? (
              <p className="mt-2 text-xs text-red-600">{passwordError}</p>
            ) : null}
            {passwordMessage ? (
              <p className="mt-2 text-xs text-emerald-700">{passwordMessage}</p>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function DetailRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: () => void;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-sm text-slate-700">{value}</span>
        {onChange ? (
          <button
            type="button"
            onClick={onChange}
            className="shrink-0 text-sm font-medium text-blue-600 hover:underline"
          >
            Change
          </button>
        ) : null}
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  tone = 'orange',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: 'orange' | 'green' | 'purple';
}) {
  const colors = {
    orange: 'bg-orange-100 text-orange-700',
    green: 'bg-emerald-100 text-emerald-700',
    purple: 'bg-purple-100 text-purple-700',
  };
  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[tone]}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ChildCard({ child }: { child: Child }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            <Baby className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{child.name}</p>
            <p className="text-xs text-slate-500">{child.device}</p>
          </div>
        </div>
        {child.active ? (
          <Wifi className="h-5 w-5 text-emerald-600" />
        ) : (
          <WifiOff className="h-5 w-5 text-slate-400" />
        )}
      </div>
      <div
        className={`flex items-center gap-2 text-sm font-medium ${child.active ? 'text-emerald-700' : 'text-slate-500'}`}
      >
        <span
          className={`h-2 w-2 rounded-full ${child.active ? 'bg-emerald-500' : 'bg-slate-300'}`}
        />
        {child.active ? 'Active now' : 'Offline'}
      </div>
      <p className="mt-2 text-xs text-slate-500">{child.lastSeen}</p>
      <div className={`mt-3 rounded-lg px-3 py-2 text-xs font-medium ${child.isPremium ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-500'}`}>
        {child.isPremium ? `Premium active · ${child.daysRemaining} day${child.daysRemaining === 1 ? '' : 's'} left` : 'Premium inactive'}
        {child.expireDate ? <span className="block mt-1 font-normal">Expires {new Date(child.expireDate).toLocaleDateString()}</span> : null}
      </div>
    </div>
  );
}
