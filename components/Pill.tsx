import Image from "next/image";

export default function Pill({ src }: { src: string }) {
  return (
    <span className="inline-pill ph">
      <Image src={src} alt="" width={400} height={200} sizes="64px" />
    </span>
  );
}
