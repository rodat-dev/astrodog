import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { clickerClass } from "../styles/clicker";

export default function ChatButton() {
  return (
    <Link
      href="/chat"
      className={clickerClass({
        className: "absolute bottom-4 right-4 h-fit w-fit",
      })}
      aria-label="Chat with AI"
    >
      <MessageCircle size={24} />
    </Link>
  );
}
