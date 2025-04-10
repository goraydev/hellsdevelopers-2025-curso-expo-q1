import { ImageStyle, Image as RNImage } from "expo-image";
import { StyleProp, ViewStyle } from "react-native";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type Props = {
  source: string | undefined;
  style?: StyleProp<ImageStyle>;
};
export default function Image({ source, style }: Props) {
  return (
    <RNImage
      style={style}
      source={source}
      placeholder={{ blurhash }}
      contentFit="contain"
      transition={100}
    />
  );
}
