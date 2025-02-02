export function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const AVATAR_STYLES = [
  "pixel-art",
  "bottts",
  "avataaars",
  "identicon",
  "personas",
  "miniavs",
  "lorelei",
] as const;

export const generateAvatarUrl = (address: string) => {
  const styleIndex = parseInt(address.slice(-2), 16) % AVATAR_STYLES.length;
  const style = AVATAR_STYLES[styleIndex];
  return `https://api.dicebear.com/7.x/${style}/png?seed=${address}`;
};
