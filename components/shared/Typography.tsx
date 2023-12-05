import React, {ReactElement} from 'react';
import {Text, TextStyle} from 'react-native';
import colors from '@/colors';

export type TypographyPropsType = {
  textClassName?: string;
  level?:
    | 'display'
    | 'title'
    | 'headline'
    | 'body'
    | 'bodyMono'
    | 'label'
    | 'caption'
    | 'captionMono'
    | 'disclosure';
  color?:
    | 'primary'
    | 'secondary'
    | 'line'
    | 'neutralAlt'
    | 'neutral'
    | 'overlay'
    | 'secondary'
    | 'brand'
    | 'brandAlt';
  children?: React.ReactNode;
  style?: TextStyle;
  onPress?: () => void;
  onLongPress?: () => void;
};

Typography.defaultProps = {
  textClassName: '',
  level: 'body',
  color: 'primary',
  children: null,
  style: undefined,
  onPress: undefined,
  onLongPress: undefined,
};

function Typography({
  level = 'body',
  color = 'primary',
  textClassName = '',
  children,
  style,
  onPress,
  onLongPress,
}: TypographyPropsType): ReactElement {
  const fontStyleMap: {[key: string]: TextStyle} = {
    display: {
      fontWeight: '300',
      fontSize: 36,
      color: colors[color],
    },
    title: {
      fontWeight: '600',
      fontSize: 16,
      color: colors[color],
    },
    headline: {
      fontWeight: '600',
      fontSize: 13,
      lineHeight: 20,
      color: colors[color],
    },
    body: {
      fontWeight: '400',
      fontSize: 13,
      lineHeight: 20,
      color: colors[color],
    },
    bodyMono: {
      fontWeight: '400',
      fontFamily: 'monospace',
      fontSize: 13,
      color: colors[color],
    },
    label: {
      fontWeight: '600',
      fontSize: 11,
      color: colors[color],
    },
    caption: {
      fontWeight: '400',
      fontSize: 11,
      lineHeight: 16,
      color: colors[color],
    },
    captionMono: {
      fontWeight: '400',
      fontFamily: 'monospace',
      fontSize: 10,
      color: colors[color],
    },
    disclosure: {
      fontWeight: '400',
      fontSize: 9,
      color: colors[color],
    },
  };

  const fontStyle = fontStyleMap[level];
  return (
    <Text
      onPress={onPress}
      onLongPress={onLongPress}
      className={textClassName}
      style={{
        ...fontStyle,
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default Typography;
