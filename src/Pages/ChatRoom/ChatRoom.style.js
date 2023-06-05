import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightblue,
  },
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.darkgreen,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  header_title: {
    color: colors.lightblue,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  header_icon: {
    position: 'absolute',
    left: 10,
  },
});
