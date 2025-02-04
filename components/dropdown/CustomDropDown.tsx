import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

interface DropdownProps {
    items: { label: string; value: string }[];
    onSelect: (value: string) => void;
    placeholder?: string;
    gradientColors?: string[]; // New prop for customizable gradient colors
}

const GradientDropdown: React.FC<DropdownProps> = ({
    items,
    onSelect,
    placeholder = "Select an option",
    gradientColors = ["#19B1D2", "#0094FF"]
}) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBorder}
            >
                <TouchableOpacity
                    style={styles.innerContainer}
                    onPress={() => setIsOpen(!isOpen)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.selectedText}>
                        {selectedValue ? items.find(item => item.value === selectedValue)?.label : placeholder}
                    </Text>
                    <FontAwesome5 name={isOpen ? "chevron-up" : "chevron-down"} size={14} color={"#EAFBFF"} />
                </TouchableOpacity>
            </LinearGradient>

            {isOpen && (
                <View style={styles.dropdownList}>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => handleSelect(item.value)}
                            >
                                <Text style={styles.dropdownItemText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default GradientDropdown;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 10,
    },
    gradientBorder: {
        borderRadius: 10,
        padding: 2,
    },
    innerContainer: {
        backgroundColor: "#09131A",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    selectedText: {
        color: "#FFF",
        fontSize: 12,
    },
    dropdownList: {
        backgroundColor: "#09131A",
        borderRadius: 8,
        marginTop: 4,
        padding: 8,
        maxHeight: 150,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#555",
    },
    dropdownItemText: {
        color: "#FFF",
        fontSize: 12,
    },
});
