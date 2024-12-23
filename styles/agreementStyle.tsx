import {StyleSheet} from "react-native";

export const childrenStyles = StyleSheet.create({
  agreementContainer: {
    position: 'relative',
    width: '100%',
    padding: 16,
    borderRadius: 20
  },
  agreementInnerContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 30,
  }
})
