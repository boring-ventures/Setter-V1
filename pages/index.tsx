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
        <title>VoiceAI Agency - The Future of Customer Engagement</title>
        <meta name="description" content="Transform your business with AI-powered voice agents for customer service, sales, and operations." />
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
        className="min-h-[90vh] pt-20 relative overflow-hidden bg-gradient-to-br from-[#1a1f35] via-[#2a3149] to-[#1a1f35] flex items-center"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <ParticleBackground />
          <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] animate-wave opacity-5" />
          <Meteors 
            number={20} 
            className="animate-meteor !bg-blue-400 [--meteor-color:theme(colors.blue.400)]"
            minDuration={5}
            maxDuration={12}
            angle={215}
          />
        </div>
        
        <motion.div 
          style={{ opacity, scale }}
          className="container mx-auto px-4 py-12 relative z-10"
        >
          <motion.div variants={fadeIn} className="max-w-4xl mx-auto text-center space-y-12">
            <div className="relative inline-block">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white leading-tight font-display mb-8"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 100%' }}
              >
                Beyond Automation: The Future of Customer Engagement is Here
              </motion.h1>
            </div>

            <motion.div 
              variants={fadeInScale}
              className="space-y-8"
            >
              <p className="text-xl md:text-2xl text-blue-100/80 font-light max-w-2xl mx-auto">
                Revolutionizing customer service, sales, and operations with human-like AI
              </p>

              <div className="flex items-center justify-center">
                <CallButton />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Problem/Solution Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <GlowingDots />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeIn} 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display gradient-text-animate from-gray-900 via-blue-800 to-gray-900"
            >
              The Challenges You Face. Our Intelligent Solutions.
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                challenge: "High Customer Service Costs",
                solution: "24/7 AI-Powered Support",
                icon: (
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                    <motion.path 
                      d="M24 4v40M4 24h40" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.circle 
                      cx="24" 
                      cy="24" 
                      r="16" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </svg>
                ),
                gradient: "from-blue-500 to-blue-600",
              },
              {
                challenge: "Inconsistent Service Quality",
                solution: "Standardized, Perfect Responses",
                icon: (
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                    <motion.path 
                      d="M8 24c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.path 
                      d="M24 16v16M16 24h16" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    />
                  </svg>
                ),
                gradient: "from-indigo-500 to-indigo-600",
              },
              {
                challenge: "Limited Scalability",
                solution: "Infinite Concurrent Conversations",
                icon: (
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                    <motion.path 
                      d="M12 36l24-24M12 12l24 24" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.circle 
                      cx="12" 
                      cy="24" 
                      r="8" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                    <motion.circle 
                      cx="36" 
                      cy="24" 
                      r="8" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    />
                  </svg>
                ),
                gradient: "from-purple-500 to-purple-600",
              },
              {
                challenge: "Lost Sales Opportunities",
                solution: "Proactive Engagement & Follow-ups",
                icon: (
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                    <motion.path 
                      d="M24 4l16 8v24l-16 8-16-8V12l16-8z" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.path 
                      d="M24 20v8" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    />
                    <motion.circle 
                      cx="24" 
                      cy="32" 
                      r="1" 
                      fill="currentColor"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1 }}
                    />
                  </svg>
                ),
                gradient: "from-cyan-500 to-cyan-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
                className="group relative animated-border-card"
              >
                <AnimatedBorder className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 z-10">
                  <div className={`mb-6 text-transparent bg-gradient-to-br ${item.gradient} bg-clip-text`}>
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-display">
                    {item.challenge}
                  </h3>
                  <p className="text-gray-600">
                    {item.solution}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(96, 165, 250, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeIn} 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display"
            >
              Intelligent AI Voice Agents Designed for Your Success
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Customer Service AI",
                description: "Handle inquiries, resolve issues, and maintain satisfaction 24/7",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 12v8M12 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                gradient: "from-blue-500 to-blue-600",
              },
              {
                title: "Sales & Lead Generation AI",
                description: "Qualify leads and close deals with intelligent conversations",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <path d="M4 28l8-8M12 20l12-12M24 8l-4-4M28 12l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                gradient: "from-indigo-500 to-indigo-600",
              },
              {
                title: "Operational Efficiency AI",
                description: "Streamline processes and reduce manual workload",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4v24M8 12l16 8M8 20l16-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                gradient: "from-purple-500 to-purple-600",
              },
              {
                title: "Custom AI Development",
                description: "Tailored solutions for your unique business needs",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4l12 7v10l-12 7-12-7V11l12-7z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 16v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                gradient: "from-cyan-500 to-cyan-600",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
                className="group relative"
              >
                <div className="absolute inset-0.5 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur" />
                <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center mb-4 text-white transform group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-display">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-[#1a1f35] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] animate-wave opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeIn} 
              className="text-3xl md:text-4xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200"
            >
              The VoiceAI Agency Difference
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cutting-edge Technology",
                description: "Powered by the latest advancements in AI and natural language processing",
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4l12 7v18l-12 7-12-7V11l12-7z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M20 18l6 3.5v7l-6 3.5-6-3.5v-7l6-3.5z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M20 4v14M8 11l24 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                title: "Proven Results",
                description: "95% customer satisfaction rate and 60% cost reduction for our clients",
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                    <path d="M8 32l8-8 8 8 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="20" r="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="24" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                title: "Partnership Approach",
                description: "We're invested in your success with continuous optimization and support",
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M20 8a12 12 0 0 1 0 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 font-display group-hover:text-blue-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100/80">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-blue-50/50" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeIn} 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display"
            >
              Our Seamless Process
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 transform -translate-y-1/2 hidden md:block" />
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Consult & Strategize",
                  description: "We analyze your needs and design a custom solution",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                      <path d="M16 4v24M8 12l16 8M8 20l16-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "Develop & Train",
                  description: "Build and train your AI voice agents",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 10v12M10 16h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "Integrate & Optimize",
                  description: "Seamless integration with your existing systems",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                      <path d="M4 16h24M16 4v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ),
                },
                {
                  step: "04",
                  title: "Support & Scale",
                  description: "Continuous improvement and scaling",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                      <path d="M4 28l24-24M4 4l24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ),
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInScale}
                  className="relative group"
                >
                  <div className="relative z-10 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    <div className="text-blue-600 mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 font-display">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#1a1f35] to-[#2a3149] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] animate-wave opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
              Ready to Transform Your Business?
            </h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(96, 165, 250, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              Request a Demo
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
                Transforming customer engagement through intelligent AI voice solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 font-display">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Services', 'Case Studies', 'Contact'].map((link) => (
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
            <p>© 2024 VoiceAI Agency. All rights reserved.</p>
            <div className="mt-4 space-x-6">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 
