module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {unstable_transformProfile: 'hermes-stable'},
    ],
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@/components': './components',
          '@/screens': './screens',
          '@/images': './images',
          '@/shared': './shared',
          '@/assets': './assets',
          '@': '.',
        },
      },
    ],
    'react-native-reanimated/plugin',
    'nativewind/babel',
  ],
};
