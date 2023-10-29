/**
 * Format a given datetime string or Date object into a human-readable string.
 * The formatted string will be in the "en-GB" locale, combining the date and time.
 *
 * Example:
 * Input: 2022-01-01T12:30:45Z
 * Output: 1 January 2022 12:30
 *
 * @param datetime - The Date object or a datetime string to format.
 * @returns {string} - Formatted datetime string.
 */
export function formatDateTime(datetime: Date | string): string {
  // Create a Date object from the input datetime
  const date = new Date(datetime);

  // Format the time part to "HH:MM" using the "en-GB" locale
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timePart = timeFormatter.format(date);

  // Format the date part to "DD Month YYYY" using the "en-GB" locale
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const datePart = dateFormatter.format(date);

  // Combine the formatted date and time parts, separated by a space
  return `${datePart} ${timePart}`;
}
