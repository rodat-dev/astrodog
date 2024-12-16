import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function ChatButton() {
  return (
    <Link
      href="/chat"
      className="motion-preset-blur-down-lg z-100 motion-loop-once motion-delay-100 duration-600 pointer-events-auto absolute bottom-4 right-4 z-10 cursor-pointer rounded-full border-2 border-white bg-black p-3 text-white shadow-lg transition-all hover:-translate-y-1 hover:[box-shadow:0_0_8px_2px_var(--violet-8)]"
      aria-label="Chat with AI"
    >
      <MessageCircle size={24} />
    </Link>
  );
}
