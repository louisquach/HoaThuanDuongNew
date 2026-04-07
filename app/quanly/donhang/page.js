"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

const DonHangContent = dynamic(() => import("@/components/DonHangContent"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function DonHangPage() {
  return <DonHangContent />;
}

