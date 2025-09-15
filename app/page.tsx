import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import images from "@/app/Images";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />

      {/* Popular homes in Varanasi */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10">
        <h2 className="mb-6 text-xl font-semibold tracking-tight md:text-2xl">
          Popular homes in Varanasi
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { img: images.hall, title: "Cozy lounge" },
            { img: images.room, title: "Minimalist room" },
            { img: images.roomBlue, title: "Blue room" },
            { img: images.sofa, title: "Modern sofa" },
          ].map((card, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium">{card.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available this weekend */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-12">
        <h2 className="mb-6 text-xl font-semibold tracking-tight md:text-2xl">
          Available this weekend
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              img: images.hallRoom,
              title: "Spacious hall room",
              price: "$120 night",
            },
            {
              img: images.roomWithDesk,
              title: "Room with desk",
              price: "$95 night",
            },
            {
              img: images.sofaAndTV,
              title: "Living space with TV",
              price: "$140 night",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-base font-semibold">{card.title}</p>
                <p className="mt-1 text-sm text-gray-600">{card.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
