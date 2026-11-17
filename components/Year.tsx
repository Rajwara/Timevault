"use client";

import { useEffect, useState } from "react";

export default function Year({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
