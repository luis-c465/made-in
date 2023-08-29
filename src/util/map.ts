/**
 * Maps country names to their more common names.
 */
export function mapCountryNames(name: string) {
  switch (name.toLowerCase()) {
    case "america":
      return "United States";
    case "turkiye":
      return "turkey";
    case "unknown":
    case "does not apply":
    case "":
      return null;

    default:
      return name;
  }
}
