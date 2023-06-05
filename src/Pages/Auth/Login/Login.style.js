import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: '#64b5f6',
    flex: 1,
  },

  header: {
    fontSize: 100,
    fontWeight: 'bold',
    color: colors.darkgreen,
    textAlign: 'center',
    margin: 5,
  },
});
