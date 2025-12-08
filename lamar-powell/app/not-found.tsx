import { Suspense } from "react";
import SearchParamsSync from "./search-params-sync";

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SearchParamsSync />
      <div className="flex min-h-screen items-center justify-center bg-black text-4xl font-black text-white">
        404 – LaMarin&apos;s Profile Not Found (Try ?sport=football)
      </div>
    </Suspense>
  );
}
