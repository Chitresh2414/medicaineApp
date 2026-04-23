// src/constants/index.js
export const MEDICINE_TYPES = [
  // Oral (Most Common)
  { label: 'Tablet', value: 'tablet' },
  { label: 'Capsule', value: 'capsule' },
  { label: 'Syrup', value: 'syrup' },
  { label: 'Liquid / Suspension', value: 'liquid' },
  { label: 'Powder', value: 'powder' },
  
  // Topical & External
  { label: 'Ointment / Cream', value: 'topical' },
  { label: 'Drops (Eye/Ear)', value: 'drops' },
  { label: 'Patch (Transdermal)', value: 'patch' },
  
  // Respiratory
  { label: 'Inhaler', value: 'inhaler' },
  { label: 'Nasal Spray', value: 'spray' },
  
  // Clinical / Internal
  { label: 'Injection', value: 'injection' },
  { label: 'Suppository', value: 'suppository' },
  
  // Fallback
  { label: 'Other', value: 'other' },
];

export const MEDICINE_DAYS = [
  { title: 'Monday', value: 'Mon' },
  { title: 'Tuesday', value: 'Tue' },
  { title: 'Wednesday', value: 'Wed' },
  { title: 'Thursday', value: 'Thu' },
  { title: 'Friday', value: 'Fri' },
  { title: 'Saturday', value: 'Sat' },
  { title: 'Sunday', value: 'Sun' },
];