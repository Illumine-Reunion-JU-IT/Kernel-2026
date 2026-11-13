import siteJson from "@/data/site.json";
import eventsJson from "@/data/events.json";
import speakersJson from "@/data/speakers.json";
import sponsorsJson from "@/data/sponsors.json";
import committeeJson from "@/data/core-committee.json";
import faqJson from "@/data/faq.json";
import galleryJson from "@/data/gallery.json";

import type {
  SiteContent,
  EventItem,
  Speaker,
  Sponsor,
  CommitteeMember,
  FAQItem,
  GalleryItem,
} from "@/types";

function fail(dataset: string, message: string): never {
  throw new Error(`[KERNEL content validation] ${dataset}: ${message}`);
}

function validateRequiredStrings(
  dataset: string,
  entries: unknown[],
  fields: string[],
): void {
  entries.forEach((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      fail(dataset, `Entry ${index} must be an object.`);
    }

    const record = entry as Record<string, unknown>;

    for (const field of fields) {
      if (
        typeof record[field] !== "string" ||
        record[field].trim().length === 0
      ) {
        fail(dataset, `Entry ${index} has a missing or invalid "${field}".`);
      }
    }

    if (typeof record.isPlaceholder !== "boolean") {
      fail(dataset, `Entry ${index} must define isPlaceholder as a boolean.`);
    }
  });
}

function validateUniqueIds(dataset: string, entries: { id: string }[]): void {
  const ids = new Set<string>();

  for (const entry of entries) {
    if (ids.has(entry.id)) {
      fail(dataset, `Duplicate id "${entry.id}".`);
    }
    ids.add(entry.id);
  }
}

function validateOptionalUrls(
  dataset: string,
  entries: Record<string, unknown>[],
  fields: string[],
): void {
  entries.forEach((entry, index) => {
    for (const field of fields) {
      const value = entry[field];

      if (value === null) continue;

      if (typeof value !== "string") {
        fail(dataset, `Entry ${index}: "${field}" must be a URL string or null.`);
      }

      try {
        const url = new URL(value);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
          fail(dataset, `Entry ${index}: "${field}" must use HTTP or HTTPS.`);
        }
      } catch {
        fail(dataset, `Entry ${index}: "${field}" is not a valid URL.`);
      }
    }
  });
}

function validateCollection<T extends { id: string }>(
  dataset: string,
  value: unknown,
  requiredFields: string[],
  urlFields: string[] = [],
): T[] {
  if (!Array.isArray(value)) {
    fail(dataset, "Expected a JSON array.");
  }

  // Empty collections are valid and safe to render.
  validateRequiredStrings(dataset, value, requiredFields);

  const records = value as Record<string, unknown>[];
  validateOptionalUrls(dataset, records, urlFields);

  const typedRecords = value as T[];
  validateUniqueIds(dataset, typedRecords);

  return typedRecords;
}

function validateSite(value: unknown): SiteContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail("site.json", "Expected a JSON object.");
  }

  const site = value as Record<string, unknown>;
  const requiredFields = [
    "eventName",
    "edition",
    "department",
    "university",
    "eventDates",
    "venue",
    "contactEmail",
  ];

  for (const field of [...requiredFields, "tagline", "heroImage", "heroImageAlt", "videoPoster"]) {
    if (
      typeof site[field] !== "string" ||
      site[field].trim().length === 0
    ) {
      fail("site.json", `Missing or invalid "${field}".`);
    }
  }

  if (site.videoUrl !== null && typeof site.videoUrl !== "string") {
    fail("site.json", '"videoUrl" must be a path, an https URL or null.');
  }

  if (!Array.isArray(site.stats)) {
    fail("site.json", '"stats" must be an array of { value, label }.');
  }
  (site.stats as unknown[]).forEach((stat, i) => {
    const s = stat as Record<string, unknown>;
    if (typeof s?.value !== "string" || typeof s?.label !== "string") {
      fail("site.json", `stats[${i}] needs string "value" and "label".`);
    }
  });

  if (
    typeof site.contactEmail === "string" &&
    !site.contactEmail.startsWith("TBD:") &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contactEmail)
  ) {
    fail("site.json", '"contactEmail" must be a valid email or a TBD value.');
  }

  if (site.registrationUrl !== null && typeof site.registrationUrl !== "string") {
    fail("site.json", '"registrationUrl" must be a URL string or null.');
  }

  if (
    typeof site.registrationUrl === "string" &&
    !/^https?:\/\//.test(site.registrationUrl)
  ) {
    fail("site.json", '"registrationUrl" must use HTTP or HTTPS.');
  }

  if (!site.socialLinks || typeof site.socialLinks !== "object") {
    fail("site.json", 'Missing or invalid "socialLinks" object.');
  }

  const socialLinks = site.socialLinks as Record<string, unknown>;

  for (const field of ["instagram", "linkedin", "youtube", "website"]) {
    const url = socialLinks[field];

    if (url !== null && typeof url !== "string") {
      fail("site.json", `"socialLinks.${field}" must be a URL string or null.`);
    }

    if (typeof url === "string" && !/^https?:\/\//.test(url)) {
      fail("site.json", `"socialLinks.${field}" must use HTTP or HTTPS.`);
    }
  }

  return site as unknown as SiteContent;
}

export const siteContent = validateSite(siteJson);

export const events = validateCollection<EventItem>(
  "events.json",
  eventsJson,
  [
    "id",
    "title",
    "slug",
    "category",
    "tagline",
    "summary",
    "date",
    "venue",
    "imagePath",
    "imageAlt",
    "organiserNote",
  ],
  ["registrationUrl"],
);

export const speakers = validateCollection<Speaker>(
  "speakers.json",
  speakersJson,
  [
    "id",
    "name",
    "role",
    "organisation",
    "imagePath",
    "imageAlt",
    "organiserNote",
  ],
  ["url"],
);

export const sponsors = validateCollection<Sponsor>(
  "sponsors.json",
  sponsorsJson,
  [
    "id",
    "name",
    "category",
    "logoPath",
    "logoAlt",
    "organiserNote",
  ],
  ["url"],
);

export const coreCommittee = validateCollection<CommitteeMember>(
  "core-committee.json",
  committeeJson,
  [
    "id",
    "name",
    "role",
    "imagePath",
    "imageAlt",
    "organiserNote",
  ],
  ["url"],
);

export const faqs = validateCollection<FAQItem>(
  "faq.json",
  faqJson,
  ["id", "question", "answer", "organiserNote"],
);

export const gallery = validateCollection<GalleryItem>(
  "gallery.json",
  galleryJson,
  [
    "id",
    "title",
    "imagePath",
    "altText",
    "caption",
    "organiserNote",
  ],
  ["url"],
);

events.forEach((event, index) => {
  const facts = (event as { facts?: unknown }).facts;
  if (!Array.isArray(facts)) {
    fail("events.json", `Entry ${index} must define "facts" as an array.`);
  }
  facts.forEach((fact, f) => {
    const item = fact as Record<string, unknown>;
    if (typeof item?.label !== "string" || typeof item?.value !== "string") {
      fail("events.json", `Entry ${index}, fact ${f} needs string "label" and "value".`);
    }
  });
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(event.slug)) {
    fail("events.json", `Entry ${index}: slug "${event.slug}" must be lowercase kebab-case.`);
  }
});

/** Entries safe to show publicly: sample/placeholder records are hidden. */
export function publicOnly<T extends { isPlaceholder: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.isPlaceholder);
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug);
}
