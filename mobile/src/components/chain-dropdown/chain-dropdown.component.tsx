import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Chain } from 'wagmi';
import { Icon } from '../icon/icon.component';
import { useTheme } from '../../hook/theme.hook';
import { AppTheme } from '../../theme/theme';

interface ChainDropdownProps {
  chainList: Chain[];
  value: Chain;
  onChangeChain: (chain: Chain) => void;
}

interface RenderItemProps {
  item: Chain;
}

export const ChainDrodown = ({ chainList, value, onChangeChain }: ChainDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const theme = useTheme();
  const styles = initStyles(theme);

  const toggleModalVisible = () => setIsOpen(!isOpen);

  const onPressItem = (chain: Chain) => {
    onChangeChain(chain);
    toggleModalVisible();
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return (
        <TouchableOpacity style={styles.modalItemContainer} onPress={() => onPressItem(item)}>
          <Image />
          <Text style={styles.modalItemText}>{item.name}</Text>
        </TouchableOpacity>
      );
    },
    [onPressItem]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModalVisible} style={styles.dropdown}>
        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
          {value.name}
        </Text>
        {isOpen ? (
          <Icon name="chevron-up-dark" disable />
        ) : (
          <Icon name="chevron-down-dark" disable />
        )}
      </TouchableOpacity>
      {isOpen ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          onRequestClose={toggleModalVisible}
        >
          <TouchableOpacity onPress={toggleModalVisible} style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalView}>
                <Text style={styles.title}>Chọn 1 token</Text>
                <FlatList data={chainList} renderItem={renderItem} style={styles.flatList} />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      ) : (
        <></>
      )}
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.radiusS,
      borderColor: theme.primaryColor,
      borderWidth: 1,
      paddingHorizontal: theme.spaceS,
      paddingVertical: theme.spaceS,
      justifyContent: 'space-between',
    },
    container: {
      flex: 1,
    },
    text: {
      color: theme.textColor,
      marginRight: theme.spaceS,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: '85%',
      backgroundColor: theme.backgroundColor,
      borderRadius: theme.radiusMS,
      margin: theme.spaceML,
      paddingHorizontal: theme.spaceS,
      paddingVertical: theme.spaceM,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalItemContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      paddingVertical: theme.spaceS,
      paddingHorizontal: theme.spaceMS,
    },
    modalItemText: {
      fontWeight: '600',
      color: theme.textColor,
    },
    title: {
      color: theme.textColor,
      fontWeight: '700',
      marginBottom: theme.spaceM,
    },
    flatList: {
      width: '100%',
    },
  });
};
