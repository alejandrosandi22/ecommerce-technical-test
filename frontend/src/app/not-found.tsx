import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='bg-background flex min-h-screen flex-col items-center justify-center p-6'>
      <h1 className='text-foreground text-8xl font-extrabold'>404</h1>
      <p className='text-muted-foreground mt-4 text-lg'>
        Oops! Page not found.
      </p>
      <Link href='/' className='mt-6'>
        Go back home
      </Link>
    </main>
  );
}
