"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [locLoading, setLocLoading] = useState<boolean>(false);
  const GOOGLE_KEY =
    (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string | undefined) ||
    "AIzaSyCcKMokvRoT-R3dzEVQkrSp8CMXxCqScxc";

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        if (u?.name) setUserName(u.name as string);
      }
      const savedCity = localStorage.getItem("currentCity");
      if (savedCity) setCity(savedCity);
    } catch {}
  }, []);

  const reverseGeocodeCity = async (
    latitude: number,
    longitude: number
  ): Promise<string | null> => {
    // Try Google first
    try {
      if (GOOGLE_KEY) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data?.status === "OK" && Array.isArray(data.results)) {
            const first = data.results[0];
            const components: Array<{
              long_name: string;
              short_name: string;
              types: string[];
            }> = first?.address_components || [];

            const findType = (type: string) =>
              components.find((c) => c.types?.includes(type))?.long_name ||
              null;

            const locality = findType("locality");
            const admin1 = findType("administrative_area_level_1");
            const country = findType("country");
            const name = locality || admin1 || country || null;
            if (name) return name;
          }
        }
      }
    } catch {}

    // Fallback to OpenStreetMap Nominatim (no key required)
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return null;
      const data = await res.json();
      const addr = data?.address || {};
      const city =
        addr.city || addr.town || addr.village || addr.hamlet || null;
      const admin1 = addr.state || null;
      const country = addr.country || null;
      return city || admin1 || country || null;
    } catch {
      return null;
    }
  };

  const handleDetectLocation = async () => {
    if (locLoading) return;
    setLocLoading(true);
    try {
      const position: GeolocationPosition = await new Promise(
        (resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported"));
            return;
          }
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude } = position.coords;
      const resolvedCity = await reverseGeocodeCity(latitude, longitude);
      if (resolvedCity) {
        setCity(resolvedCity);
        try {
          localStorage.setItem("currentCity", resolvedCity);
        } catch {}
      }
    } catch {
      // ignore
    } finally {
      setLocLoading(false);
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 transition-all duration-300 md:h-20 md:px-6">
        {/* Left: Brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="select-none text-xl font-semibold tracking-tight md:text-2xl"
          >
            TravelBnb
          </Link>
        </div>

        {/* Middle: Navigation Tabs */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full px-6 py-3 text-base font-medium text-gray-900 bg-gray-100 transition-all duration-200 hover:bg-gray-200 hover:shadow-sm active:scale-95">
            Homes
          </button>
          <button className="rounded-full px-6 py-3 text-base font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm active:scale-95">
            Experiences
          </button>
          <button className="rounded-full px-6 py-3 text-base font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm active:scale-95">
            Services
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 md:gap-2 animate-fade-in">
          <Link
            href={userName ? "/host" : "/login"}
            className="hidden rounded-full px-6 py-3 text-base font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm active:scale-95 md:block"
          >
            Host
          </Link>
          {city ? (
            <button
              onClick={handleDetectLocation}
              className="rounded-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              title="Detected location"
            >
              {city}
            </button>
          ) : (
            <button
              onClick={handleDetectLocation}
              className="rounded-full p-3 hover:bg-gray-100"
              title="Detect my location"
            >
              {locLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 animate-spin text-gray-700"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity="0.25"
                  />
                  <path
                    d="M22 12a10 10 0 0 1-10 10"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity="0.75"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-gray-700"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12S6.615 21.75 12 21.75 21.75 17.385 21.75 12 17.385 2.25 12 2.25Zm-.75 1.6c-2.068.3-3.8 2.63-4.27 5.9h4.27V3.85Zm1.5 0v5.9h4.27c-.47-3.27-2.202-5.6-4.27-5.9Zm-1.5 7.4H6.98c.13 1.35.49 2.58 1.03 3.6.7 1.31 1.62 2.1 2.74 2.29V11.25Zm1.5 0v6.79c1.12-.19 2.04-.98 2.74-2.29.54-1.02.9-2.25 1.03-3.6H12.75Zm-1.5 8.19v1.86c-2.068-.3-3.8-2.63-4.27-5.9h4.27Zm1.5 1.86v-1.86h4.27c-.47 3.27-2.202 5.6-4.27 5.9Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )}
          {userName ? (
            <div className="flex items-center gap-3">
              {/* User Profile with Initial */}
              <Link
                href="/account"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white text-base font-medium transition-transform duration-200 hover:scale-105"
              >
                {userName.charAt(0).toUpperCase()}
              </Link>

              {/* Menu Button with Notification Dot */}
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-transform duration-200 hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M3.75 6a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 .53 1.28l-5.53 5.53v4.69a.75.75 0 0 1-1.17.62l-2.5-1.75a.75.75 0 0 1-.33-.62V12.06L3.22 6.53A.75.75 0 0 1 3.75 6Z" />
                </svg>
                {/* Notification Dot */}
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></div>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="group flex items-center gap-2 rounded-full border border-gray-200 p-1 pl-3 transition-all duration-200 hover:shadow-md hover:ring-1 hover:ring-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-gray-700"
                aria-hidden="true"
              >
                <path d="M3.75 7.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Z" />
              </svg>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-white transition-transform duration-200 group-hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12 2.25a5.25 5.25 0 0 0-3.712 9.028 8.253 8.253 0 0 0-4.79 7.121.75.75 0 0 0 1.5 0 6.75 6.75 0 0 1 13.5 0 .75.75 0 0 0 1.5 0 8.253 8.253 0 0 0-4.79-7.121A5.25 5.25 0 0 0 12 2.25Zm0 1.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z" />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
