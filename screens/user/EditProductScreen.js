import React, {useEffect, useCallback, useReducer} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
//import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = props => {
  const prodId = props.route.params ? props.route.params.productId : null;

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input', 'Please Check the errors in the form.', [
        {text: 'okay'},
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
        ),
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
        ),
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    //text otomatik bind olduğu için extradan yollamadık
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            autoCapitalize="sentences"
            returnKeyType="next"
            on
            onChangeText={text => textChangeHandler('title', text)}
          />
          {!formState.inputValidities.title && (
            <Text>Please enter valid Title!</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={text => textChangeHandler('imageUrl', text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              keyboardType="decimal-pad"
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={text => textChangeHandler('price', text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={text => textChangeHandler('description', text)}
          />
        </View>
      </View>
    </ScrollView>
    // <KeyboardAvoidingView
    //   style={{flex: 1}}
    //   behavior="padding"
    //   keyboardVerticalOffset={100}>
    //   <ScrollView>
    //     <View style={styles.form}>
    //       <Input
    //         id="title"
    //         label="Title"
    //         errorText="Please enter a valid title!"
    //         keyboardType="default"
    //         autoCapitalize="sentences"
    //         autoCorrect
    //         returnKeyType="next"
    //         onInputChange={inputChangeHandler}
    //         initialValue={editedProduct ? editedProduct.title : ''}
    //         initiallyValid={!!editedProduct}
    //         required
    //       />
    //       <Input
    //         id="imageUrl"
    //         label="Image Url"
    //         errorText="Please enter a valid image url!"
    //         keyboardType="default"
    //         returnKeyType="next"
    //         onInputChange={inputChangeHandler}
    //         initialValue={editedProduct ? editedProduct.imageUrl : ''}
    //         initiallyValid={!!editedProduct}
    //         required
    //       />
    //       {editedProduct ? null : (
    //         <Input
    //           id="price"
    //           label="Price"
    //           errorText="Please enter a valid price!"
    //           keyboardType="decimal-pad"
    //           returnKeyType="next"
    //           onInputChange={inputChangeHandler}
    //           required
    //           min={0.1}
    //         />
    //       )}
    //       <Input
    //         id="description"
    //         label="Description"
    //         errorText="Please enter a valid description!"
    //         keyboardType="default"
    //         autoCapitalize="sentences"
    //         autoCorrect
    //         multiline
    //         numberOfLines={3}
    //         onInputChange={inputChangeHandler}
    //         initialValue={editedProduct ? editedProduct.description : ''}
    //         initiallyValid={!!editedProduct}
    //         required
    //         minLength={5}
    //       />
    //     </View>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  const submitfn = navData.route.params ? routeParams.submit : {};
  return {
    headerTitle: routeParams.productId ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Add" iconName={'save'} onPress={submitfn} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {fontFamily: 'OpenSans-Bold', marginVertical: 8},
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },

  // centered: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

export default EditProductScreen;
