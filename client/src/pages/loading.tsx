import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function LoadingPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Google Ads 전환 추적
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-10974107380',
        'value': 1200000,
        'currency': 'KRW'
      });
    }

    // 2초 후 외부 링크로 이동
    const timer = setTimeout(() => {
      window.location.href = 'https://iryan.kr/t737dmq3fj';
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        {/* 로딩 스피너 */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin border-t-green-600 mx-auto"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-pulse border-t-green-400 mx-auto"></div>
        </div>

        {/* 로딩 텍스트 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 animate-pulse">
            무료체험하러 가는 중...
          </h2>
          <p className="text-gray-600">
            잠시만 기다려주세요
          </p>

          {/* 진행률 바 */}
          <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
            <div className="bg-green-600 h-2 rounded-full animate-loading-bar"></div>
          </div>
        </div>

        {/* 구매 정보 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          <div className="text-sm text-gray-500 mb-2">초등온라인학습 1위</div>
          <div className="font-bold text-lg text-gray-800">엘리하이</div>
          <div className="text-2xl font-bold text-green-600 mt-2">무료 체험</div>
        </div>
      </div>
    </div>
  );
}