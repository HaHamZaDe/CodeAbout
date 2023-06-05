import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.lightblue,
    flex: 1,
  },
  header_container: {
    borderWidth: 5,
    borderColor: colors.darkgreen,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 3,
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
    right: 10,
  },
});
