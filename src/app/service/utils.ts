/**
 * Remove space between words and formats an input name into camelCase for input ID.
 *
 * @param inputName - The input name to be formatted.
 * @returns formatted inputId in camelCase format.
 */
export function formatInputId(inputName: string): string {
  const words = inputName.trim().split(/\s+/);

  // Convert the first word to lowercase and the rest to camlCase
  const formattedWords = [
    words[0].toLowerCase(),
    ...words.slice(1).map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
  ];

  return formattedWords.join('') + "-input";
}

