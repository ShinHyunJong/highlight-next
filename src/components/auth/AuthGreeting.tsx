import { useRouter } from 'next/router';

import HeaderTemplate from '@/templates/HeaderTemplate';

import Greeting from '../header/Gretting';
import Stepper from '../header/Stepper';
import { Button } from '../ui/button';

function AuthGreeting() {
  const router = useRouter();
  return (
    <HeaderTemplate title="">
      <section className="flex h-full w-full flex-col p-4">
        <Stepper count={3} step={1} />
        <Greeting textList={['Pick your', 'Favorite Top 3', 'Songs.!']} />
        <div className="py-8">
          <Button onClick={() => router.push('/?tab=pick')}>Get Started</Button>
        </div>
      </section>
    </HeaderTemplate>
  );
}
export default AuthGreeting;
