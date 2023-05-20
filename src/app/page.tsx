import { LeftMenu } from './LeftMenu';
import { RightMenu } from './RightMenu';
import { ThemeSelector } from './ThemeSelector';
import { WheelContainer } from './_wheel/WheelContainer';
import { GitHub } from 'react-feather';

function VerticalDivider() {
  return <div className="h-8 w-px bg-neutral-content" />;
}

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-12 px-4 py-12 sm:gap-24 sm:px-8 sm:py-14">
      <div className="fixed right-3 top-3 z-10 flex gap-4">
        <ThemeSelector />
        <VerticalDivider />
        <a
          href="https://github.com/MaoDeMatos/the-food-wheel"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sm btn-circle btn flex items-center justify-center p-1"
          title="Check out the code here !"
        >
          <GitHub />
        </a>
      </div>

      <div>
        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-center text-4xl font-extrabold !leading-tight text-transparent sm:text-6xl">
          The Food Wheel !
        </h1>

        <div className="mt-4 text-center">
          <p>
            {
              "Don't know where to eat ? The food wheel will tell you where to go !"
            }
          </p>
          <p>
            {
              'Just enter the different options and the wheel will do the rest !'
            }
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-8 sm:justify-between">
        <LeftMenu />
        <WheelContainer />
        <RightMenu />
      </div>
    </main>
  );
}
