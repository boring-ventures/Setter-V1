import React from "react";
import Head from "next/head";
import { motion, useMotionValue, useTransform } from "framer-motion";
import TopBar from "../components/TopBar";
import { Meteors } from "../components/magicui/meteors";
import { AuroraText } from "../components/magicui/aurora-text";
import { ShineBorder } from "../components/magicui/shine-border";
import Image from "next/image";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={fadeIn}
      className="relative group rounded-2xl"
      style={{
        perspective: 2000,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform-gpu relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        <ShineBorder 
          borderWidth={2}
          duration={10}
          shineColor={["#0070F3", "#38bdf8", "#7928CA"]}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div className="flex items-center mb-4 transform-gpu" style={{ transform: "translateZ(20px)" }}>
          <i className={`${icon} text-3xl text-blue-500 mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}></i>
          <h3 className="text-2xl font-semibold text-blue-400">{title}</h3>
        </div>
        <p className="text-gray-300 text-lg transform-gpu" style={{ transform: "translateZ(10px)" }}>
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

// Ripple Button Component
const RippleButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();
    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples(ripples => ripples.filter(ripple => ripple.id !== id));
    }, 1000);
  };

  return (
    <button
      className={`relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 ${className}`}
      onClick={handleClick}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
            width: "200%",
            paddingBottom: "200%",
          }}
        />
      ))}
      {children}
    </button>
  );
};

export default function Caracteristicas() {
  const features = [
    {
      icon: "fas fa-robot",
      title: "IA Avanzada",
      description: "Tecnología de punta en procesamiento de lenguaje natural y aprendizaje automático para interacciones más naturales y efectivas."
    },
    {
      icon: "fas fa-comments",
      title: "Conversaciones Naturales",
      description: "Diálogos fluidos y contextuales que se adaptan al tono y necesidades específicas de cada cliente."
    },
    {
      icon: "fas fa-chart-line",
      title: "Análisis en Tiempo Real",
      description: "Monitoreo y análisis detallado de todas las interacciones para optimizar continuamente el servicio."
    },
    {
      icon: "fas fa-globe",
      title: "Multilingüe",
      description: "Soporte en múltiples idiomas para atender a una base de clientes global con la misma calidad y eficiencia."
    },
    {
      icon: "fas fa-shield-alt",
      title: "Seguridad Avanzada",
      description: "Protección de datos y cumplimiento normativo con los más altos estándares de seguridad de la industria."
    },
    {
      icon: "fas fa-sync",
      title: "Integración Perfecta",
      description: "Fácil integración con sus sistemas existentes de CRM, chat y centro de contacto."
    }
  ];

  return (
    <>
      <Head>
        <title>Características - VoiceAI Agency</title>
        <meta name="description" content="Descubra las características avanzadas de nuestra solución de atención al cliente impulsada por IA." />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </Head>

      <TopBar />

      <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] animate-wave opacity-3" />
          <Meteors 
            number={10}
            className="animate-meteor !bg-blue-300/30 [--meteor-color:theme(colors.blue.300/30)]"
            minDuration={8}
            maxDuration={15}
            angle={215}
          />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center">
              <AuroraText
                className="text-5xl font-bold mb-8"
                colors={["#0070F3", "#38bdf8", "#7928CA", "#FF0080"]}
              >
                Características
              </AuroraText>
            </motion.div>

            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
            >
              Descubra cómo nuestra tecnología de IA está transformando la atención al cliente con características innovadoras y potentes.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8"
            >
              <h2 className="text-3xl font-semibold text-blue-400 mb-6 text-center">
                ¿Listo para Transformar su Servicio al Cliente?
              </h2>
              <p className="text-gray-300 text-lg text-center mb-8">
                Contáctenos hoy para descubrir cómo nuestras características pueden beneficiar a su empresa.
              </p>
              <div className="flex justify-center">
                <RippleButton>
                  Solicitar Demo
                </RippleButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
} 