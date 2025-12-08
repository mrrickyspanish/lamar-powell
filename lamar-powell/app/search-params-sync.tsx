"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSport, Sport } from "@/components/sport/SportContext";
import { useEffect, useRef } from "react";

export default function SearchParamsSync() {
  const { currentSport, setSport } = useSport();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isUpdatingUrl = useRef(false);

  // Sync URL to state on mount/param change
  useEffect(() => {
    if (isUpdatingUrl.current) {
      isUpdatingUrl.current = false;
      return;
    }
    
    const urlSport = searchParams.get("sport") as Sport | null;
    if (urlSport && ["football", "basketball"].includes(urlSport) && urlSport !== currentSport) {
      setSport(urlSport);
    } else if (!urlSport) {
      // Set default and update URL
      if (currentSport !== "football") {
        setSport("football");
      }
      isUpdatingUrl.current = true;
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("sport", "football");
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, currentSport, setSport, router, pathname]);

  // Sync state to URL when sport changes (from user clicking button)
  useEffect(() => {
    const urlSport = searchParams.get("sport");
    if (currentSport && urlSport !== currentSport) {
      isUpdatingUrl.current = true;
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("sport", currentSport);
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [currentSport, router, pathname, searchParams]);

  return null; // Invisible – just handles sync
}
