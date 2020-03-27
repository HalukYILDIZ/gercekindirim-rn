import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
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
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

export const screenOptions = {
  headerTitle: 'All Products',
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
