import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DownloadPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-sky-50 px-4 py-10">
      <Card className="w-full max-w-md overflow-hidden border-purple-200 shadow-xl">
        <CardHeader className="items-center border-b bg-purple-50/70 pb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl text-purple-600">
            ↓
          </div>
          <Badge className="bg-purple-600 text-white hover:bg-purple-600">
            Premium access active
          </Badge>
          <CardTitle className="mt-3 text-2xl">File access ready</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6 text-center">
          <p className="mt-3 text-sm text-slate-600">
            Your premium file and download access are now available.
          </p>
          <Button asChild className="w-full">
            <Link href="/user-center">Open user center</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
