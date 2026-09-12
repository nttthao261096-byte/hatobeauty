"use client";

import { useEffect, useState } from "react";

import { getMinimumBookingDate } from "./booking-validation";

export function useMinimumBookingDate() {
  const [minimumBookingDate, setMinimumBookingDate] = useState("");

  useEffect(() => {
    const updateMinimumDate = () => setMinimumBookingDate(getMinimumBookingDate());
    updateMinimumDate();
    const timer = window.setInterval(updateMinimumDate, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return minimumBookingDate;
}
