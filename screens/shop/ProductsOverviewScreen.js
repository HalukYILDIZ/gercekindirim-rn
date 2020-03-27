import React from 'react';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

export const screenOptions = {
  headerTitle: 'All Products',
  headerRight: () => {
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="rocket"
        iconName="rocket"
        onPress={() => {
          console.log('calış');
        }}
      />
    </HeaderButtons>;
  },
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
  },
  headerTintColor: 'white',
  headerBackTitleStyle: {
    fontFamily: 'OpenSans-Regular',
  },
};
export default ProductsOverviewScreen;
