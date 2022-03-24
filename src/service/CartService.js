import AsyncStorage from '@react-native-async-storage/async-storage';

const addToCart = async (nameShop, data, quantity) => {
  nameShop = nameShop.replace(/ /g, '');
  data.quantity = quantity;
  let itemArray = await AsyncStorage.getItem(`cart${nameShop}`);
  itemArray = JSON.parse(itemArray);
  if (itemArray) {
    const getIndex = itemArray.findIndex((i) => i._id === data._id);
    if (getIndex != -1) {
      itemArray[getIndex].quantity =
        parseInt(itemArray[getIndex].quantity) + parseInt(quantity);
    } else {
      itemArray.push(data);
    }
    await AsyncStorage.setItem(`cart${nameShop}`, JSON.stringify(itemArray));
  } else {
    let array = [];
    array.push(data);
    try {
      await AsyncStorage.setItem(`cart${nameShop}`, JSON.stringify(array));
    } catch (e) {
      console.log('error');
    }
  }
};
const getCart = async (nameShop) => {
  nameShop = nameShop.replace(/ /g, '');
  let itemArray = await AsyncStorage.getItem(`cart${nameShop}`);
  return JSON.parse(itemArray);
};
const updateQuantityCart = async (nameShop, id, quantity) => {
  nameShop = nameShop.replace(/ /g, '');
  let itemArray = await AsyncStorage.getItem(`cart${nameShop}`);
  itemArray = JSON.parse(itemArray);
  const getIndex = await itemArray.findIndex((i) => i._id === id);
  itemArray[getIndex].quantity =
    parseInt(itemArray[getIndex].quantity) + quantity;
  await AsyncStorage.setItem(`cart${nameShop}`, JSON.stringify(itemArray));
};
const deleteCart = async (nameShop, id) => {
  nameShop = nameShop.replace(/ /g, '');
  let itemArray = await AsyncStorage.getItem(`cart${nameShop}`);
  itemArray = JSON.parse(itemArray);
  const getIndex = await itemArray.findIndex((i) => i.id === id);
  itemArray.splice(getIndex, 1);
  await AsyncStorage.setItem(`cart${nameShop}`, JSON.stringify(itemArray));
};
export { addToCart, getCart, updateQuantityCart, deleteCart };
