// src/iconMap.js

export const getMedicineIcon = (type) => {
  const ICON_MAP = {
    tablet: "pill",
    capsule: "capsule",
    syrup: "bottle-tonic-plus",
    liquid: "cup-water",
    powder: "flask",
    topical: "tube",
    drops: "eyedropper",
    patch: "bandage",
    inhaler: "spray",
    spray: "spray-bottle",
    injection: "needle",
    suppository: "medical-bag",
    other: "medical-bag",
  };

  return ICON_MAP[type?.toLowerCase()] || "medical-bag";
};