import React, {ReactElement} from 'react';
import {Pressable, PressableProps} from 'react-native';
import {twMerge} from 'tailwind-merge';

function Button(
  props: PressableProps & {
    variant?: 'primary' | 'tag';
    full?: boolean;
    overrideClassName?: string;
  },
): ReactElement {
  let buttonClassName =
    'items-center border border-line bg-primary flex justify-center p-2 my-2';

  if (props.variant === 'tag') {
    buttonClassName =
      'items-center border border-line bg-neutralAlt flex justify-center px-1 py-0.5';
  }

  return (
    <Pressable
      {...props}
      className={twMerge(
        buttonClassName,
        props.full ? 'w-full ' : '',
        props.overrideClassName,
      )}>
      {props.children as React.ReactNode}
    </Pressable>
  );
}

export default Button;
