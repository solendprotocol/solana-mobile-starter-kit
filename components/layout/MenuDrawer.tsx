import React from 'react';
import Typography from '@/components/shared/Typography';
import {FlatList, Pressable} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { twMerge } from 'tailwind-merge';

export default function MenuDrawer({navigation, state}: DrawerContentComponentProps) {
  return (
      <FlatList
        className="w-full border-t border-line"
        data={state.routeNames}
        renderItem={demo => (
          <Pressable
            key={demo.item}
            onPress={() => {
              navigation.navigate(demo.item);
              navigation.closeDrawer();
            }}
            className={twMerge("flex border-b border-line p-4 w-full", state.index === demo.index ? 'bg-neutralAlt' : undefined)}>
            <Typography level='title'>
              {demo.item}
            </Typography>
          </Pressable>
        )}
      />
  );
}
