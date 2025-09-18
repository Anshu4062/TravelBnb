import React from "react";

const Header = () => {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center rounded-full border border-gray-100 bg-white p-2 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-1 hover:ring-gray-200 md:p-3">
            <div className="flex flex-1 items-center gap-2 rounded-full px-4 py-2 hover:bg-gray-50">
              <div className="flex w-32 flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase text-gray-900">
                  Where
                </span>
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                  placeholder="Search destinations"
                />
              </div>
            </div>
            <div className="hidden h-8 w-px bg-gray-300 md:block" />
            <div className="hidden flex-1 items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-gray-50 md:flex">
              <div className="flex w-28 flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase text-gray-900">
                  Check in
                </span>
                <button className="w-full text-left text-sm text-gray-500">
                  Add dates
                </button>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-gray-300 md:block" />
            <div className="hidden flex-1 items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-gray-50 md:flex">
              <div className="flex w-28 flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase text-gray-900">
                  Check out
                </span>
                <button className="w-full text-left text-sm text-gray-500">
                  Add dates
                </button>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-gray-300 md:block" />
            <div className="flex flex-1 items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-gray-50">
              <div className="flex w-28 flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase text-gray-900">
                  Who
                </span>
                <button className="w-full text-left text-sm text-gray-500">
                  Add guests
                </button>
              </div>
              <button className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white transition-transform duration-200 hover:scale-105 active:scale-95 md:h-12 md:w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 md:h-6 md:w-6"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 4.21 12.06l3.99 3.99a.75.75 0 1 0 1.06-1.06l-3.99-3.99A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
