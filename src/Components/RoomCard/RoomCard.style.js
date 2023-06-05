import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'white',
    height: Dimensions.get('window').height * 0.25,
    width: Dimensions.get('window').width * 0.45,
    backgroundColor: colors.darkgreen,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
