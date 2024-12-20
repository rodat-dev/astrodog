import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { clickerClass } from "../styles/clicker";

export default function ChatButton() {
  return (
    <Link
      href="/chat"
      className={clickerClass({
        className: "fixed bottom-4 right-4 h-fit w-fit md:p-4",
      })}
      aria-label="Chat with AI"
    >
      <MessageCircle className="size-6 md:size-7" />
    </Link>
  );
}
