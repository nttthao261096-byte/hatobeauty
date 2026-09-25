"use client";

import { sendGAEvent } from "@next/third-parties/google";

type AnalyticsValue = string | number | boolean;

export function trackEvent(
  name: string,
  parameters: Record<string, AnalyticsValue> = {},
) {
  sendGAEvent("event", name, parameters);
}
