import HeaderTemplate from '@/templates/HeaderTemplate';

import Greeting from '../header/Gretting';

function AddMusic() {
  return (
    <HeaderTemplate title="Before you join">
      <section className="h-full w-full p-4">
        <Greeting textList={['Pick your', 'Favorite Top 3', 'Songs.!']} />
      </section>
    </HeaderTemplate>
  );
}

export default AddMusic;
