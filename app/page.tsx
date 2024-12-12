import AIAvatarAsLink from './ui/chat/ai-avatar-as-link'
import * as Portal from '@radix-ui/react-portal'
import ChatWindow from './ui/chat/chat-window'

export default function Home() {
    return (
        // <ChatWindow>
        <AIAvatarAsLink href="/chat">Chat</AIAvatarAsLink>
        // </ChatWindow>
    )
}
