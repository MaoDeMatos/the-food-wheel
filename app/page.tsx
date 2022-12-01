import Image from "next/image";

export default function Home() {
  return (
    <div className="px-8">
      <main className="min-h-screen py-16 flex flex-col justify-center items-center flex-1">
        <h1 className="m-0 text-center text-7xl leading-5 font-extrabold">
          Welcome to{" "}
          <a
            href="https://nextjs.org"
            className="text-blue-600 hover:underline focus:underline active:underline"
          >
            Next.js 13!
          </a>
        </h1>

        <p className="my-16 text-2xl text-center">
          Get started by editing{" "}
          <code className="rounded-md p-3 text-lg bg-gray-50 dark:bg-gray-800">
            app/page.tsx
          </code>
        </p>

        <div className="w-full sm:max-w-6xl flex flex-col sm:flex-row items-center justify-center flex-wrap">
          <a
            href="https://beta.nextjs.org/docs"
            className="transition-colors max-w-xs m-4 p-6 text-left text-inherit no-underline border rounded-xl border-gray-200 dark:border-gray-800 hover:text-blue-500 focus:text-blue-500 active:text-blue-500 hover:border-blue-500 focus:border-blue-500 active:border-blue-500"
          >
            <h2 className="mb-4">Documentation &rarr;</h2>
            <p className="m-0 text-lg">
              Find in-depth information about Next.js 13
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="transition-colors max-w-xs m-4 p-6 text-left text-inherit no-underline border rounded-xl border-gray-200 dark:border-gray-800 hover:text-blue-500 focus:text-blue-500 active:text-blue-500 hover:border-blue-500 focus:border-blue-500 active:border-blue-500"
          >
            <h2 className="mb-4">Examples &rarr;</h2>
            <p className="m-0 text-lg">Explore the Next.js 13 playground.</p>
          </a>

          <a
            href="https://vercel.com/templates/next.js/app-directory?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors max-w-xs m-4 p-6 text-left text-inherit no-underline border rounded-xl border-gray-200 dark:border-gray-800 hover:text-blue-500 focus:text-blue-500 active:text-blue-500 hover:border-blue-500 focus:border-blue-500 active:border-blue-500"
          >
            <h2 className="mb-4">Deploy &rarr;</h2>
            <p className="m-0 text-lg">
              Deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex flex-1 justify-center items-center py-8 border-t border-gray-200 dark:border-gray-800">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center flex-grow"
        >
          Powered by{" "}
          <span className="h-4 ml-2">
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
