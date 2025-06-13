'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { LogIn, LogOut, Settings, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MainNav() {
  const { user, logout } = useAuthStore();
  const { totalItems, clearCart } = useCartStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearCart();
    router.push('/');
  };

  return (
    <header className='bg-background/80 supports-[backdrop-filter]:bg-background/60 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        {/* Logo */}
        <Link href='/' className='text-lg font-semibold tracking-tight'>
          MyStore
        </Link>

        {/* Navigation */}
        <nav className='flex items-center gap-4'>
          {/* Cart Button */}
          <Button
            asChild
            variant='ghost'
            size='icon'
            className='hover:bg-accent relative'
          >
            <Link href='/cart'>
              <ShoppingCart className='h-5 w-5' />
              {totalItems > 0 && (
                <span className='bg-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs text-white'>
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>

          {/* Authenticated User */}
          {user ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className='flex items-center gap-2 text-sm font-medium'>
                    <User className='h-4 w-4' />
                    {user.username}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='bg-popover w-48 rounded-md p-2 shadow-md'>
                    <ul className='space-y-1'>
                      <li>
                        <Link href='/profile' passHref>
                          <NavigationMenuLink asChild>
                            <span className='hover:bg-muted flex cursor-pointer flex-row items-center gap-2 rounded-md p-2 text-sm transition-colors'>
                              <div className='h-4 w-4'>
                                <User className='h-4 w-4' />
                              </div>
                              Profile
                            </span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      {user.role === 'admin' && (
                        <li>
                          <Link href='/admin/product' passHref>
                            <NavigationMenuLink asChild>
                              <span className='hover:bg-muted flex cursor-pointer flex-row items-center gap-2 rounded-md p-2 text-sm transition-colors'>
                                <div className='h-4 w-4'>
                                  <Settings />
                                </div>
                                Admin Products
                              </span>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      )}
                      <li>
                        <Button onClick={handleLogout} variant='ghost'>
                          <LogOut className='h-4 w-4' />
                          Sign Out
                        </Button>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <Button asChild variant='outline' size='sm' className='gap-2'>
              <Link href='/login'>
                <LogIn className='h-4 w-4' />
                Sign In
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
