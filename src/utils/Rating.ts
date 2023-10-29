/**
 * The RatingEntity type defines the properties for campaign and country ratings.
 * - count: The total number of elements for a campaign.
 * - v6_ready: The number of IPv6 ready elements for a campaign.
 * - sites: The total number of sites for a country.
 * - v6sites: The number of IPv6 ready sites for a country.
 */
type RatingEntity = {
  count?: number;
  v6_ready?: number;
  sites?: number;
  v6sites?: number;
};

/**
 * Calculate the rating and associated color class for a given entity (campaign or country).
 * The function returns an object containing the rating ("Good", "Medium", "Bad", "Unknown")
 * and a color class for visual representation.
 *
 * @param entity - An object containing count, v6_ready, sites, v6sites.
 * @returns { rating: string, colorClass: string } - Object containing rating and its associated color class.
 */
export function calculateRating(entity: RatingEntity) {
  // Get the total number and v6 total number for the entity
  const total = entity.count || entity.sites || 0;
  const v6Total = entity.v6_ready || entity.v6sites || 0;

  // Handle case when total count is zero
  if (total === 0) return { rating: "Unknown", colorClass: "bg-gray-600/10 text-gray-600 ring-gray-600/40" };

  // Calculate the percentage of IPv6 readiness
  const ratingPercentage = (v6Total / total) * 100;

  let rating = "";
  let colorClass = "";

  // Determine the rating and color class based on IPv6 readiness percentage
  if (ratingPercentage >= 60) {
    rating = "Good";
    colorClass = "bg-emerald-600/10 text-emerald-600 ring-emerald-600/40";
  } else if (ratingPercentage >= 40) {
    rating = "Medium";
    colorClass = "bg-amber-600/10 text-amber-600 ring-amber-600/20";
  } else {
    rating = "Bad";
    colorClass = "bg-rose-600/10 text-rose-600/80 ring-rose-600/20";
  }

  return { rating, colorClass };
}
