import React from 'react';
import {FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
//import OrderItem from '../../components/shop/OrderItem';

const OredersScreen = props => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={itemData => (
        <Text>1</Text>
        // <OrderItem
        //   amount={itemData.item.totalAmount}
        //   date={itemData.item.date}
        // />
      )}
    />
  );
};
export const screenOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="bars"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OredersScreen;
