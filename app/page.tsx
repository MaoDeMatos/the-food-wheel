import { LeftMenu } from './LeftMenu';
import { RightMenu } from './RightMenu';
import { Wheel } from './Wheel';

export default function Home() {
  return (
    <div className="px-8">
      <main className="flex flex-col items-center gap-8 py-8 sm:gap-12 sm:py-12">
        <h1 className="bg-gradient-to-br from-rose-300 to-purple-500 bg-clip-text text-center text-4xl font-extrabold text-transparent sm:text-6xl">
          The Food Wheel !
        </h1>

        <div className="flex flex-wrap items-start justify-center gap-8 sm:justify-between">
          <LeftMenu />
          <Wheel />
          <RightMenu />
        </div>
      </main>
    </div>
  );
}
