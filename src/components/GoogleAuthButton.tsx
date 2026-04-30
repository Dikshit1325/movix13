import { useEffect, useRef } from "react";

type GoogleAuthButtonProps = {
  disabled?: boolean;
  onCredential: (credential: string) => void | Promise<void>;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const SCRIPT_ID = "google-identity-script";

export default function GoogleAuthButton({ disabled = false, onCredential }: GoogleAuthButtonProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || !buttonRef.current) return;

    let active = true;

    const renderButton = () => {
      if (!active || !buttonRef.current || !window.google) return;

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: ({ credential }) => {
          if (!credential || disabled) return;
          void onCredential(credential);
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        text: "continue_with",
        size: "large",
        shape: "pill",
        width: Math.min(buttonRef.current.clientWidth || 320, 360),
      });
    };

    if (window.google) {
      renderButton();
    } else {
      const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener("load", renderButton, { once: true });
      } else {
        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.addEventListener("load", renderButton, { once: true });
        document.head.appendChild(script);
      }
    }

    return () => {
      active = false;
    };
  }, [clientId, disabled, onCredential]);

  if (!clientId) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground">
        Add <code>VITE_GOOGLE_CLIENT_ID</code> to enable Google sign-in.
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={buttonRef} className="min-h-11 w-full overflow-hidden rounded-full" />
      {disabled && <div className="absolute inset-0 cursor-not-allowed rounded-full bg-background/40" />}
    </div>
  );
}
