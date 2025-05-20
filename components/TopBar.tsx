import CallButton from './CallButton';

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">VoiceAI Agency</div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <CallButton />
        </div>
      </div>
    </div>
  );
} 