import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "mujpdscv",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-03-06",
});