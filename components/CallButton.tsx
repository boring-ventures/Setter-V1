"use client";
import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";

export default function CallButton() {
  const [error, setError] = useState<string | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    let vapi: any = null;

    if (typeof window !== "undefined") {
      vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);

      // Event handlers
      vapi.on("call-start", () => {
        setIsCallActive(true);
        console.log("Call started");
      });

      vapi.on("call-end", () => {
        setIsCallActive(false);
        console.log("Call ended");
      });

      vapi.on("error", (e: Error) => {
        setError(e.message);
        console.error("Vapi error:", e);
      });

      // Cleanup
      return () => {
        if (vapi) {
          vapi.stop();
        }
      };
    }
  }, []);

  const handleCall = async () => {
    try {
      // Request microphone permissions
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
      await vapi.start(process.env.NEXT_PUBLIC_ASSISTANT_ID!);
    } catch (error) {
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setError("Please allow microphone access to use the voice assistant");
      } else {
        setError("Failed to start call. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <button
        onClick={handleCall}
        disabled={isCallActive}
        className={`
          bg-[#002B5C] text-white py-4 px-8 rounded-lg
          text-lg font-medium shadow-lg
          hover:bg-[#002B5C]/90 active:transform active:scale-95
          transition-all duration-200
          ${isCallActive ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
        `}
      >
        {isCallActive ? 'Llamada en progreso...' : 'Iniciar conversación'}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
} 