"use client";
import { useEffect, useState, use as useUnwrap } from "react";
import Navbar from "@/app/components/Navbar";

type Listing = {
  _id: string;
  placeType: string;
  photos?: string[];
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: { privateAttached: number; dedicated: number; shared: number };
  locksAllBedrooms: boolean;
  address?: { city?: string; state?: string };
  amenitiesFav?: string[];
  amenitiesStandout?: string[];
  safetyItems?: string[];
  price?: number;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
};

export default function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = useUnwrap(params);
  const [listing, setListing] = useState<Listing | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const data = await res.json();
        if (data && !data.error) setListing(data);
      } catch {}
    })();
  }, [id]);

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize map when listing and map are loaded
  useEffect(() => {
    if (!mapLoaded || !listing?.location) return;

    const initMap = () => {
      const mapElement = document.getElementById("listing-map");
      if (!mapElement) return;

      const map = new window.google.maps.Map(mapElement, {
        center: {
          lat: listing.location.latitude,
          lng: listing.location.longitude,
        },
        zoom: 15,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Add marker
      new window.google.maps.Marker({
        position: {
          lat: listing.location.latitude,
          lng: listing.location.longitude,
        },
        map: map,
        title: listing.location.address,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        },
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initMap, 100);
    return () => clearTimeout(timer);
  }, [mapLoaded, listing]);

  return (
    <div>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        {!listing ? (
          <p className="text-gray-600">Loading…</p>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">{listing.placeType}</h1>
              <p className="text-gray-600">
                {listing.address?.city || ""} {listing.address?.state || ""}
              </p>
            </div>

            {/* Photo mosaic */}
            {listing.photos && listing.photos.length > 0 && (
              <div className="mb-8 grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
                <div className="col-span-2 row-span-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={listing.photos[0]}
                    alt="photo-0"
                    className="h-full w-full object-cover"
                  />
                </div>
                {listing.photos.slice(1, 5).map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`photo-${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                ))}
              </div>
            )}

            {/* Overview with reserve sidebar */}
            <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-2xl ring-1 ring-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="mb-3 text-lg font-semibold">
                    About this place
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Stat label="Guests" value={listing.guests} />
                    <Stat label="Bedrooms" value={listing.bedrooms} />
                    <Stat label="Beds" value={listing.beds} />
                    <Stat
                      label="Locks on bedrooms"
                      value={listing.locksAllBedrooms ? "Yes" : "No"}
                    />
                  </div>

                  <div className="mt-6 rounded-xl ring-1 ring-gray-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-2 font-medium">Bathrooms</h3>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 text-sm">
                      <li>
                        Private and attached:{" "}
                        {listing.bathrooms.privateAttached}
                      </li>
                      <li>Dedicated: {listing.bathrooms.dedicated}</li>
                      <li>Shared: {listing.bathrooms.shared}</li>
                    </ul>
                  </div>

                  <div className="mt-6 rounded-xl ring-1 ring-gray-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-2 font-medium">Guest favourites</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.amenitiesFav?.map((a, i) => (
                        <span
                          key={i}
                          className="rounded-full border px-3 py-1 text-sm"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl ring-1 ring-gray-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-2 font-medium">Standout amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.amenitiesStandout?.map((a, i) => (
                        <span
                          key={i}
                          className="rounded-full border px-3 py-1 text-sm"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl ring-1 ring-gray-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-2 font-medium">Safety items</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.safetyItems?.map((a, i) => (
                        <span
                          key={i}
                          className="rounded-full border px-3 py-1 text-sm"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {listing.location && (
                    <div className="mt-6 rounded-xl ring-1 ring-gray-200 bg-white p-4 shadow-sm">
                      <h3 className="mb-2 font-medium">Location</h3>
                      <p className="mb-3 text-sm text-gray-600">
                        {listing.location.address}
                      </p>
                      <div className="relative">
                        <div
                          id="listing-map"
                          className="h-64 w-full rounded-lg ring-1 ring-gray-200"
                          style={{ minHeight: "256px" }}
                        />
                        {!mapLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                            <div className="text-center">
                              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-rose-500 mx-auto mb-2"></div>
                              <p className="text-sm text-gray-600">
                                Loading map...
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Coordinates: {listing.location.latitude.toFixed(6)},{" "}
                        {listing.location.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <aside className="h-max rounded-2xl ring-1 ring-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold">Reserve</h3>
                {listing.price && (
                  <div className="mb-3 text-2xl font-semibold">
                    ₹{listing.price}{" "}
                    <span className="text-sm font-normal text-gray-600">
                      per night
                    </span>
                  </div>
                )}
                <div className="mb-3 text-sm text-gray-600">
                  Pick your dates to see exact pricing
                </div>
                <button className="w-full rounded-full bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-600">
                  Reserve
                </button>
                <p className="mt-2 text-center text-xs text-gray-600">
                  You won&apos;t be charged yet
                </p>
              </aside>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
}
