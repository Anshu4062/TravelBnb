const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 text-sm text-gray-700 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li>
                <a className="hover:underline" href="#">
                  Help Center
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  AirCover
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Anti-discrimination
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Disability support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Hosting</h3>
            <ul className="space-y-2">
              <li>
                <a className="hover:underline" href="#">
                  TravelBnb your home
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  AirCover for Hosts
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Hosting resources
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Community forum
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">TravelBnb</h3>
            <ul className="space-y-2">
              <li>
                <a className="hover:underline" href="#">
                  Newsroom
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Investors
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Gift cards
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Discover</h3>
            <ul className="space-y-2">
              <li>
                <a className="hover:underline" href="#">
                  Homes
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Experiences
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Top-rated stays
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-600 md:flex-row">
          <p>© {new Date().getFullYear()} TravelBnb, Inc.</p>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 hover:underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12S6.615 21.75 12 21.75 21.75 17.385 21.75 12 17.385 2.25 12 2.25Zm-.75 1.6c-2.068.3-3.8 2.63-4.27 5.9h4.27V3.85Zm1.5 0v5.9h4.27c-.47-3.27-2.202-5.6-4.27-5.9Zm-1.5 7.4H6.98c.13 1.35.49 2.58 1.03 3.6.7 1.31 1.62 2.1 2.74 2.29V11.25Zm1.5 0v6.79c1.12-.19 2.04-.98 2.74-2.29.54-1.02.9-2.25 1.03-3.6H12.75Zm-1.5 8.19v1.86c-2.068-.3-3.8-2.63-4.27-5.9h4.27Zm1.5 1.86v-1.86h4.27c-.47 3.27-2.202 5.6-4.27 5.9Z"
                  clipRule="evenodd"
                />
              </svg>
              English (IN)
            </button>
            <button className="hover:underline">₹ INR</button>
            <div className="mx-2 h-4 w-px bg-gray-300" />
            <a className="hover:underline" href="#">
              Privacy
            </a>
            <a className="hover:underline" href="#">
              Terms
            </a>
            <a className="hover:underline" href="#">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
