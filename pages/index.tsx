import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CallButton from "../components/CallButton";
import TopBar from "../components/TopBar";
import { Meteors } from "../components/magicui/meteors";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animated border component
const AnimatedBorder = ({ className = "" }) => (
  <div className={`absolute inset-0 ${className}`}>
    <div className="absolute top-0 left-0 w-[20%] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-border-flow" />
    <div className="absolute top-0 right-0 w-[2px] h-[20%] bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-border-flow" />
    <div className="absolute bottom-0 right-0 w-[20%] h-[2px] bg-gradient-to-l from-transparent via-blue-500 to-transparent animate-border-flow" />
    <div className="absolute bottom-0 left-0 w-[2px] h-[20%] bg-gradient-to-t from-transparent via-blue-500 to-transparent animate-border-flow" />
  </div>
);

// Enhanced particle system
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['rgba(96, 165, 250, 0.3)', 'rgba(79, 70, 229, 0.3)', 'rgba(147, 197, 253, 0.3)'];

    const createParticles = () => {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connecting lines
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      createParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

// Glowing dot background
const GlowingDots = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(96, 165, 250, 0.15) 2px, transparent 0)`,
      backgroundSize: '24px 24px',
      backgroundPosition: '-12px -12px'
    }} />
  </div>
);

// Custom icon component
const AnimatedIcon = ({ name, className = "" }: { name: string; className?: string }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-blue-500/20 rounded-lg transform group-hover:scale-110 transition-transform duration-300" />
    <i className={`fas fa-${name} relative z-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300`} />
  </div>
);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <>
      <Head>
        <title>VoiceAI Agency - El Futuro de la Atención al Cliente</title>
        <meta name="description" content="Transforme su negocio con agentes de voz impulsados por IA para servicio al cliente, ventas y operaciones." />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" 
          rel="stylesheet"
        />
      </Head>

      <TopBar />

      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        className="min-h-[90vh] pt-20 relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <ParticleBackground />
          <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] animate-wave opacity-3" />
          <Meteors 
            number={15} 
            className="animate-meteor !bg-blue-300/30 [--meteor-color:theme(colors.blue.300/30)]"
            minDuration={8}
            maxDuration={15}
            angle={215}
          />
        </div>
        
        <motion.div 
          style={{ opacity, scale }}
          className="container mx-auto px-4 py-16 relative z-10"
        >
          <motion.div variants={fadeIn} className="max-w-4xl mx-auto text-center space-y-12">
            <div className="relative inline-block">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white leading-tight font-display mb-8"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 100%' }}
              >
                Más Allá de la Automatización
              </motion.h1>
              <motion.p
                className="text-3xl md:text-4xl font-light text-blue-100/90 mt-4"
                variants={fadeInScale}
              >
                El Futuro de la Atención al Cliente está Aquí
              </motion.p>
            </div>

            <motion.div 
              variants={fadeInScale}
              className="space-y-8"
            >
              <p className="text-xl md:text-2xl text-blue-100/70 font-light max-w-2xl mx-auto leading-relaxed">
                Revolucionando el servicio al cliente, ventas y operaciones con IA de aspecto humano
              </p>

              <div className="flex items-center justify-center">
                <CallButton />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white to-blue-50/80" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeIn} 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display"
            >
              Soluciones Inteligentes
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme su negocio con tecnología de vanguardia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                ),
                title: "Personalización Avanzada",
                description: "IA adaptativa que aprende y mejora con cada interacción"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Respuesta Instantánea",
                description: "Atención inmediata 24/7 para sus clientes"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Análisis en Tiempo Real",
                description: "Insights detallados sobre cada conversación"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Integración Perfecta",
                description: "Se adapta a sus sistemas existentes sin problemas"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Seguridad Garantizada",
                description: "Protección de datos de nivel empresarial"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: "Escalabilidad Total",
                description: "Crece con su negocio sin limitaciones"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
                className="group relative bg-white rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.03)] hover:shadow-[0_0_50px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="bg-blue-50 rounded-xl p-4 mb-6 w-16 h-16 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeIn} 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display"
            >
              Soluciones Adaptadas a Su Negocio
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elija el plan que mejor se adapte a sus necesidades empresariales y objetivos de crecimiento
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Essential Plan */}
            <motion.div
              variants={fadeInScale}
              className="relative group"
            >
              <div className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.03)] hover:shadow-[0_0_50px_rgba(0,0,0,0.08)] transition-all duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Asistente Esencial</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-bold text-gray-900">$2,000</span>
                  <span className="text-gray-500 ml-2">/ inicio</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Asistente IA personalizado</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Integración en su sitio web</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Soporte básico 24/7</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hasta 1,000 interacciones/mes</span>
                  </li>
                </ul>
                <button className="w-full bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
                  Comenzar Ahora
                </button>
              </div>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              variants={fadeInScale}
              className="relative group lg:-mt-4"
            >
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.15)] hover:shadow-[0_0_50px_rgba(37,99,235,0.25)] transition-all duration-300">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Más Popular
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Asistente Profesional</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-bold text-white">$3,500</span>
                  <span className="text-blue-100 ml-2">/ inicio</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-blue-200 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Todo lo del plan Esencial</span>
                  </li>
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-blue-200 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Personalización avanzada</span>
                  </li>
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-blue-200 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Integración con CRM</span>
                  </li>
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-blue-200 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hasta 5,000 interacciones/mes</span>
                  </li>
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-blue-200 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Análisis y reportes avanzados</span>
                  </li>
                </ul>
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
                  Comenzar Ahora
                </button>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              variants={fadeInScale}
              className="relative group"
            >
              <div className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.03)] hover:shadow-[0_0_50px_rgba(0,0,0,0.08)] transition-all duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Asistente Empresarial</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-bold text-gray-900">$7,500</span>
                  <span className="text-gray-500 ml-2">/ inicio</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Todo lo del plan Profesional</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Personalización total</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Integración con múltiples sistemas</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Interacciones ilimitadas</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Soporte prioritario 24/7</span>
                  </li>
                </ul>
                <button className="w-full bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
                  Contactar Ventas
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] animate-wave opacity-3" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5" />
        
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              ¿Listo para Transformar su Negocio?
            </h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(96, 165, 250, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg"
            >
              Solicitar una Demo
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1f35] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h4 className="font-bold text-xl mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
                VoiceAI Agency
              </h4>
              <p className="text-blue-100/70 leading-relaxed">
                Transformando la interacción con el cliente a través de soluciones de voz IA inteligentes.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 font-display">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                {['Sobre Nosotros', 'Servicios', 'Casos de Éxito', 'Contacto'].map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-blue-100/70 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 font-display">Contact</h4>
              <ul className="space-y-3 text-blue-100/70">
                <li className="flex items-center">
                  <i className="fas fa-envelope w-5 text-blue-400" />
                  <span>contact@voiceai.agency</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone w-5 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt w-5 text-blue-400" />
                  <span>123 AI Boulevard<br />Innovation City, IC 12345</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 font-display">Follow Us</h4>
              <div className="flex space-x-4">
                {['linkedin', 'twitter', 'facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300 group"
                  >
                    <i className={`fab fa-${social} text-lg text-blue-400 group-hover:text-white transition-colors duration-300`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-blue-100/60 text-sm">
            <p>© 2024 VoiceAI Agency. Todos los derechos reservados.</p>
            <div className="mt-4 space-x-6">
              <a href="#" className="hover:text-white transition-colors duration-300">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 
