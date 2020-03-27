import React from 'react';
import {ScrollView, View, Image, Button, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
  const productId = props.route.params.productId;
  const productTitle = props.route.params.productTitle;
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(item => item.id === productId),
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <View style={styles.button}>
        <Button color={Colors.primary} title="Add To Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  button: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
    fontFamily: 'OpenSans-Bold',
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    marginHorizontal: 20,
    fontFamily: 'OpenSans-Regular',
  },
});

export const screenOptionsD = navData => {
  return {headerTitle: navData.route.params.productTitle};
};

export default ProductDetailScreen;
