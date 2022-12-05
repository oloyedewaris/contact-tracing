import { ScaledSheet } from "react-native-size-matters";
import normalize from "../../helpers/normalizeFont";
import { colors } from '../../utils/constants';

const styles = ScaledSheet.create({
  container: {
    margin: '10@ms',
  },
  inputContainer: {
    justifyContent: 'center',
    paddingHorizontal: '10@ms',
    alignItems: "center",
    borderWidth: '1.5@ms',
    height: '50@ms',
    width: "100%",
    borderRadius: '5@ms',
    fontSize: normalize(20),
  },
  error: {
    color: colors.danger,
    fontSize: normalize(10),
    marginBottom: '1@ms'
  }
})

export default styles