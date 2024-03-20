/**
 * Converts an array of objects with 'key' and 'value' properties into a key-value object.
 *
 * @param  array - The input array of objects with 'key' and 'value' properties.
 * @returns  - The resulting key-value object.
 */
export const arrayToKvObject = (
  array: { key: string; value: string }[],
): Record<string, string> => {
  return array.reduce<Record<string, string>>((result, item) => {
    result[item.key] = item.value;
    return result;
  }, {});
};
