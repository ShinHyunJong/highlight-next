import { useRouter } from 'next/router';

import { usePublicGuard } from '@/hooks/auth/guard.auth';
import HeaderTemplate from '@/templates/HeaderTemplate';

import Greeting from '../header/Gretting';
import Stepper from '../header/Stepper';
import { Button } from '../ui/button';

function AuthGreeting() {
  const router = useRouter();
  usePublicGuard();

  return (
    <HeaderTemplate title="">
      <section className="flex h-full w-full flex-col p-4">
        <Stepper count={3} step={1} />
        <Greeting textList={['Pick your', 'Favorite Top 3', 'Songs.!']} />
        <div className="py-8">
          <Button onClick={() => router.push('/auth?tab=pick')}>
            Get Started
          </Button>
        </div>
        <div className="mt-8">
          <Button
            onClick={() => router.push('/auth')}
            type="button"
            variant="link"
            className="px-0"
          >
            <p className="text-gray-500">Already have account?</p>
          </Button>
        </div>
      </section>
    </HeaderTemplate>
  );
}
export default AuthGreeting;
