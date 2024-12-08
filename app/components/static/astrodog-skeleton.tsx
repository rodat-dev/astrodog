import Image from "next/image";

export default function AstrodogSkeleton() {
  return (
    <Image
      src={"/starrysky.png"}
      alt="Starry Sky"
      width={1460}
      height={1460}
      className="isolate h-full w-full contain-layout"
      fetchPriority="high"
    />
  );
}
