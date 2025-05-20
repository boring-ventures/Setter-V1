"use client";
import { useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";

export default function CallButton() {
  const [error, setError] = useState<string | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const vapiRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);

      // Event handlers
      vapiRef.current.on("call-start", () => {
        setIsCallActive(true);
        setCallDuration(0);
        // Start timer
        timerRef.current = setInterval(() => {
          setCallDuration(prev => prev + 1);
        }, 1000);
        console.log("Call started");
      });

      vapiRef.current.on("call-end", () => {
        setIsCallActive(false);
        setCallDuration(0);
        // Clear timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        console.log("Call ended");
      });

      vapiRef.current.on("error", (e: Error) => {
        setError(e.message);
        setIsCallActive(false);
        setCallDuration(0);
        // Clear timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        console.error("Vapi error:", e);
      });
    }

    // Cleanup
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleCall = async () => {
    try {
      // Request microphone permissions
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (!vapiRef.current) {
        vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
      }
      
      await vapiRef.current.start(process.env.NEXT_PUBLIC_ASSISTANT_ID!);
    } catch (error) {
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setError("Por favor, permite el acceso al micrófono para usar el asistente de voz");
      } else {
        setError("No se pudo iniciar la llamada. Por favor, intenta de nuevo.");
      }
    }
  };

  const handleEndCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  // Format duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleCall}
          disabled={isCallActive}
          className={`
            bg-[#862896] text-white py-4 px-8 rounded-lg
            text-lg font-medium shadow-lg
            hover:bg-[#862896]/90 active:transform active:scale-95
            transition-all duration-200
            ${isCallActive ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
          `}
        >
          {isCallActive ? 'Llamada en progreso...' : 'Iniciar conversación'}
        </button>

        {isCallActive && (
          <>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Duración: {formatDuration(callDuration)}</span>
            </div>
            <button
              onClick={handleEndCall}
              className="bg-red-600 text-white py-2 px-6 rounded-lg text-sm font-medium
                hover:bg-red-700 transition-colors duration-200"
            >
              Finalizar llamada
            </button>
          </>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 bg-white/80 px-3 py-1 rounded-full">{error}</p>
      )}
    </div>
  );
} 