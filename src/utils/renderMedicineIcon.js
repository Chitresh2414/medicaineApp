import React from 'react';
import * as CustomIcons from '../icons';

/**
 * Mapping of medicine types to their respective components.
 * This makes it easy to add new icons in one place.
 */
const ICON_MAP = {
  Capsule: CustomIcons.CapsuleIcon,
  Tablet: CustomIcons.TabletIcon,
  Drop: CustomIcons.DropsIcon,
  Syrup: CustomIcons.SyrupIcon, // Example of adding new ones easily
};

/**
 * Renders the corresponding Icon Component for the provided medicine type.
 * @param {String} medicineType - Type of Medicine
 * @returns {JSX.Element} - Icon Component or empty fragment if not found
 */
export const renderMedicineIcon = (medicineType) => {
  const IconComponent = ICON_MAP[medicineType];

  // Return the component if found, otherwise return an empty fragment
  return IconComponent ? <IconComponent /> : <></>;
};