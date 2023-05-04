import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  inputContainer: {
    height: 320,
    marginVertical: 16,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },

  cameraButton: {
    position: 'absolute',
    bottom: 10,
    right: 16,
  },
  cameraError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  cameraErrorText: {
    color: "rgb(65, 72, 77)",
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  cameraPauseText: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
  },
  exampleImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  progress: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  inputButton: {
    marginBottom: 10,
  },
});