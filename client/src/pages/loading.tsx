import { useEffect, useState } from "react";

export default function Loading() {
  const [statusMessage, setStatusMessage] = useState("준비 완료!");

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

    // Initialize GA immediately when page loads
    initGoogleAnalytics();

    // Track page visit
    const pageVisitTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-10974107380',
          'event_category': 'page_visit',
          'event_label': 'landing_page_loaded'
        });
      }
    }, 500);

    return () => {
      clearTimeout(pageVisitTimer);
    };
  }, []);

  const handleFreeTrialClick = () => {
    // Fire conversion event on button click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-10974107380',
        'event_category': 'button_click',
        'event_label': 'free_trial_clicked'
      });
    }

    // Redirect to loading page
    window.location.href = '/load';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 font-inter">
      <div className="text-center max-w-md w-full">
        {/* Logo/Brand Area */}
        <div className="mb-8 animate-fade-in">
          <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">준비 완료!</h1>
          <p className="text-slate-600 text-sm">이제 무료 체험을 시작하세요!</p>
        </div>
        
        {/* Status Text */}
        <div className="mt-8 animate-fade-in animation-delay-900">
          <p className="text-xs text-slate-500">{statusMessage}</p>
        </div>
        
        {/* Free Trial Button */}
        <div className="mt-8 animate-fade-in">
          <button
            onClick={handleFreeTrialClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
          >
            무료 체험하기
          </button>
        </div>
      </div>
    </div>
  );
}