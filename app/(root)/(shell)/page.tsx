import { About, Masthead } from '@/modules/profile';

const Page = () => {
  return (
    <div className="container block flex-1 divide-y divide-stroke-soft border-stroke-soft *:last:border-b *:last:border-stroke-soft md:border-x">
      <section aria-labelledby="masthead-title" className="relative">
        <Masthead />
        <About />
      </section>
    </div>
  );
};

export default Page;
