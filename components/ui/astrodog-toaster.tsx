"use client";
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Rocket, XCircle } from "lucide-react";

export function AstrodogToaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="border bg-black/80 backdrop-blur-sm [box-shadow:inset_0_0_10px_var(--violet-8)]"
          >
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                {props.variant === "destructive" ? (
                  <XCircle className="h-5 w-5 text-red-400" />
                ) : (
                  <Rocket className="h-5 w-5 text-purple-400" />
                )}
                <div className="text-lg font-semibold text-purple-400">
                  {title}
                </div>
              </div>
              {description && (
                <div className="text-sm text-purple-300">{description}</div>
              )}
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
