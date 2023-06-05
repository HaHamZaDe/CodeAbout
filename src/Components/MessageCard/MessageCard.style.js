import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.darkgreen,
    flex: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  inner_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  user: {
    color: colors.lightblue,
    fontStyle: 'italic',
  },
  date: {
    flex: 1,
    textAlign: 'right',
    fontStyle: 'italic',
    color: colors.lightblue,
  },
  title: {
    color: 'white',
    flex: 1,
  },
  dislike_count_container: {
    backgroundColor: colors.darkgreen,
    padding: 3,

    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  dislike_container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  dislike_text: {
    color: colors.darkgreen,
    fontWeight: 'bold',
  },
  dislike_count_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'flex-end',
  },
});
