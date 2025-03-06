import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./config";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}