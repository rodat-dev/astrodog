import { AstrodogChat } from "@/components/ui/chat";

export default function ChatPage() {
  return (
    <main
      role="main"
      className="pointer-events-auto flex h-full w-full items-center justify-center overflow-y-auto p-2 md:py-4"
    >
      <AstrodogChat />
    </main>
  );
}
