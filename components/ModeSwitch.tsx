import React from 'react';
import { Switch, Text, View } from 'react-native';

interface ModeSwitchProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ModeSwitch: React.FC<ModeSwitchProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Text style={{ marginRight: 10 }}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
      />
    </View>
  );
};

export default ModeSwitch;
