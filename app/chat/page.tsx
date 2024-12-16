import { AstrodogChat } from "@/components/ui/chat";

export default function ChatPage() {
  return (
    <main
      role="main"
      className="pointer-events-auto flex h-full w-full flex-col items-center justify-center px-1 pb-4 pt-2"
    >
      <AstrodogChat />
    </main>
  );
}
