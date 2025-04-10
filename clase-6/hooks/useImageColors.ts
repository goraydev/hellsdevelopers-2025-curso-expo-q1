import { getColors } from "react-native-image-colors";

export const getColorFromImage = async (url: string) => {
  const fallBackColor = "#228B22";

  if (!url) return fallBackColor;

  try {
    const encodeUrl = encodeURI(url);
    const colors = await getColors(encodeUrl, {
      fallback: fallBackColor,
      cache: true,
      key: url,
    });

    switch (colors.platform) {
      case "android":
        return colors.average ?? fallBackColor;
      case "ios":
        return colors.background ?? fallBackColor;
      default:
        return fallBackColor;
    }
  } catch (error) {
    console.error(error);
  }
};
