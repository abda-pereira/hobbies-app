import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3f51b5',
    secondary: '#ff9100',
    text: '#2c387e',
    error: '#b22a00'
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerUserImage: {
    position: 'relative',
    flex: 1,
    top: -45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DefaultTheme.colors.surface,
    width: 100,
    height: 100,
    borderRadius: 100,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    elevation: 2,
    zIndex: 2
  },
  userImage: {
    width: 50,
    height: 50,
    margin: 25,
  },
  userImageSelected: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  containerDiv: {
    width: '100%',
    borderWidth: 1,
    borderColor: "#2c387e",
    borderRadius: 10,
    marginTop: 30,
  },
  titleDiv: {
    flexDirection: 'row',
    color: '#2c387e',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 20
  },
  p20: {
    padding: 20
  },
  pv10: {
    paddingVertical: 10
  },
  hobby: {
    container: {
      alignItems: "center",
      flexGrow: 1,
      flexBasis: 0,
      margin: 4,
      padding: 20
    },
    div: {
      backgroundColor: '#8561c5',
      width: 40,
      height: 40,
      padding: 10,
      borderRadius: 50,
      zIndex: 2,
      position: 'relative'
    },
    img: {
      width: 20,
      height: 20
    },
    check: {
      div: {
        backgroundColor: '#ff9100',
        width: 20,
        height: 20,
        padding: 5,
        borderRadius: 50,
        zIndex: 2,
        top: -35,
        right: -15
      },
      img: {
        width: 10,
        height: 10
      }
    }
  },

}
