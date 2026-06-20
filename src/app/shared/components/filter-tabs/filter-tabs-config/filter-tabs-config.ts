import { FilterTab } from "../models/filter-tabs.model";


export const FILTER_TABS = {
  workoutCategories: [
    { id: 'fullbody', label: 'Full Body' },
    { id: 'chest', label: 'Chest' },
    { id: 'arms', label: 'Arms' },
    { id: 'shoulders', label: 'Shoulders' },
    { id: 'back', label: 'Back' },
    { id: 'legs', label: 'Legs' },
    { id: 'stomach', label: 'Stomach' }
  ] as FilterTab[],

  classLevels: [
    { id: '69d982ed85f6bfa972bf2216', label: 'Beginner' },
    { id: '69d982ed85f6bfa972bf221c', label: 'Intermediate' },
    { id: '69d982ed85f6bfa972bf2222', label: 'Advanced' }
  ] as FilterTab[],

  meals: [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' }
  ] as FilterTab[]
};