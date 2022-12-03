// import Image from 'next/image';

export function Wheel() {
  return (
    <div
      className="aspect-square w-full overflow-hidden rounded-full shadow-xl sm:w-72 md:w-96"
      style={{
        backgroundImage: "url('https://picsum.photos/id/1018/1000')",
        backgroundSize: 'contain',
      }}
    >
      <div className="h-full w-full bg-base-100/50 backdrop-blur-sm" />
      {/* <Image src="/placeholder.jpg" alt="" className="object-contain" fill /> */}
    </div>
  );
}
