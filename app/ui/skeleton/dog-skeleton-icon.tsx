import { LucideProps, PawPrintIcon } from 'lucide-react'

export default function DogSkeletonIcon(props: LucideProps) {
    return (
        <div className="duration-400 flex scale-100 cursor-pointer items-center justify-center rounded border-transparent leading-4 transition-all will-change-contents hover:scale-105">
            <PawPrintIcon className="h-8 w-8 animate-pulse p-0.5" {...props} />
        </div>
    )
}
