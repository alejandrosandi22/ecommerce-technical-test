'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getProfile } from '@/services/authService';
import { useEffect, useState } from 'react';

interface ProfileInfoProps {
  user: {
    id: number;
    role: string;
    username?: string;
    email?: string;
  };
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const [extra, setExtra] = useState<{ username?: string; email?: string }>();

  useEffect(() => {
    if (!user.username || !user.email) {
      getProfile()
        .then((p) => setExtra(p))
        .catch(() => setExtra({}));
    }
  }, [user]);

  const username = user.username ?? extra?.username;
  const email = user.email ?? extra?.email;

  return (
    <main className='container mx-auto max-w-md py-12'>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* Username */}
          <div>
            <span className='text-muted-foreground block text-sm'>
              Username
            </span>
            {username ? (
              <p className='text-lg font-medium'>{username}</p>
            ) : (
              <Skeleton className='h-5 w-1/2' />
            )}
          </div>

          {/* Email */}
          <div>
            <span className='text-muted-foreground block text-sm'>Email</span>
            {email ? (
              <p className='text-lg font-medium'>{email}</p>
            ) : (
              <Skeleton className='h-5 w-2/3' />
            )}
          </div>

          {/* Role */}
          <div>
            <span className='text-muted-foreground block text-sm'>Role</span>
            <p className='text-lg font-medium capitalize'>{user.role}</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
