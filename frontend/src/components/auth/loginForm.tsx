'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, type LoginInput } from '@/schemas/authSchema';
import { useAuthStore } from '@/store/useAuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    await login(data.email, data.password);
    router.push('/');
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form onSubmit={handleSubmit(onSubmit)} className='p-6 md:p-8'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-muted-foreground text-balance'>
                  Login to your account
                </p>
              </div>

              {/* Email Field */}
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  {...register('email')}
                />
                {errors.email && (
                  <p className='text-sm text-red-500'>{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className='grid gap-3'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>
                  <Link
                    href='#'
                    className='text-sm underline-offset-2 hover:underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id='password'
                  type='password'
                  {...register('password')}
                />
                {errors.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>

              {/* Sign Up Link */}
              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link href='/register' className='underline underline-offset-4'>
                  Sign up
                </Link>
              </div>
            </div>
          </form>

          {/* Side Image */}
          <div className='bg-muted relative hidden md:block'>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2Fimage.png?alt=media&token=1200628a-5635-47b3-aebd-0e483d3afda1'
              alt='Login background'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
              width={956}
              height={1200}
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms and Policy */}
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
