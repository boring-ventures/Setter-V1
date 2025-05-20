import React from "react";
import Head from "next/head";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from "next/image";

// Dynamically import CallButton with no SSR since it uses browser APIs
const CallButton = dynamic(() => import("../components/CallButton"), {
  ssr: false
});

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Social media links
const socialLinks = [
  {
    icon: "facebook",
    link: "https://www.facebook.com/share/1DpkbSzMRC/?mibextid=wwXIfr",
    label: "Facebook"
  },
  {
    icon: "instagram",
    link: "https://www.instagram.com/manfred_oficial?igsh=ZTRnMWFxNDl2ZmY=",
    label: "Instagram"
  },
  {
    icon: "tiktok",
    link: "https://www.tiktok.com/@manfredbolivia?_t=ZM-8wV1Z9fubua&_r=1",
    label: "TikTok"
  }
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Manfred Reyes Villa - Construyendo un Mejor Bolivia</title>
        <meta name="description" content="Manfred Reyes Villa - Liderazgo con experiencia para Bolivia" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </Head>

      {/* Top Bar */}
      <div className="bg-[#862896] text-white py-4 px-4 text-center">
        <div className="container mx-auto text-base font-medium">
          Juntos por una Bolivia mejor 🇧🇴
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        className="min-h-[calc(100vh-48px)] relative overflow-hidden bg-gradient-to-br from-[#862896]/10 via-white/5 to-[#E00621]/10"
      >
        {/* Background with enhanced gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#862896]/20 via-transparent to-[#E00621]/20" />
        <div 
          className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-20 bg-repeat"
          style={{ backgroundSize: '50px 50px' }}
        />
        <div className="absolute inset-0 bg-white/10" />
        
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative min-h-[calc(100vh-48px)]">
          <motion.div variants={fadeIn} className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-[#862896] leading-tight">
              Con experiencia y compromiso, construyamos un mejor Bolivia
            </h1>
            <p className="text-lg text-gray-600">
              Liderazgo probado para un futuro próspero
            </p>
            <div className="mt-8">
              <CallButton />
            </div>
          </motion.div>
          <motion.div 
            variants={fadeIn}
            className="relative h-[500px] p-6"
          >
            <div className="relative h-full w-full bg-gradient-to-br from-[#862896]/10 to-[#E00621]/5 rounded-2xl overflow-hidden shadow-2xl border border-[#862896]/20">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl"></div>
              <div className="absolute inset-2 bg-white rounded-xl overflow-hidden">
                <Image
                  src="/manfreeeed-removebg-preview (1).png"
                  alt="Manfred Reyes Villa"
                  layout="fill"
                  objectFit="contain"
                  priority
                  className="scale-95 hover:scale-100 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 h-20 bg-gradient-to-t from-[#862896]/10 to-transparent rounded-xl"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Proposals Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Orden y seguridad",
                text: "Compromiso con una Bolivia más segura y ordenada para todos",
                icon: "🛡️",
                points: [
                  "Fortalecimiento de la policía nacional",
                  "Modernización del sistema de seguridad",
                  "Prevención del delito",
                  "Justicia eficiente y transparente"
                ]
              },
              {
                title: "Empleo y reactivación",
                text: "Impulso a la economía y generación de empleos dignos",
                icon: "💼",
                points: [
                  "Incentivos para empresas locales",
                  "Apoyo al emprendimiento",
                  "Inversión en infraestructura",
                  "Desarrollo industrial sostenible"
                ]
              },
              {
                title: "Salud y educación dignas",
                text: "Acceso a servicios de calidad para cada boliviano",
                icon: "🏥",
                points: [
                  "Hospitales modernos y equipados",
                  "Educación digital y bilingüe",
                  "Capacitación docente continua",
                  "Cobertura médica universal"
                ]
              }
            ].map((proposal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#862896] rounded-xl flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform">
                    {proposal.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#862896]">{proposal.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{proposal.text}</p>
                <ul className="space-y-3">
                  {proposal.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E00621]"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="bg-[#862896] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto">
              "Bolivia merece liderazgo con resultados — y eso es lo que represento"
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#862896] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-32 h-12 bg-white/20 rounded-xl mb-4" />
              <p className="text-sm opacity-80">
                © 2024 Manfred Reyes Villa. Todos los derechos reservados.
              </p>
              <a 
                href="https://es.wikipedia.org/wiki/Manfred_Reyes_Villa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm opacity-80 hover:opacity-100 underline mt-2 inline-block transition-opacity"
              >
                Conoce más en Wikipedia
              </a>
            </div>
            <div>
              <h4 className="font-bold mb-4">Redes Sociales</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                  >
                    <i className={`fab fa-${social.icon} text-lg`}></i>
                    <span className="sr-only">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <p className="text-sm opacity-80">
                La Paz, Bolivia<br />
                info@manfredreyes.bo
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 
