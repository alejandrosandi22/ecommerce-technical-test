import ProfileInfo from '@/components/profile/ProfileInfo';
import { requireAuth } from '@/lib/authServer';

export default async function ProfilePage() {
  const user = await requireAuth();

  return <ProfileInfo user={user} />;
}
