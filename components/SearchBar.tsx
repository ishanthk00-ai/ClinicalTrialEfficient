"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import Button3D from "@/components/Button3D";

interface SearchBarProps {
  initialCondition?: string;
  initialLocation?: string;
  compact?: boolean;
}

export default function SearchBar({
  initialCondition = "",
  initialLocation = "",
  compact = false,
}: SearchBarProps) {
  const router = useRouter();
  const [condition, setCondition] = useState(initialCondition);
  const [location, setLocation] = useState(initialLocation);
  const locationRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!condition.trim()) return;
    const params = new URLSearchParams();
    if (condition.trim()) params.set("condition", condition.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/results?${params.toString()}`);
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <div className="flex flex-1 items-center bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]/20 transition-all">
          <div className="flex items-center pl-3 text-[#9CA3AF]">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Condition"
            className="flex-1 px-2 py-2 text-sm bg-transparent text-[#111827] placeholder:text-[#9CA3AF] outline-none"
          />
          <div className="h-5 w-px bg-[#E5E7EB]" />
          <div className="flex items-center pl-3 text-[#9CA3AF]">
            <MapPin size={15} />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="flex-1 px-2 py-2 text-sm bg-transparent text-[#111827] placeholder:text-[#9CA3AF] outline-none"
          />
        </div>
        <Button3D type="submit" size="sm">
          Search
        </Button3D>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20">
        {/* Condition input */}
        <div className="flex items-center px-5 pt-4 pb-2 gap-3">
          <Search size={18} className="text-[#9CA3AF] shrink-0" />
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                locationRef.current?.focus();
              }
            }}
            placeholder="Condition or disease (e.g. Alzheimer's, breast cancer)"
            className="flex-1 text-base text-[#111827] placeholder:text-[#9CA3AF] bg-transparent outline-none"
            autoFocus
          />
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-[#F3F4F6]" />

        {/* Location input */}
        <div className="flex items-center px-5 pt-2 pb-4 gap-3">
          <MapPin size={18} className="text-[#9CA3AF] shrink-0" />
          <input
            ref={locationRef}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location — city, state, or country (optional)"
            className="flex-1 text-base text-[#111827] placeholder:text-[#9CA3AF] bg-transparent outline-none"
          />
        </div>
      </div>

      <Button3D
        type="submit"
        disabled={!condition.trim()}
        className="mt-4 w-full"
      >
        Search clinical trials
      </Button3D>
    </form>
  );
}
