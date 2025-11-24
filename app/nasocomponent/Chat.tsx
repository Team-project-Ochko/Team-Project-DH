"use client";

import { useEffect, useState } from "react";
import { MapPin, Users } from "lucide-react";

interface Hall {
  id: number;
  name: string;
  location: string;
  capacity: number;
  price: number;
}

const LOCATIONS = [
  "Баянгол",
  "Баянзүрх",
  "Сонгино хайрхан",
  "Сүхбаатар",
  "Хан-Уул",
  "Чингэлтэй",
  "Төв → Зуунмод",
  "Архангай → Эрдэнэзэлбулган",
  "Дархан-Уул → Дархан",
];

export default function EventHallsPage() {
  const [data, setData] = useState<Hall[]>([]);
  const [filteredData, setFilteredData] = useState<Hall[]>([]);
  const [location, setLocation] = useState("");
  const [openLoc, setOpenLoc] = useState(false);
  const [price, setPrice] = useState(1500);
  const [capacity, setCapacity] = useState("");

  const MIN = 500;
  const MAX = 5000;

  const resetFilters = () => {
    setLocation("");
    setPrice(1500);
    setCapacity("");
  };

  async function getData() {
    const res = await fetch("/api/eventhall", { cache: "no-store" });
    const json = await res.json();
    setData(json.data);
    setFilteredData(json.data);
  }

  // Реалтайм фильтэр: location, price, capacity өөрчлөгдөхөд шууд filteredData update
  useEffect(() => {
    let filtered = data;

    if (location) {
      filtered = filtered.filter((hall) => hall.location === location);
    }
    if (capacity) {
      filtered = filtered.filter((hall) => hall.capacity >= Number(capacity));
    }
    if (price) {
      filtered = filtered.filter((hall) => hall.price <= price);
    }

    setFilteredData(filtered);
  }, [location, capacity, price, data]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-[600px] w-[700px]">
      {/* Filter Sidebar */}
      <aside className="w-full md:w-[400px] bg-[#1F2024] text-gray-200 rounded-2xl p-6 shadow-lg border border-[#2f2f36] relative">
        <h2 className="text-2xl font-semibold mb-6">Filter Event Halls</h2>

        {/* Location */}
        <label className="block mb-6 relative">
          <div className="mb-2 text-gray-300">Location</div>
          <button
            onClick={() => setOpenLoc(!openLoc)}
            className="w-full bg-[#2A2B2F] px-3 py-3 rounded-xl flex justify-between items-center text-left"
          >
            <span className="text-gray-300">{location || "Сум/дүүрэг…"}</span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
                openLoc ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openLoc && (
            <div className="absolute z-20 mt-2 w-full bg-[#444548] rounded-xl shadow-xl py-2">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc}
                  onClick={() => {
                    setLocation(loc);
                    setOpenLoc(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-white/10 flex justify-between items-center"
                >
                  <span>{loc}</span>
                  {location === loc && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
        </label>

        {/* Price Range */}
        <div className="mb-6">
          <div className="mb-2 text-gray-300">Max Price</div>
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full slider-thumb"
          />
          <div className="flex justify-between mt-3 text-sm text-gray-300">
            <span>${MIN}</span>
            <span>${MAX}</span>
          </div>
          <div className="mt-1 text-gray-200">${price}</div>
        </div>

        {/* Capacity */}
        <label className="block mb-6">
          <div className="mb-2 text-gray-300">Capacity</div>
          <div className="flex items-center gap-3 bg-[#2A2B2F] px-3 py-3 rounded-xl">
            <Users className="text-gray-400" />
            <input
              type="number"
              min={0}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Min. guests"
              className="bg-transparent outline-none w-full placeholder:text-gray-400 text-sm"
            />
          </div>
        </label>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="border border-blue-600 text-blue-400 py-3 rounded-xl w-full hover:bg-white/5"
        >
          Reset Filters
        </button>
      </aside>
    </div>
  );
}
