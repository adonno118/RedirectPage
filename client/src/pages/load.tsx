import { useEffect, useState } from "react";

export default function Load() {
  const [statusMessage, setStatusMessage] = useState("페이지를 준비하고 있습니다");

  useEffect(() => {
    // Track loading page visit
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-10974107380',
        'event_category': 'loading_started',
        'event_label': 'load_page_visited'
      });
    }

    // Update status messages during loading
    const statusMessages = [
      '페이지를 준비하고 있습니다',
      '거의 완료되었습니다',
      '이동 중입니다...'
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % statusMessages.length;
      setStatusMessage(statusMessages[messageIndex]);
    }, 700);

    // Redirect after 2 seconds
    const redirectTimer = setTimeout(() => {
      clearInterval(messageInterval);
      
      // Fire final conversion event before redirect
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-10974107380',
          'event_category': 'redirect',
          'event_label': 'redirect_initiated'
        });
      }
      
      // Small delay to ensure tracking fires
      setTimeout(() => {
        window.location.href = 'https://iryan.kr/t737dmq3fj';
      }, 100);
    }, 2000);

    // Cleanup
    return () => {
      clearInterval(messageInterval);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 font-inter">
      <div className="text-center max-w-md w-full">
        {/* Logo/Brand Area */}
        <div className="mb-8 animate-fade-in">
          <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin-slow"></div>
          </div>
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Loading</h1>
          <p className="text-slate-600 text-sm">잠시만 기다려주세요...</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6 animate-fade-in animation-delay-300">
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
          </div>
        </div>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 animate-fade-in animation-delay-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow animation-delay-200"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow animation-delay-400"></div>
        </div>
        
        {/* Status Text */}
        <div className="mt-8 animate-fade-in animation-delay-900">
          <p className="text-xs text-slate-500">{statusMessage}</p>
        </div>
      </div>
    </div>
  );
}