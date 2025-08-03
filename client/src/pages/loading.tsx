import { useEffect, useState } from "react";

export default function Loading() {
  const [statusMessage, setStatusMessage] = useState("페이지를 준비하고 있습니다");
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

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

    // Complete loading after 2 seconds
    const loadingTimer = setTimeout(() => {
      clearInterval(messageInterval);
      setStatusMessage("준비 완료!");
      setIsLoadingComplete(true);
      
      // Fire conversion event when loading completes
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-10974107380',
          'event_category': 'page_loaded',
          'event_label': 'loading_complete'
        });
      }
    }, 2000);

    // Cleanup
    return () => {
      clearTimeout(conversionTimer);
      clearInterval(messageInterval);
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleFreeTrialClick = () => {
    // Fire conversion event on button click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-10974107380',
        'event_category': 'button_click',
        'event_label': 'free_trial_button'
      });
    }
    
    // Small delay to ensure tracking fires before redirect
    setTimeout(() => {
      window.location.href = 'https://iryan.kr/t737dmq3fj';
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 font-inter">
      <div className="text-center max-w-md w-full">
        {/* Logo/Brand Area */}
        <div className="mb-8 animate-fade-in">
          <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
            {isLoadingComplete ? (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
              </svg>
            ) : (
              <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin-slow"></div>
            )}
          </div>
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">
            {isLoadingComplete ? "준비 완료!" : "Loading"}
          </h1>
          <p className="text-slate-600 text-sm">
            {isLoadingComplete ? "이제 무료 체험을 시작하세요!" : "잠시만 기다려주세요..."}
          </p>
        </div>
        
        {/* Progress Bar */}
        {!isLoadingComplete && (
          <div className="mb-6 animate-fade-in animation-delay-300">
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
            </div>
          </div>
        )}
        
        {/* Loading Dots */}
        {!isLoadingComplete && (
          <div className="flex justify-center space-x-1 animate-fade-in animation-delay-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow animation-delay-200"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow animation-delay-400"></div>
          </div>
        )}
        
        {/* Status Text */}
        <div className="mt-8 animate-fade-in animation-delay-900">
          <p className="text-xs text-slate-500">{statusMessage}</p>
        </div>
        
        {/* Free Trial Button */}
        {isLoadingComplete && (
          <div className="mt-8 animate-fade-in">
            <button
              onClick={handleFreeTrialClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
            >
              무료 체험하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
