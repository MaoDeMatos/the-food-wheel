import { LeftMenu } from './LeftMenu';
import { RightMenu } from './RightMenu';
import { WheelContainer } from './WheelContainer';

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center gap-12 px-4 py-8 sm:gap-24 sm:px-8 sm:py-12">
        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-center text-4xl font-extrabold !leading-tight text-transparent sm:text-6xl">
          The Food Wheel !
        </h1>

        <div className="text-center text-sm font-bold text-primary">
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

        <div className="flex flex-wrap items-start justify-center gap-8 sm:justify-between">
          <LeftMenu />
          <WheelContainer />
          <RightMenu />
        </div>
      </main>
    </div>
  );
}
