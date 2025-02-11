import React from "react";
import { View, Text, Image } from "react-native";

import { Screen } from "@/components/Screen";
import { MainImage } from "@/components/MainImage";
import { Properties } from "@/components/Properties";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../_layout";

export default function Vegeta() {
  const { vegetaId } = useRoute<RouteProp<RootStackParams, "vegeta">>().params;
  return (
    <Screen title={`Vegeta ${vegetaId}`}>
      <MainImage uri="https://dragonball-api.com/characters/vegeta_normal.webp" />
      <Properties
        name="Vegeta"
        description="Príncipe de los Saiyans, inicialmente un villano, pero luego se une a los Z Fighters. A pesar de que a inicios de Dragon Ball Z, Vegeta cumple un papel antagónico, poco después decide rebelarse ante el Imperio de Freeza, volviéndose un aliado clave para los Guerreros Z. Con el paso del tiempo llegaría a cambiar su manera de ser, optando por permanecer y vivir en la Tierra para luchar a su lado contra las inminentes adversidades que superar. Junto con Piccolo, él es de los antiguos enemigos de Goku que ha evolucionando al pasar de ser un villano y antihéroe, a finalmente un héroe a lo largo del transcurso de la historia, convirtiéndose así en el deuteragonista de la serie."
        ki="54.000.000"
        maxKi="19.84 Septillion"
        race="Saiyan"
        gender="Male"
      />
    </Screen>
  );
}
