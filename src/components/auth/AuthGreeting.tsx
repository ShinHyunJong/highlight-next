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
    <HeaderTemplate title="" hasFooter={false}>
      <section
        style={{ height: `calc(100svh - 50px)` }}
        className="flex w-full flex-col justify-between p-4"
      >
        <div className="flex flex-col">
          <Stepper count={3} step={1} />
          <p className="my-4 text-gray-400">Before you join</p>
          <Greeting textList={['Pick your', 'Favorite Top 3', 'Songs.!']} />
          <div className="py-8">
            <Button onClick={() => router.push('/auth?tab=pick')}>
              Get Started
            </Button>
          </div>
        </div>
        <div
          role="button"
          onClick={() => router.push('/auth')}
          className="flex flex-col border-t border-dashed border-gray-500 pb-8 pt-6"
        >
          <p className="text-gray-400">Already have account?</p>
          <p className="text-green-600">Click here to login</p>
        </div>
      </section>
    </HeaderTemplate>
  );
}
export default AuthGreeting;
