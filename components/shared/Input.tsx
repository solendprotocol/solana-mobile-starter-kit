import colors from '@/colors';
import React, {ReactElement} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import { twMerge } from 'tailwind-merge'

function Input(
  props: TextInputProps & {
    innerClassName?: string,
  } ,
): ReactElement {

  return (
    <TextInput
    {...props}
    className={twMerge(
      'text-primary font-xl p-1 bg-neutralAlt',
      props.innerClassName,
    )}
    style={{
        fontSize: 16,
        ...props.style as {},
    }}
    placeholderTextColor={props.placeholderTextColor ?? colors.secondary}
    >
      {props.children as React.ReactNode}
    </TextInput>
  );
}

export default Input;
