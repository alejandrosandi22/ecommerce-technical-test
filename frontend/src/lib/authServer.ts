import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireAuth({ redirectTo = '/login' } = {}) {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect(redirectTo);
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );

    return decoded;
  } catch {
    redirect('/login');
  }
}

export async function requireAdmin() {
  const user = await requireAuth({ redirectTo: '/login' });

  if (user.role !== 'admin') {
    redirect('/unauthorized');
  }

  return user;
}
