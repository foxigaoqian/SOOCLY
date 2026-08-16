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
  "tokyo-midnight": "Cool streets. Warm practicals. After dark.",
  "golden-sunday": "Warm skin. Low sun. Easy afternoons.",
  "summer-chrome": "Clean whites. Bright skies. Graphic color.",
  "soft-portra": "Muted color. Gentle skin. Quiet light.",
  "neon-rain": "Wet streets. Electric color. Dense reflections.",
  "quiet-morning": "Open shadows. Soft weather. Slow frames.",
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
  "golden-sunday": [
    {
      src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1800&q=88",
      alt: "Prototype visual reference of warm late-afternoon landscape light",
      label: "Low sun",
      aspect: "landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1761735490109-a271e498a9a3?auto=format&fit=crop&w=1200&q=86",
      alt: "Prototype visual reference of a person at an outdoor cafe in golden-hour light",
      label: "Warm skin",
      aspect: "portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1753791271869-b7c8e5736edd?auto=format&fit=crop&w=1400&q=86",
      alt: "Prototype visual reference of outdoor dining in warm sunset light",
      label: "Travel warmth",
      aspect: "square",
    },
    {
      src: "https://images.unsplash.com/photo-1529397938791-2aba4681454f?auto=format&fit=crop&w=1600&q=86",
      alt: "Prototype visual reference of a traveler walking through golden-hour light",
      label: "Backlit travel",
      aspect: "landscape",
    },
  ],
  "summer-chrome": [
    {
      src: "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1800&q=88",
      alt: "Prototype visual reference of clear bright daylight color",
      label: "Clean daylight",
      aspect: "landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1784146928491-7fa9feee2919?auto=format&fit=crop&w=1200&q=86",
      alt: "Prototype visual reference of strong architectural shadows beneath a clear blue sky",
      label: "Hard shadows",
      aspect: "portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1617761141732-d481912af1a9?auto=format&fit=crop&w=1400&q=86",
      alt: "Prototype visual reference of white and blue architecture in hard daylight",
      label: "Clean whites",
      aspect: "square",
    },
    {
      src: "https://images.unsplash.com/photo-1742268350534-d453e71222cf?auto=format&fit=crop&w=1600&q=86",
      alt: "Prototype visual reference of a sunlit Tokyo street with graphic shadow separation",
      label: "Street contrast",
      aspect: "landscape",
    },
  ],
  "soft-portra": [
    {
      src: "https://images.unsplash.com/photo-1772442165250-740cdb079ead?auto=format&fit=crop&w=1200&q=86",
      alt: "Prototype visual reference of a person drinking coffee in soft window light",
      label: "Window skin",
      aspect: "portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1768324264011-38dba2673558?auto=format&fit=crop&w=1200&q=86",
      alt: "Prototype visual reference of a quiet cafe portrait beside a window",
      label: "Cafe light",
      aspect: "portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1652538551315-5c82465d76e7?auto=format&fit=crop&w=1400&q=86",
      alt: "Prototype visual reference of a person standing in soft window light",
      label: "Soft interior",
      aspect: "square",
    },
    {
      src: "https://images.unsplash.com/photo-1749813449141-eb6ea7ff3ff9?auto=format&fit=crop&w=1400&q=86",
      alt: "Prototype visual reference of people seen through a cafe window in gentle natural light",
      label: "Everyday portrait",
      aspect: "landscape",
    },
  ],
  "neon-rain": [
    {
      src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1800&q=88",
      alt: "Prototype visual reference of a rain-darkened city street at night",
      label: "Rainy city",
      aspect: "landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1760016249191-d8b4c276ece6?auto=format&fit=crop&w=1200&q=86",
      alt: "Prototype visual reference of neon light reflected through wet pavement texture",
      label: "Wet reflections",
      aspect: "portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1749019569092-1e7804cc245b?auto=format&fit=crop&w=1200&q=86",
      alt: "Prototype visual reference of a person with an umbrella under rainy neon light",
      label: "Umbrella color",
      aspect: "portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1775315811739-92a7ab929356?auto=format&fit=crop&w=1600&q=86",
      alt: "Prototype visual reference of a wet city crossing reflecting signs and traffic light",
      label: "Pavement glow",
      aspect: "landscape",
    },
  ],
  "quiet-morning": [
    {
      src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=88",
      alt: "Prototype visual reference of a quiet everyday scene in soft morning conditions",
      label: "Soft morning",
      aspect: "landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1754143825673-7f99a01e0f28?auto=format&fit=crop&w=1600&q=86",
      alt: "Prototype visual reference of a quiet Kyoto street under an overcast sky",
      label: "Overcast street",
      aspect: "landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1773509087261-84b017e6e86a?auto=format&fit=crop&w=1600&q=86",
      alt: "Prototype visual reference of people walking through a quiet suburban street under soft weather",
      label: "Daily life",
      aspect: "landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1758781219759-ffb08e1713b8?auto=format&fit=crop&w=1400&q=86",
      alt: "Prototype visual reference of a still room with dim early-morning window light",
      label: "Interior stillness",
      aspect: "square",
    },
  ],
};

const shootingGuides: Record<string, LookShootingGuide> = {
  "tokyo-midnight-x100vi": {
    exposureAdvice:
      "Start around -1/3 to -2/3 EV when bright signs dominate the frame. Protect illuminated lettering and let the street stay naturally dark. If you keep DR400 selected, remember the X100VI makes it available from ISO 500 upward.",
    sceneSuggestions: [
      "Convenience stores against a darker street",
      "Subway exits with warm practical light",
      "Narrow alleys with two or three competing light sources",
      "Passing figures rim-lit by storefronts",
    ],
    colorNotes:
      "Let cool ambient light and warmer storefront light share the frame. Reds, cyan-blue LEDs, black surfaces, and neutral clothing give the palette enough separation without needing every sign to be saturated.",
    avoid:
      "Heavy rain-reflection scenes belong more naturally to Neon Rain. Also avoid flat midday light, aggressively lifted shadows, and frames dominated by green fluorescent spill.",
  },
  "tokyo-midnight-griv": {
    exposureAdvice:
      "Keep exposure compensation within easy reach and bias slightly dark around bright storefronts. Watch clipped reds and blues in electronic signs before worrying about shadow detail; the GR IV is being used here as a fast mixed-light street camera.",
    sceneSuggestions: [
      "Fast snapshots outside late-night shops",
      "Station entrances with mixed cool and warm light",
      "Passing figures under practical light",
      "Simple street frames with one dominant sign",
    ],
    colorNotes:
      "The direction works best when one or two saturated sources lead the frame. Pair deep blues or cyan ambient light with warm interiors instead of filling the image with every available color.",
    avoid:
      "Wet-pavement reflection studies are the territory of Neon Rain. Avoid over-bright files, featureless black subjects with no edge light, and broad green casts that flatten the color separation.",
  },
  "golden-sunday-x100vi": {
    exposureAdvice:
      "Expose for faces and the bright edge of the sun rather than for deep background shadows. A small negative correction can help protect warm highlights in backlight. With DR200 selected, the X100VI makes that setting available from ISO 250 upward.",
    sceneSuggestions: [
      "Backlit portraits in the final hour of daylight",
      "Travel details catching low side light",
      "Outdoor cafés with warm reflected sun",
      "Buildings and foliage with long late-day shadows",
    ],
    colorNotes:
      "Look for naturally amber light, warm skin, cream surfaces, faded blue, and sunlit greens. The warmth should come from the scene first; the recipe is meant to organize it, not manufacture sunset indoors.",
    avoid:
      "Cool fluorescent interiors, deep blue-hour scenes, and neutral midday light with no warm source. If the scene itself is cold, forcing Golden Sunday onto it usually turns skin and whites muddy rather than luminous.",
  },
  "summer-chrome-x100vi": {
    exposureAdvice:
      "Keep bright walls and clouds just below clipping and let the shadows stay crisp enough to describe shape. This Look likes clean high-key areas more than rescued highlights. With DR200 selected, the X100VI requires ISO 250 or higher for that dynamic-range mode.",
    sceneSuggestions: [
      "White architecture against blue sky",
      "Hard-sun travel streets",
      "Graphic signs, awnings, and painted walls",
      "Open landscapes with clean blue and green separation",
    ],
    colorNotes:
      "Build frames around clean whites, restrained greens, sky blue, concrete, and one stronger accent color. The goal is crisp separation and a slightly graphic feel rather than vintage warmth.",
    avoid:
      "Murky tungsten interiors, heavy haze, and scenes where every surface is already warm. Summer Chrome works best when daylight gives whites and blues a clear reference point.",
  },
  "summer-chrome-griv": {
    exposureAdvice:
      "Use highlight-weighted metering or a small negative correction when white buildings and bright skies dominate. Keep the file clean rather than opening every dark area; the graphic shape of the scene matters more than maximum shadow recovery.",
    sceneSuggestions: [
      "Bright city blocks with hard-edged shadows",
      "Travel architecture and painted facades",
      "Minimal street frames under high sun",
      "Blue-sky scenes with a single saturated accent",
    ],
    colorNotes:
      "Positive Film is being used here as the starting point for firm daylight color, then restrained so the frame stays graphic rather than postcard-saturated. Prioritize blue, green, white, stone, and primary-color details.",
    avoid:
      "Low warm interior light, rainy night scenes, and milky overcast with no color separation. Quiet Morning is the better direction when the weather turns soft and low-contrast.",
  },
  "soft-portra-x100vi": {
    exposureAdvice:
      "Expose for skin and pale surfaces, usually close to neutral rather than deliberately dark. Preserve highlight texture in cheeks, curtains, and tabletops. With DR400 selected, the X100VI requires ISO 500 or higher for that dynamic-range setting.",
    sceneSuggestions: [
      "Portraits beside a large window",
      "Cafés with soft indirect daylight",
      "People in open shade",
      "Everyday interiors on an overcast day",
    ],
    colorNotes:
      "Muted reds, cream, wood, faded green, denim blue, and natural skin tones suit the direction. Keep the palette quiet and let gentle tonal transitions do more work than saturation.",
    avoid:
      "Direct golden-hour sun when you want Golden Sunday, strong green fluorescent spill, and scenes built around hard blue skies or punchy primary colors. This Look depends on soft light more than on added warmth.",
  },
  "neon-rain-griv": {
    exposureAdvice:
      "Start slightly under when wet pavement and signage are both bright. Reflections can double the visual weight of a light source, so protect the sign first and let darker asphalt stay dark instead of trying to normalize the whole frame.",
    sceneSuggestions: [
      "Wet crosswalks reflecting LED signs",
      "Umbrellas passing through colored light",
      "Puddles beneath convenience stores and stations",
      "Headlights and signage layered across glossy pavement",
    ],
    colorNotes:
      "This Look wants reflected cyan, magenta, red, and electric blue against deep neutral pavement. The reflection is part of the subject, not just background texture, so compose around where color repeats on the ground.",
    avoid:
      "Dry streets with weak reflections, broad evenly lit scenes, and daylight rain with no artificial color. For a general mixed-light night street without wet surfaces, Tokyo Midnight is the cleaner fit.",
  },
  "quiet-morning-griv": {
    exposureAdvice:
      "Keep exposure open enough that pale walls, mist, and dark clothing remain separated, but do not push the file so bright that the quiet tonal hierarchy disappears. Soft weather should still feel soft, not washed out.",
    sceneSuggestions: [
      "Overcast residential streets",
      "Window-lit rooms before direct sun arrives",
      "Quiet cafés and transit interiors",
      "Documentary frames with fog, pale walls, or muted clothing",
    ],
    colorNotes:
      "Look for stone, soft green, grey-blue, cream, weathered wood, and low-saturation clothing. A narrow palette helps the open shadows feel intentional rather than simply flat.",
    avoid:
      "Hard noon sun, saturated signage, golden backlight, and scenes that rely on punchy contrast. Summer Chrome is the better daylight choice when edges and color separation are the point.",
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
