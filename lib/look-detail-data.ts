import type { Look, LookVariant } from "@/lib/types";

export type LookVisualReference = {
  src: string;
  alt: string;
  label: string;
  aspect: "landscape" | "portrait" | "square";
};

export type LookShootingGuide = {
  exposureAdvice: string;
  sceneSuggestions: string[];
  colorNotes: string;
  avoid: string;
};

const taglines: Record<string, string> = {
  "tokyo-midnight": "Cool streets. Warm light. After dark.",
  "golden-sunday": "Warm skin. Soft sun. Slow afternoons.",
  "summer-chrome": "Clear color. Bright days. Clean edges.",
  "soft-portra": "Muted color. Gentle skin. Everyday light.",
  "neon-rain": "Wet streets. Electric color. Dense nights.",
  "quiet-morning": "Open shadows. Soft light. Slow frames.",
};

const visualReferences: Record<string, LookVisualReference[]> = {
  "tokyo-midnight": [
    {
      src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=88",
      alt: "Prototype visual reference of a dense neon city street at night",
      label: "Neon density",
      aspect: "landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=86",
      alt: "Prototype visual reference of an illuminated urban street after dark",
      label: "Mixed light",
      aspect: "portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=86",
      alt: "Prototype visual reference of a city scene with deep evening color",
      label: "Deep city color",
      aspect: "square",
    },
    {
      src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1500&q=86",
      alt: "Prototype visual reference of a blue-hour city skyline",
      label: "Blue hour",
      aspect: "landscape",
    },
  ],
};

const shootingGuides: Record<string, LookShootingGuide> = {
  "tokyo-midnight-x100vi": {
    exposureAdvice:
      "Start around -1/3 to -2/3 EV when bright signs dominate the frame. Protect illuminated lettering and let the street stay naturally dark instead of lifting every shadow.",
    sceneSuggestions: [
      "Wet pavement and reflected signage",
      "Train entrances and convenience stores",
      "Narrow streets with mixed LED light",
      "People framed against warm practical lights",
    ],
    colorNotes:
      "Neutral clothing, black surfaces, red signage, cyan LEDs, and warm tungsten points give the palette room to separate. Let one or two strong colors lead the frame.",
    avoid:
      "Flat midday light, aggressively lifted shadows, and scenes dominated by green fluorescent spill. The Look works best when darkness is allowed to remain part of the photograph.",
  },
  "tokyo-midnight-griv": {
    exposureAdvice:
      "Keep exposure compensation within easy reach and bias slightly dark around bright storefronts. Watch clipped reds and blues in electronic signs before worrying about shadow detail.",
    sceneSuggestions: [
      "Fast street snapshots after blue hour",
      "Reflections in windows and pavement",
      "Compact storefronts with mixed color",
      "Passing figures under practical light",
    ],
    colorNotes:
      "The direction benefits from simple frames with a few saturated light sources. Strong reds, deep blues, and warm interior light work better than a scene filled with every color at once.",
    avoid:
      "Over-bright files, heavy green casts, and featureless black subjects with no edge light. Keep enough local light in the scene to define shape.",
  },
};

export function getLookTagline(look: Look) {
  return taglines[look.slug] ?? look.kicker;
}

export function getLookVisualReferences(look: Look): LookVisualReference[] {
  return (
    visualReferences[look.slug] ?? [
      {
        src: look.coverImage,
        alt: `Prototype visual reference for ${look.name}`,
        label: "Visual direction",
        aspect: "landscape",
      },
    ]
  );
}

export function getLookShootingGuide(variant: LookVariant): LookShootingGuide {
  return (
    shootingGuides[variant.id] ?? {
      exposureAdvice:
        variant.notes[0] ?? "Protect the part of the frame that carries the visual idea and adjust exposure deliberately for the scene.",
      sceneSuggestions: variant.bestFor,
      colorNotes:
        "Use the Look as a visual direction rather than a correction preset. Pay attention to the dominant colors already present in the scene.",
      avoid:
        variant.notes[1] ?? "Avoid forcing the Look into lighting conditions that fight its intended palette.",
    }
  );
}
