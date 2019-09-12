import React from "react";
import { View } from "react-native";
import { Item, Label, Input } from "native-base";

const StackInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Item stackedLabel style={{ justifyContent: "space-around" }}>
        <Label style={labelStyle}>{label}</Label>
        <Input
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
        />
      </Item>
    </View>
  );
};

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23, //space between lines of text, will make input text stand out more
    flex: 1,
    textAlignVertical: "top",
    textAlign: "left"
  },
  labelStyle: {
    color: "#000",
    fontSize: 18,
    paddingLeft: 5,
    flex: 1 //proportion of amount of space to be filled in parent container
  },
  containerStyle: {
    height: 60,
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  }
};

export { StackInput };
