import { LeftMenu } from './LeftMenu';
import { RightMenu } from './RightMenu';
import { WheelContainer } from './_wheel/WheelContainer';

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-12 p-4 sm:gap-24 sm:p-8">
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
