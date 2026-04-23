// src/iconMap.js

export const getMedicineIcon = (type) => {
  const ICON_MAP = {
    tablet: "pill",
    capsule: "pill-outline",
    syrup: "cup",
    liquid: "cup-water",
    powder: "flask",
    topical: "tube",
    drops: "eye-dropper",
    patch: "bandage",
    inhaler: "spray",
    spray: "spray-bottle",
    injection: "needle",
    suppository: "medical-bag",
    other: "pill",
  };

  return ICON_MAP[type] || "pill";
};