import CallAPI from './CallApiService';

const GetRatingProductAsyn = (id) => {
  return CallAPI(`ratingproduct/${id}`);
};
const RatingProductAsyn = (data, product_id) => {
  return CallAPI(`ratingproduct/${product_id}`, 'post', data);
};
export { RatingProductAsyn, GetRatingProductAsyn };
