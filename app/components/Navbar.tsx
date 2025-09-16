"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        if (u?.name) setUserName(u.name as string);
      }
    } catch {}
  }, []);
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

        {/* Middle: Search */}
        <div className="flex-1 px-2 md:px-6">
          <div className="mx-auto hidden max-w-xl cursor-pointer items-center justify-between gap-2 rounded-full border border-gray-100 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-1 hover:ring-gray-200 md:flex animate-slide-up">
            <button className="truncate px-3 text-sm font-medium">
              Anywhere
            </button>
            <span className="h-5 w-px bg-gray-300" />
            <button className="truncate px-3 text-sm text-gray-600">
              Any week
            </button>
            <span className="h-5 w-px bg-gray-300" />
            <button className="truncate px-3 text-sm text-gray-600">
              Add guests
            </button>
            <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white transition-transform duration-200 hover:scale-105 active:scale-95">
              {/* Search icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 4.21 12.06l3.99 3.99a.75.75 0 1 0 1.06-1.06l-3.99-3.99A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Mobile: Compact search */}
          <div className="flex items-center gap-3 md:hidden animate-slide-up">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:ring-1 hover:ring-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-gray-600"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 4.21 12.06l3.99 3.99a.75.75 0 1 0 1.06-1.06l-3.99-3.99A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Where to?</span>
            </div>
            <button
              aria-label="Filters"
              className="rounded-full border border-gray-100 p-2 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-gray-700"
                aria-hidden="true"
              >
                <path d="M3.75 6a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 .53 1.28l-5.53 5.53v4.69a.75.75 0 0 1-1.17.62l-2.5-1.75a.75.75 0 0 1-.33-.62V12.06L3.22 6.53A.75.75 0 0 1 3.75 6Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 md:gap-2 animate-fade-in">
          <Link
            href={userName ? "/host" : "/login"}
            className="hidden rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-100 md:block"
          >
            Host
          </Link>
          <button className="rounded-full p-2 hover:bg-gray-100">
            {/* Globe icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-gray-700"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12S6.615 21.75 12 21.75 21.75 17.385 21.75 12 17.385 2.25 12 2.25Zm-.75 1.6c-2.068.3-3.8 2.63-4.27 5.9h4.27V3.85Zm1.5 0v5.9h4.27c-.47-3.27-2.202-5.6-4.27-5.9Zm-1.5 7.4H6.98c.13 1.35.49 2.58 1.03 3.6.7 1.31 1.62 2.1 2.74 2.29V11.25Zm1.5 0v6.79c1.12-.19 2.04-.98 2.74-2.29.54-1.02.9-2.25 1.03-3.6H12.75Zm-1.5 8.19v1.86c-2.068-.3-3.8-2.63-4.27-5.9h4.27Zm1.5 1.86v-1.86h4.27c-.47 3.27-2.202 5.6-4.27 5.9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <Link
            href={userName ? "/account" : "/login"}
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
            {userName && (
              <span className="pr-2 text-sm font-medium text-gray-800">
                {userName.split(" ")[0]}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
