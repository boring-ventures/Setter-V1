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

export default function Nosotros() {
  return (
    <>
      <Head>
        <title>Sobre Nosotros - VoiceAI Agency</title>
        <meta name="description" content="Conozca más sobre VoiceAI Agency y nuestro equipo dedicado a transformar la atención al cliente con IA." />
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
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeIn}
              className="text-5xl font-bold text-white mb-8 text-center"
            >
              Sobre Nosotros
            </motion.h1>

            <motion.div
              variants={fadeIn}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-12"
            >
              <h2 className="text-3xl font-semibold text-blue-400 mb-6">
                Nuestra Misión
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                En VoiceAI Agency, nos dedicamos a revolucionar la forma en que las empresas interactúan con sus clientes. Nuestra misión es proporcionar soluciones de atención al cliente impulsadas por IA que sean eficientes, escalables y profundamente humanas.
              </p>
              <p className="text-gray-300 text-lg">
                Combinamos la última tecnología en inteligencia artificial con un profundo entendimiento de las necesidades empresariales para crear experiencias excepcionales de servicio al cliente.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                  Nuestros Valores
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-blue-500 mr-3"></i>
                    Innovación Continua
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-blue-500 mr-3"></i>
                    Excelencia en Servicio
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-blue-500 mr-3"></i>
                    Integridad y Transparencia
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-blue-500 mr-3"></i>
                    Compromiso con el Cliente
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                  Nuestro Equipo
                </h3>
                <p className="text-gray-300 mb-4">
                  Contamos con un equipo diverso de expertos en:
                </p>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <i className="fas fa-robot text-blue-500 mr-3"></i>
                    Inteligencia Artificial
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-comments text-blue-500 mr-3"></i>
                    Experiencia del Cliente
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-code text-blue-500 mr-3"></i>
                    Desarrollo de Software
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-chart-line text-blue-500 mr-3"></i>
                    Análisis de Datos
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
} 