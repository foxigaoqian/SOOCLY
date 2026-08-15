export type Device = {
  id: string;
  brand: string;
  model: string;
  brandSlug: string;
  modelSlug: string;
  shortLabel: string;
  ecosystemTerm: string;
  description: string;
};

export type Setting = {
  label: string;
  value: string;
};

export type Look = {
  id: string;
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  creator: string;
  coverImage: string;
  previewFilter: string;
  tags: string[];
  accent: string;
};

export type LookVariant = {
  id: string;
  lookId: string;
  deviceId: string;
  status: "prototype" | "verified";
  settingsLabel: string;
  settings: Setting[];
  bestFor: string[];
  lighting: string[];
  notes: string[];
};
