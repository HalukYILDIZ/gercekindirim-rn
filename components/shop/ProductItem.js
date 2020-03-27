import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp onPress={props.onViewDetail}>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props.image}} />
        </View>
        <View style={styles.buttomTextContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        {/*toFixed noktadan sonra iki hane olmasını sağlıyor */}
        <View style={styles.button}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={props.onViewDetail}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={props.onAddToCart}
          />
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  product: {
    margin: 15,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: 'white',
    height: 300,
  },
  buttomTextContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
  },
  image: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: 'OpenSans-Bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'OpenSans-Regular',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 25,
  },
});

export default ProductItem;
