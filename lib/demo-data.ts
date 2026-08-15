import type { Device, Look, LookVariant } from "@/lib/types";

export const devices: Device[] = [
  {
    id: "fuji-x100vi",
    brand: "Fujifilm",
    model: "X100VI",
    brandSlug: "fujifilm",
    modelSlug: "x100vi",
    shortLabel: "X100VI",
    ecosystemTerm: "Film Simulation Recipe",
    description:
      "A compact fixed-lens camera with deep in-camera color controls and a mature recipe culture.",
  },
  {
    id: "ricoh-gr-iv",
    brand: "Ricoh",
    model: "GR IV",
    brandSlug: "ricoh",
    modelSlug: "gr-iv",
    shortLabel: "GR IV",
    ecosystemTerm: "Image Control Recipe",
    description:
      "A pocket street camera built for fast shooting, with configurable Image Controls and compact custom settings.",
  },
];

export const looks: Look[] = [
  {
    id: "look-tokyo-midnight",
    slug: "tokyo-midnight",
    name: "Tokyo Midnight",
    kicker: "Neon · Wet streets · Deep color",
    summary:
      "Cool shadows, controlled highlights, and saturated signs for nights that feel cinematic without crushing the street detail.",
    creator: "SOOCLY Lab",
    coverImage:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=86",
    previewFilter: "contrast(1.12) saturate(1.22) hue-rotate(338deg) brightness(.88)",
    tags: ["Night", "Street", "Neon"],
    accent: "#7cb7ff",
  },
  {
    id: "look-golden-sunday",
    slug: "golden-sunday",
    name: "Golden Sunday",
    kicker: "Warm light · Travel · Skin-friendly",
    summary:
      "Warm highlights and gentle contrast made for late-afternoon walks, travel details, and people in soft sun.",
    creator: "SOOCLY Lab",
    coverImage:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1800&q=86",
    previewFilter: "contrast(1.04) saturate(1.08) sepia(.16) brightness(1.03)",
    tags: ["Golden Hour", "Travel", "Portrait"],
    accent: "#ffc96b",
  },
  {
    id: "look-summer-chrome",
    slug: "summer-chrome",
    name: "Summer Chrome",
    kicker: "Clean blue · Crisp green · Daylight",
    summary:
      "Bright daylight with restrained saturation, cleaner skies, and a slightly graphic chrome-like separation.",
    creator: "SOOCLY Lab",
    coverImage:
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1800&q=86",
    previewFilter: "contrast(1.09) saturate(.92) hue-rotate(352deg) brightness(1.02)",
    tags: ["Daylight", "Travel", "Color"],
    accent: "#79d1c3",
  },
  {
    id: "look-soft-portra",
    slug: "soft-portra",
    name: "Soft Portra",
    kicker: "Muted color · Gentle skin · Soft contrast",
    summary:
      "A calm pastel look with lifted shadows and restrained reds for portraits, cafés, and everyday memory-making.",
    creator: "SOOCLY Lab",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=86",
    previewFilter: "contrast(.92) saturate(.84) sepia(.08) brightness(1.06)",
    tags: ["Portrait", "Everyday", "Pastel"],
    accent: "#f1a9a0",
  },
  {
    id: "look-neon-rain",
    slug: "neon-rain",
    name: "Neon Rain",
    kicker: "Blue hour · Reflections · Punchy signs",
    summary:
      "A cooler, denser night treatment tuned for reflected light, rainy pavement, and mixed LED color.",
    creator: "SOOCLY Lab",
    coverImage:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1800&q=86",
    previewFilter: "contrast(1.18) saturate(1.16) hue-rotate(14deg) brightness(.82)",
    tags: ["Night", "Rain", "Urban"],
    accent: "#9b8cff",
  },
  {
    id: "look-quiet-morning",
    slug: "quiet-morning",
    name: "Quiet Morning",
    kicker: "Soft daylight · Low saturation · Calm",
    summary:
      "Low-key color and open shadows for slow mornings, interiors, overcast streets, and quieter documentary frames.",
    creator: "SOOCLY Lab",
    coverImage:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=86",
    previewFilter: "contrast(.9) saturate(.72) brightness(1.05) sepia(.05)",
    tags: ["Overcast", "Everyday", "Soft"],
    accent: "#b7c6b0",
  },
];

export const lookVariants: LookVariant[] = [
  {
    id: "tokyo-midnight-x100vi",
    lookId: "look-tokyo-midnight",
    deviceId: "fuji-x100vi",
    status: "prototype",
    settingsLabel: "Fujifilm Film Simulation Settings",
    settings: [
      { label: "Film Simulation", value: "Classic Negative" },
      { label: "Dynamic Range", value: "DR400" },
      { label: "White Balance", value: "Auto" },
      { label: "WB Shift", value: "R +2 / B -4" },
      { label: "Highlight", value: "-1" },
      { label: "Shadow", value: "+2" },
      { label: "Color", value: "+2" },
      { label: "Sharpness", value: "-1" },
      { label: "High ISO NR", value: "-4" },
      { label: "Clarity", value: "-2" },
      { label: "Grain", value: "Strong / Small" },
      { label: "Color Chrome", value: "Strong" },
    ],
    bestFor: ["Night streets", "Neon signs", "Rainy city scenes"],
    lighting: ["Blue hour", "Night", "Mixed artificial light"],
    notes: [
      "Protect bright signage; expose for the highlights rather than the pavement.",
      "Use this as a prototype UI sample only. Final release settings require real X100VI calibration.",
    ],
  },
  {
    id: "tokyo-midnight-griv",
    lookId: "look-tokyo-midnight",
    deviceId: "ricoh-gr-iv",
    status: "prototype",
    settingsLabel: "Ricoh Image Control Settings",
    settings: [
      { label: "Image Control", value: "Negative Film" },
      { label: "Saturation", value: "+2" },
      { label: "Hue", value: "-1" },
      { label: "High/Low Key", value: "-1" },
      { label: "Contrast", value: "+2" },
      { label: "Contrast Highlight", value: "-2" },
      { label: "Contrast Shadow", value: "+1" },
      { label: "Sharpness", value: "0" },
      { label: "Shading", value: "+1" },
      { label: "Clarity", value: "-1" },
      { label: "White Balance", value: "Multi Auto" },
      { label: "WB Fine Tune", value: "A2 / G1" },
    ],
    bestFor: ["Night streets", "Neon signs", "Fast snapshots"],
    lighting: ["Blue hour", "Night", "Mixed artificial light"],
    notes: [
      "Keep exposure compensation easy to reach; mixed lighting changes quickly on the street.",
      "Use this as a prototype UI sample only. Final release settings require real GR IV calibration.",
    ],
  },
  {
    id: "golden-sunday-x100vi",
    lookId: "look-golden-sunday",
    deviceId: "fuji-x100vi",
    status: "prototype",
    settingsLabel: "Fujifilm Film Simulation Settings",
    settings: [
      { label: "Film Simulation", value: "Reala Ace" },
      { label: "Dynamic Range", value: "DR200" },
      { label: "White Balance", value: "Daylight" },
      { label: "WB Shift", value: "R +3 / B -2" },
      { label: "Highlight", value: "-1" },
      { label: "Shadow", value: "-1" },
      { label: "Color", value: "+1" },
      { label: "Sharpness", value: "0" },
      { label: "Clarity", value: "-1" },
      { label: "Grain", value: "Weak / Small" },
    ],
    bestFor: ["Golden hour", "Travel", "People outdoors"],
    lighting: ["Late afternoon", "Warm daylight"],
    notes: [
      "Best when the light itself is warm; avoid forcing the look under cool fluorescent interiors.",
      "Prototype settings only; not verified camera output.",
    ],
  },
  {
    id: "summer-chrome-x100vi",
    lookId: "look-summer-chrome",
    deviceId: "fuji-x100vi",
    status: "prototype",
    settingsLabel: "Fujifilm Film Simulation Settings",
    settings: [
      { label: "Film Simulation", value: "Classic Chrome" },
      { label: "Dynamic Range", value: "DR200" },
      { label: "White Balance", value: "Auto" },
      { label: "WB Shift", value: "R -1 / B -2" },
      { label: "Highlight", value: "0" },
      { label: "Shadow", value: "+1" },
      { label: "Color", value: "+1" },
      { label: "Clarity", value: "+1" },
      { label: "Color Chrome FX Blue", value: "Weak" },
    ],
    bestFor: ["Travel", "Daylight street", "Architecture"],
    lighting: ["Clear daylight", "Bright overcast"],
    notes: [
      "Keep whites clean; this direction is meant to feel crisp rather than nostalgic.",
      "Prototype settings only; not verified camera output.",
    ],
  },
  {
    id: "summer-chrome-griv",
    lookId: "look-summer-chrome",
    deviceId: "ricoh-gr-iv",
    status: "prototype",
    settingsLabel: "Ricoh Image Control Settings",
    settings: [
      { label: "Image Control", value: "Positive Film" },
      { label: "Saturation", value: "-1" },
      { label: "Hue", value: "0" },
      { label: "High/Low Key", value: "+1" },
      { label: "Contrast", value: "+1" },
      { label: "Contrast Highlight", value: "-1" },
      { label: "Contrast Shadow", value: "+1" },
      { label: "Sharpness", value: "+1" },
      { label: "Clarity", value: "+1" },
    ],
    bestFor: ["Daylight street", "Travel", "Architecture"],
    lighting: ["Clear daylight", "Bright overcast"],
    notes: [
      "Use highlight protection when working around white buildings and bright skies.",
      "Prototype settings only; not verified camera output.",
    ],
  },
  {
    id: "soft-portra-x100vi",
    lookId: "look-soft-portra",
    deviceId: "fuji-x100vi",
    status: "prototype",
    settingsLabel: "Fujifilm Film Simulation Settings",
    settings: [
      { label: "Film Simulation", value: "Nostalgic Neg." },
      { label: "Dynamic Range", value: "DR400" },
      { label: "White Balance", value: "Auto" },
      { label: "WB Shift", value: "R +2 / B -1" },
      { label: "Highlight", value: "-2" },
      { label: "Shadow", value: "-1" },
      { label: "Color", value: "-1" },
      { label: "Sharpness", value: "-2" },
      { label: "Clarity", value: "-3" },
      { label: "Grain", value: "Weak / Small" },
    ],
    bestFor: ["Portraits", "Cafés", "Everyday life"],
    lighting: ["Window light", "Overcast", "Soft daylight"],
    notes: [
      "Expose carefully for skin and keep mixed green lighting out of the scene when possible.",
      "Prototype settings only; not verified camera output.",
    ],
  },
  {
    id: "neon-rain-griv",
    lookId: "look-neon-rain",
    deviceId: "ricoh-gr-iv",
    status: "prototype",
    settingsLabel: "Ricoh Image Control Settings",
    settings: [
      { label: "Image Control", value: "Negative Film" },
      { label: "Saturation", value: "+1" },
      { label: "Hue", value: "+1" },
      { label: "High/Low Key", value: "-2" },
      { label: "Contrast", value: "+3" },
      { label: "Contrast Highlight", value: "-3" },
      { label: "Contrast Shadow", value: "+2" },
      { label: "Sharpness", value: "0" },
      { label: "Clarity", value: "-1" },
    ],
    bestFor: ["Rain", "Night", "Reflections"],
    lighting: ["Night", "Mixed LED", "Wet streets"],
    notes: [
      "Reflections can clip quickly; underexpose slightly if signage dominates the frame.",
      "Prototype settings only; not verified camera output.",
    ],
  },
  {
    id: "quiet-morning-griv",
    lookId: "look-quiet-morning",
    deviceId: "ricoh-gr-iv",
    status: "prototype",
    settingsLabel: "Ricoh Image Control Settings",
    settings: [
      { label: "Image Control", value: "Custom" },
      { label: "Saturation", value: "-2" },
      { label: "Hue", value: "0" },
      { label: "High/Low Key", value: "+2" },
      { label: "Contrast", value: "-2" },
      { label: "Contrast Highlight", value: "-2" },
      { label: "Contrast Shadow", value: "-1" },
      { label: "Sharpness", value: "-1" },
      { label: "Clarity", value: "-2" },
    ],
    bestFor: ["Overcast streets", "Interiors", "Quiet documentary"],
    lighting: ["Overcast", "Window light", "Soft morning"],
    notes: [
      "This direction is intentionally restrained; let the subject carry the frame.",
      "Prototype settings only; not verified camera output.",
    ],
  },
];

export function getDevice(brandSlug: string, modelSlug: string) {
  return devices.find(
    (device) => device.brandSlug === brandSlug && device.modelSlug === modelSlug,
  );
}

export function getLook(slug: string) {
  return looks.find((look) => look.slug === slug);
}

export function getVariantsForLook(lookId: string) {
  return lookVariants.filter((variant) => variant.lookId === lookId);
}

export function getLooksForDevice(deviceId: string) {
  const lookIds = new Set(
    lookVariants
      .filter((variant) => variant.deviceId === deviceId)
      .map((variant) => variant.lookId),
  );

  return looks.filter((look) => lookIds.has(look.id));
}

export function getVariant(lookId: string, deviceId?: string) {
  const variants = getVariantsForLook(lookId);
  if (!deviceId) return variants[0];
  return variants.find((variant) => variant.deviceId === deviceId) ?? variants[0];
}

export function getDeviceById(deviceId: string) {
  return devices.find((device) => device.id === deviceId);
}
