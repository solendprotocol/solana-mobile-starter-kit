import colors from '@/colors';
import React, {ReactElement} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import { twMerge } from 'tailwind-merge'

function Input(
  props: TextInputProps,
): ReactElement {

  return (
    <TextInput
    {...props}
    className={twMerge(
      'text-primary font-xl',
      props.className
    )}
    style={{
        fontSize: 16
    }}
    placeholderTextColor={props.placeholderTextColor ?? colors.secondary}
    >
      {props.children as React.ReactNode}
    </TextInput>
  );
}

export default Input;
