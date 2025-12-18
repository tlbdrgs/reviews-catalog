/**
 * Maximum length before truncating review text
 */
export const MAX_REVIEW_LENGTH = 200;

/**
 * Material-UI Rating component custom styles
 */
export const RATING_STYLES = {
  "& .MuiRating-iconFilled": {
    color: "#374151", // gray-700
  },
  "& .MuiRating-iconEmpty": {
    color: "#d1d5db", // gray-300
  },
} as const;
