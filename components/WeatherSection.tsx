import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import { MOCK_WEATHER_DATA, WEATHER_ICONS, type WeatherData } from '../weatherData';
import { Droplets, Wind, MapPin, Loader, AlertTriangle, ExternalLink } from './Icons';

// Removed Variants type annotation to fix build error.
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    // FIX: Add `as const` to help TypeScript infer a tuple type for the cubic-bezier easing array.
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }
  }
};

// Removed Variants type annotation to fix build error.
const forecastListVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Removed Variants type annotation to fix build error.
const forecastItemVariants = {
  hidden: { opacity: 0, y: 20 },
  // FIX: Add `as const` to help TypeScript infer a literal type, resolving the framer-motion type error for 'ease'.
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const WeatherSection: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (status === 'loading') {
        setWeatherData(MOCK_WEATHER_DATA);
        setError("ไม่สามารถเข้าถึงตำแหน่งได้ในเวลาที่กำหนด กำลังแสดงข้อมูลเริ่มต้น");
        setStatus('error');
      }
    }, 12000);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(loadingTimeout);
          setWeatherData({
            ...MOCK_WEATHER_DATA,
            location: "ตำแหน่งปัจจุบันของคุณ",
          });
          setStatus('success');
        },
        (geoError) => {
          clearTimeout(loadingTimeout);
          console.error("Geolocation error:", geoError.message);
          setWeatherData(MOCK_WEATHER_DATA);
          setError("ไม่สามารถเข้าถึงตำแหน่งได้ กำลังแสดงข้อมูลเริ่มต้น");
          setStatus('error');
        },
        { timeout: 10000 }
      );
    } else {
      clearTimeout(loadingTimeout);
      setWeatherData(MOCK_WEATHER_DATA);
      setError("เบราว์เซอร์ไม่รองรับการระบุตำแหน่ง");
      setStatus('error');
    }

    return () => clearTimeout(loadingTimeout);
  }, []);

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Loader className="h-8 w-8 text-agri-500" />
      <p className="mt-4 text-lg font-medium text-slate-600 font-display">กำลังโหลดข้อมูลสภาพอากาศ...</p>
    </div>
  );

  const renderWeather = () => {
    if (!weatherData) return null;

    const { location, current, forecast } = weatherData;
    const CurrentWeatherIcon = WEATHER_ICONS[current.condition];
    const googleWeatherUrl = location === "ตำแหน่งปัจจุบันของคุณ"
      ? `https://www.google.com/search?q=weather`
      : `https://www.google.com/search?q=weather+${encodeURIComponent(MOCK_WEATHER_DATA.location)}`;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Current Weather */}
          <div className="flex flex-col justify-between md:col-span-5">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-sans">
                <MapPin className="h-4 w-4 text-agri-500" />
                <span>{location}</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <CurrentWeatherIcon className="h-20 w-20 text-tech-500" aria-label={current.conditionText} />
                <div>
                  <div className="text-6xl font-bold font-display text-slate-800">{current.temp}°<span className="text-3xl font-medium text-slate-400">C</span></div>
                  <div className="font-semibold text-agri-600 font-sans">{current.conditionText}</div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2 text-slate-500">
                <span>รู้สึกเหมือน:</span>
                <span className="font-semibold text-slate-700">{current.feelsLike}°C</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Droplets className="h-4 w-4 text-tech-400" />
                <span>ความชื้น:</span>
                <span className="font-semibold text-slate-700">{current.humidity}%</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Wind className="h-4 w-4 text-tech-400" />
                <span>ลม:</span>
                <span className="font-semibold text-slate-700">{current.wind} km/h</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:col-span-1 md:flex md:justify-center">
            <div className="w-px bg-slate-200"></div>
          </div>

          {/* Forecast */}
          <div className="flex flex-col justify-between md:col-span-6">
            <div>
              <h3 className="text-sm font-bold font-display text-slate-700 mb-4">พยากรณ์อากาศ 5 วัน</h3>
              <motion.div
                className="mt-4 grid grid-cols-3 gap-3 text-center sm:grid-cols-5"
                variants={forecastListVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {forecast.map((day) => {
                  const ForecastIcon = WEATHER_ICONS[day.condition];
                  return (
                    <motion.div
                      key={day.day}
                      className="flex flex-col items-center rounded-xl bg-surface-50 p-3 ring-1 ring-surface-200"
                      variants={forecastItemVariants}
                    >
                      <div className="text-sm font-semibold text-slate-600 font-display">{day.day}</div>
                      <ForecastIcon className="my-2 h-8 w-8 text-tech-500" aria-label={day.condition} />
                      <div className="text-sm font-sans">
                        <span className="font-semibold text-slate-700">{day.temp.high}°</span>
                        <span className="text-slate-400">/{day.temp.low}°</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
            <div className="mt-6 text-center">
              <Button
                href={googleWeatherUrl}
                variant="soft"
                className="text-xs font-medium"
              >
                <span>ดูพยากรณ์อากาศฉบับเต็ม</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {status === 'error' && error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-red-500/10 px-3 py-1.5 text-center text-xs text-red-600 border border-red-200"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>{error}</span>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.section
      id="weather"
      className="relative scroll-mt-20 py-12 md:py-16"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-surface-200 bg-white p-6 shadow-soft md:p-8">
          {/* Modern Gradient Background */}
          <div
            className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-30 blur-xl"
            style={{
              background: "radial-gradient(350px circle at 10% 10%, rgba(16,185,129,.15), transparent 40%), radial-gradient(350px circle at 90% 90%, rgba(56,189,248,.1), transparent 40%)",
            }}
            aria-hidden
          />
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <motion.div
                key="loader"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {renderLoading()}
              </motion.div>
            ) : (
              <motion.div key="content">
                {renderWeather()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </motion.section>
  );
};

export default WeatherSection;