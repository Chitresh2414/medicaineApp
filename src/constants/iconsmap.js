export const getMedicineIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'tablet': return 'pill';
    case 'capsule': return 'pill-multiple';
    case 'syrup': return 'bottle-tonic-plus';
    case 'liquid': return 'cup-water';
    case 'powder': return 'blur';
    case 'topical': return 'lotion-outline';
    case 'drops': return 'water-outline';
    case 'patch': return 'sticker-outline';
    case 'inhaler': return 'air-filter';
    case 'spray': return 'spray';
    case 'injection': return 'needle';
    case 'suppository': return 'medical-bag';
    case 'other': return 'plus-circle-outline';
    default: return 'medication';
  }
};