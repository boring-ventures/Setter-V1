import Link from 'next/link';
import { useRouter } from 'next/router';
import CallButton from './CallButton';

export default function TopBar() {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          VoiceAI Agency
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/caracteristicas" 
            className={`text-gray-600 hover:text-gray-900 transition-colors ${
              router.pathname === '/caracteristicas' ? 'text-gray-900' : ''
            }`}
          >
            Características
          </Link>
          <Link 
            href="/nosotros" 
            className={`text-gray-600 hover:text-gray-900 transition-colors ${
              router.pathname === '/nosotros' ? 'text-gray-900' : ''
            }`}
          >
            Nosotros
          </Link>
          <CallButton />
        </div>
      </div>
    </div>
  );
} 