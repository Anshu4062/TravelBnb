"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CounterProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
};

const Counter = ({
  label,
  value,
  onChange,
  min = 0,
  max = 50,
}: CounterProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 shadow-sm transition hover:shadow-md">
      <span className="text-[15px] font-medium text-gray-900">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`decrease ${label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-50 active:scale-95"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-semibold text-gray-900">
          {value}
        </span>
        <button
          type="button"
          aria-label={`increase ${label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-50 active:scale-95"
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    </div>
  );
};

const PROPERTY_TYPES = [
  "House",
  "Flat/apartment",
  "Barn",
  "Bed & breakfast",
  "Boat",
  "Cabin",
  "Campervan/motorhome",
  "Casa particular",
  "Castle",
  "Cave",
  "Container",
  "Cycladic home",
  "Dammuso",
  "Dome",
  "Earth home",
  "Farm",
  "Guest house",
  "Hotel",
  "Houseboat",
  "Riad",
  "Ryokan",
  "Shepherd’s hut",
  "Tent",
  "Tiny home",
  "Tower",
  "Tree house",
  "Trullo",
  "Windmill",
  "Yurt",
];

export default function HostPage() {
  const router = useRouter();
  const [guests, setGuests] = useState(2);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [locksAllBedrooms, setLocksAllBedrooms] = useState<boolean | null>(
    null
  );

  const [address, setAddress] = useState({
    country: "India - IN",
    unit: "",
    street: "",
    landmark: "",
    district: "",
    city: "",
    state: "",
    pin: "",
  });

  const [placeType, setPlaceType] = useState<string>("");
  const [bathsPrivate, setBathsPrivate] = useState(0);
  const [bathsDedicated, setBathsDedicated] = useState(0);
  const [bathsShared, setBathsShared] = useState(0);

  // Additional sections state
  const [whoThere, setWhoThere] = useState<string[]>([]);
  const [amenitiesFav, setAmenitiesFav] = useState<string[]>([]);
  const [amenitiesStandout, setAmenitiesStandout] = useState<string[]>([]);
  const [safetyItems, setSafetyItems] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) router.replace("/login?next=/host");
  }, [router]);

  const isValid = useMemo(() => {
    return (
      guests > 0 &&
      bedrooms >= 0 &&
      beds >= 0 &&
      locksAllBedrooms !== null &&
      placeType.length > 0 &&
      address.city.trim().length > 0 &&
      address.state.trim().length > 0 &&
      address.pin.trim().length >= 4
    );
  }, [guests, bedrooms, beds, locksAllBedrooms, placeType, address]);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">
        Let’s start with the basics
      </h1>

      {/* Property type */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Which of these best describes your place?
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setPlaceType(type)}
              className={`rounded-xl border px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                placeType === type
                  ? "border-rose-500 bg-rose-50"
                  : "border-gray-200"
              }`}
            >
              <div className="font-medium text-gray-900">{type}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Address SECOND */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Confirm your address</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Country/region
            </label>
            <input
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="India - IN"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Flat, house, etc. (optional)
            </label>
            <input
              value={address.unit}
              onChange={(e) => setAddress({ ...address, unit: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="31"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Street address
            </label>
            <input
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="Street address"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Nearby landmark (optional)
            </label>
            <input
              value={address.landmark}
              onChange={(e) =>
                setAddress({ ...address, landmark: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="Landmark"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              District/locality (optional)
            </label>
            <input
              value={address.district}
              onChange={(e) =>
                setAddress({ ...address, district: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="Locality"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">City/town</label>
            <input
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="City"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">State</label>
            <input
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="State"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">PIN code</label>
            <input
              value={address.pin}
              onChange={(e) => setAddress({ ...address, pin: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="PIN code"
            />
          </div>
        </div>
      </section>

      {/* Basics + Bathrooms (compact side-by-side) */}
      <section className="mt-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Basics */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">
              How many people can stay here?
            </h2>
            <div className="space-y-2">
              <Counter
                label="Guests"
                value={guests}
                onChange={setGuests}
                min={1}
              />
              <Counter
                label="Bedrooms"
                value={bedrooms}
                onChange={setBedrooms}
              />
              <Counter label="Beds" value={beds} onChange={setBeds} />
            </div>
            <div className="mt-4 rounded-xl border border-gray-200 p-3">
              <p className="mb-2 text-gray-900">
                Does every bedroom have a lock?
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setLocksAllBedrooms(true)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    locksAllBedrooms === true
                      ? "bg-rose-500 text-white"
                      : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setLocksAllBedrooms(false)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    locksAllBedrooms === false
                      ? "bg-rose-500 text-white"
                      : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">
              What kind of bathrooms are available to guests?
            </h2>
            <div className="space-y-2">
              <BathroomCounterRow
                title="Private and attached"
                description="Connected to the guest’s room and just for them."
                value={bathsPrivate}
                onChange={setBathsPrivate}
              />
              <BathroomCounterRow
                title="Dedicated"
                description="Private, but accessed via a shared space like a hallway."
                value={bathsDedicated}
                onChange={setBathsDedicated}
              />
              <BathroomCounterRow
                title="Shared"
                description="Shared with other people."
                value={bathsShared}
                onChange={setBathsShared}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who else might be there? */}
      <section className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-2xl font-semibold">
          Who else might be there?
        </h2>
        <p className="mb-5 text-sm text-gray-600">
          Guests need to know whether they’ll encounter other people during
          their stay.
        </p>
        <SelectableGrid
          options={["Me", "My family", "Other guests", "Flatmates/housemates"]}
          selected={whoThere}
          onChange={setWhoThere}
        />
      </section>

      {/* Guest favourites */}
      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-2xl font-semibold">
          Tell guests what your place has to offer
        </h2>
        <p className="mb-5 text-sm text-gray-600">
          You can add more amenities after you publish your listing.
        </p>
        <h3 className="mb-3 text-base font-semibold">
          What about these guest favourites?
        </h3>
        <SelectableGrid
          options={[
            "Wifi",
            "TV",
            "Kitchen",
            "Washing machine",
            "Free parking on premises",
            "Paid parking on premises",
            "Air conditioning",
            "Dedicated workspace",
          ]}
          selected={amenitiesFav}
          onChange={setAmenitiesFav}
          cols={3}
        />
      </section>

      {/* Standout amenities */}
      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-base font-semibold">
          Do you have any standout amenities?
        </h3>
        <SelectableGrid
          options={[
            "Pool",
            "Hot tub",
            "Patio",
            "BBQ grill",
            "Outdoor dining area",
            "Firepit",
            "Pool table",
            "Indoor fireplace",
            "Piano",
            "Exercise equipment",
            "Lake access",
            "Beach access",
            "Ski-in/out",
            "Outdoor shower",
          ]}
          selected={amenitiesStandout}
          onChange={setAmenitiesStandout}
          cols={3}
        />
      </section>

      {/* Safety items */}
      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-base font-semibold">
          Do you have any of these safety items?
        </h3>
        <SelectableGrid
          options={[
            "Smoke alarm",
            "First aid kit",
            "Fire extinguisher",
            "Carbon monoxide alarm",
          ]}
          selected={safetyItems}
          onChange={setSafetyItems}
          cols={3}
        />
      </section>

      {/* Photos uploader */}
      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-2xl font-semibold">
          Add some photos of your place
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          You&apos;ll need 5 photos to get started. You can add more or make
          changes later.
        </p>
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-4 w-full max-w-3xl rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={async (e) => {
                const files = Array.from(e.target.files || []);
                const compress = (file: File) =>
                  new Promise<string>((resolve, reject) => {
                    const img = new Image();
                    const url = URL.createObjectURL(file);
                    img.onload = () => {
                      const canvas = document.createElement("canvas");
                      const maxW = 1600;
                      const scale = Math.min(1, maxW / img.width);
                      canvas.width = Math.round(img.width * scale);
                      canvas.height = Math.round(img.height * scale);
                      const ctx = canvas.getContext("2d");
                      if (!ctx) return reject(new Error("no ctx"));
                      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
                      URL.revokeObjectURL(url);
                      resolve(dataUrl);
                    };
                    img.onerror = () => reject(new Error("image load error"));
                    img.src = url;
                  });
                try {
                  const dataUrls = await Promise.all(files.map(compress));
                  setPhotos((prev) => [...prev, ...dataUrls]);
                } catch {
                  const readers = files.map(
                    (file) =>
                      new Promise<string>((resolve, reject) => {
                        const fr = new FileReader();
                        fr.onload = () => resolve(String(fr.result));
                        fr.onerror = () => reject(fr.error);
                        fr.readAsDataURL(file);
                      })
                  );
                  Promise.all(readers)
                    .then((dataUrls) =>
                      setPhotos((prev) => [...prev, ...dataUrls])
                    )
                    .catch(() => {});
                }
              }}
              id="photos-input"
            />
            <label
              htmlFor="photos-input"
              className="inline-flex cursor-pointer items-center rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
            >
              Add photos
            </label>
          </div>

          {photos.length > 0 && (
            <div className="grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-3">
              {photos.map((src, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl border"
                >
                  <img
                    src={src}
                    alt={`photo-${idx}`}
                    className="h-40 w-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 hidden rounded-full bg-white/90 px-2 py-1 text-xs shadow group-hover:block"
                    onClick={() =>
                      setPhotos((prev) => prev.filter((_, i) => i !== idx))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Actions */}
      <div className="sticky bottom-0 mt-8 flex items-center justify-between border-t bg-white/80 px-2 py-4 backdrop-blur">
        <button
          type="button"
          className="rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-50"
          onClick={() => router.back()}
        >
          Back
        </button>
        <button
          type="button"
          disabled={!isValid}
          className="rounded-full bg-rose-500 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={async () => {
            // If any images are base64 data URLs, upload them first and get permanent URLs
            let uploadedUrls: string[] = photos;
            try {
              if (photos.some((p) => p.startsWith("data:"))) {
                const upRes = await fetch("/api/files", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ files: photos }),
                });
                const upData = await upRes.json();
                if (!upRes.ok) throw new Error(upData.error || "Upload failed");
                uploadedUrls = upData.urls as string[];
              }
            } catch (e) {
              setToast({ type: "error", text: "Image upload failed" });
              setTimeout(() => setToast(null), 3000);
              return;
            }
            const payload = {
              placeType,
              guests,
              bedrooms,
              beds,
              locksAllBedrooms: Boolean(locksAllBedrooms),
              bathrooms: {
                privateAttached: bathsPrivate,
                dedicated: bathsDedicated,
                shared: bathsShared,
              },
              whoThere,
              amenitiesFav,
              amenitiesStandout,
              safetyItems,
              address,
              photos: uploadedUrls,
            };
            try {
              const res = await fetch("/api/listings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              const data = await res.json();
              if (res.ok) {
                setToast({
                  type: "success",
                  text: `Saved listing (#${data.id.slice(-6)}).`,
                });
                setTimeout(() => setToast(null), 2500);
              } else {
                setToast({
                  type: "error",
                  text: data.error || "Failed to save",
                });
                setTimeout(() => setToast(null), 3000);
              }
            } catch (err) {
              setToast({ type: "error", text: "Network error" });
              setTimeout(() => setToast(null), 3000);
            }
          }}
        >
          Next
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[100] rounded-xl px-4 py-3 text-sm shadow-lg ring-1 backdrop-blur ${
            toast.type === "success"
              ? "bg-white/90 text-gray-900 ring-green-300"
              : "bg-white/90 text-gray-900 ring-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-2.5 w-2.5 rounded-full ${
                toast.type === "success" ? "bg-green-500" : "bg-rose-500"
              }`}
            />
            <span>{toast.text}</span>
          </div>
        </div>
      )}
    </main>
  );
}

type BathroomCounterRowProps = {
  title: string;
  description: string;
  value: number;
  onChange: (v: number) => void;
};
function BathroomCounterRow({
  title,
  description,
  value,
  onChange,
}: BathroomCounterRowProps) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-b-0">
      <div className="mr-4">
        <div className="font-medium text-gray-900">{title}</div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <InlineCounter value={value} onChange={onChange} />
    </div>
  );
}

type SelectableGridProps = {
  options: string[];
  selected: string[];
  onChange: (vals: string[]) => void;
  cols?: number;
};
function SelectableGrid({
  options,
  selected,
  onChange,
  cols = 2,
}: SelectableGridProps) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((v) => v !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };
  return (
    <div
      className={`grid grid-cols-1 gap-3 sm:grid-cols-${cols} lg:grid-cols-${cols}`}
    >
      {options.map((opt) => {
        const isActive = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`rounded-xl border px-4 py-4 text-left transition ${
              isActive
                ? "border-rose-500 bg-rose-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="font-medium text-gray-900">{opt}</div>
          </button>
        );
      })}
    </div>
  );
}
type InlineCounterProps = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
};
function InlineCounter({
  value,
  onChange,
  min = 0,
  max = 50,
}: InlineCounterProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="decrease"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-50 active:scale-95"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="w-5 text-center text-sm font-semibold text-gray-900">
        {value}
      </span>
      <button
        type="button"
        aria-label="increase"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-50 active:scale-95"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
