import { useEffect, useState } from "react";

export default function Loading() {
  const [statusMessage, setStatusMessage] = useState("페이지를 준비하고 있습니다");

  useEffect(() => {
    // Initialize Google Analytics with the provided tracking code
    const initGoogleAnalytics = () => {
      // Add Google Analytics script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-10974107380';
      document.head.appendChild(script1);

      // Initialize gtag
      const script2 = document.createElement('script');
      script2.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-10974107380');
      `;
      document.head.appendChild(script2);
    };

    // Initialize GA immediately
    initGoogleAnalytics();

    // Track initial conversion event after a short delay
    const conversionTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-10974107380',
          'event_category': 'page_redirect',
          'event_label': 'loading_complete'
        });
      }
    }, 500);

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
    }, 800);

    // Redirect after 2 seconds
    const redirectTimer = setTimeout(() => {
      clearInterval(messageInterval);
      
      // Fire final conversion event before redirect
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-10974107380',
          'event_category': 'page_redirect',
          'event_label': 'redirect_initiated'
        });
      }
      
      // Small delay to ensure tracking fires
      setTimeout(() => {
        window.location.href = 'https://iryan.kr/t737dmq3fj';
      }, 100);
    }, 2000);

    // Fallback redirect in case of any issues
    const fallbackTimer = setTimeout(() => {
      window.location.href = 'https://iryan.kr/t737dmq3fj';
    }, 3000);

    // Cleanup
    return () => {
      clearTimeout(conversionTimer);
      clearInterval(messageInterval);
      clearTimeout(redirectTimer);
      clearTimeout(fallbackTimer);
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
