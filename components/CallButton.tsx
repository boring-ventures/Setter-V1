"use client";
import { useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";

export default function CallButton() {
  const [error, setError] = useState<string | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
        vapiRef.current = vapi;

        vapi.on("call-start", () => {
          setIsCallActive(true);
          startTimer();
          console.log("Call started");
        });

        vapi.on("call-end", () => {
          setIsCallActive(false);
          stopTimer();
          console.log("Call ended");
        });

        vapi.on("error", (e: Error) => {
          setError(e.message);
          console.error("Vapi error:", e);
        });

        return () => {
          if (vapiRef.current) {
            vapiRef.current.stop();
          }
          stopTimer();
        };
      } catch (err) {
        console.error("Failed to initialize Vapi:", err);
      }
    }
  }, []);

  const startTimer = () => {
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = async () => {
    try {
      // Request microphone permissions
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (vapiRef.current) {
        await vapiRef.current.start(process.env.NEXT_PUBLIC_ASSISTANT_ID!);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setError("Por favor, permita el acceso al micrófono para usar el asistente de voz");
      } else {
        setError("No se pudo iniciar la llamada. Por favor, inténtelo de nuevo.");
      }
    }
  };

  const handleEndCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      stopTimer();
      setIsCallActive(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        id="vapi-call-btn"
        onClick={handleCall}
        disabled={isCallActive}
        className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 group hover:scale-105 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10">{isCallActive ? 'Llamada en Progreso' : 'Hablar con nuestro Asistente'}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] bg-cover opacity-20" />
      </button>

      {isCallActive && (
        <div className="flex flex-col items-center gap-3">
          <div className="text-lg font-semibold text-blue-600">
            {formatTime(timer)}
          </div>
          <button
            onClick={handleEndCall}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
          >
            Finalizar Llamada
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
} 