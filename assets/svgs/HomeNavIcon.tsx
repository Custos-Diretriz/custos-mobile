import * as React from "react";
import Svg, {Defs, LinearGradient, Path, Stop, SvgProps} from "react-native-svg";

export const HomeNavIconGradient = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M8 15C8.85 15.63 9.885 16 11 16C12.115 16 13.15 15.63 14 15"
      stroke="url(#paint0_linear_0_1)"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Path
      d="M20.6362 11.958L20.3572 13.895C19.8702 17.283 19.6262 18.976 18.4512 19.988C17.2762 21 15.5532 21 12.1062 21H9.89416C6.44716 21 4.72416 21 3.54916 19.988C2.37416 18.976 2.13016 17.283 1.64316 13.895L1.36416 11.958C0.984161 9.321 0.794161 8.002 1.33516 6.875C1.87616 5.748 3.02616 5.062 5.32716 3.692L6.71216 2.867C8.80016 1.622 9.84616 1 11.0002 1C12.1542 1 13.1992 1.622 15.2882 2.867L16.6732 3.692C18.9732 5.062 20.1242 5.748 20.6652 6.875"
      stroke="url(#paint1_linear_0_1)"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_0_1"
        x1={8}
        y1={15.5}
        x2={14}
        y2={15.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={"#0094FF"}/>
        <Stop offset={1} stopColor={"#A02294"}/>
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_0_1"
        x1={0.999512}
        y1={11}
        x2={20.6652}
        y2={11}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={"#0094FF"}/>
        <Stop offset={1} stopColor={"#A02294"}/>
      </LinearGradient>
    </Defs>
  </Svg>
)

export const HomeNavIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M8 15C8.85 15.63 9.885 16 11 16C12.115 16 13.15 15.63 14 15"
      stroke="url(#paint0_linear_1735_4324)"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Path
      d="M20.6362 11.958L20.3572 13.895C19.8702 17.283 19.6262 18.976 18.4512 19.988C17.2762 21 15.5532 21 12.1062 21H9.89416C6.44716 21 4.72416 21 3.54916 19.988C2.37416 18.976 2.13016 17.283 1.64316 13.895L1.36416 11.958C0.984161 9.321 0.794161 8.002 1.33516 6.875C1.87616 5.748 3.02616 5.062 5.32716 3.692L6.71216 2.867C8.80016 1.622 9.84616 1 11.0002 1C12.1542 1 13.1992 1.622 15.2882 2.867L16.6732 3.692C18.9732 5.062 20.1242 5.748 20.6652 6.875"
      stroke="url(#paint1_linear_1735_4324)"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1735_4324"
        x1={8}
        y1={15.5}
        x2={14}
        y2={15.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#BEBDBD" />
        <Stop offset={1} stopColor="#858585" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1735_4324"
        x1={0.999512}
        y1={11}
        x2={20.6652}
        y2={11}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#BEBDBD" />
        <Stop offset={1} stopColor="#858585" />
      </LinearGradient>
    </Defs>
  </Svg>
)
