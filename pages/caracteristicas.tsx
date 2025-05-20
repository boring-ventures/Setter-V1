import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import TopBar from "../components/TopBar";
import { Meteors } from "../components/magicui/meteors";
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
const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <motion.div
    variants={fadeIn}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300"
  >
    <div className="flex items-center mb-4">
      <i className={`${icon} text-3xl text-blue-500 mr-4`}></i>
      <h3 className="text-2xl font-semibold text-blue-400">{title}</h3>
    </div>
    <p className="text-gray-300 text-lg">{description}</p>
  </motion.div>
);

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
            <motion.h1
              variants={fadeIn}
              className="text-5xl font-bold text-white mb-8 text-center"
            >
              Características
            </motion.h1>

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
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                  Solicitar Demo
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
} 