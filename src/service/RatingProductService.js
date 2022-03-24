import CallAPI from './CallApiService';

const GetRatingProductAsyn = (id) => {
  return CallAPI(`ratingproduct/${id}`);
};
const RatingProductAsyn = (data) => {
  return CallAPI('ratingproduct', 'post', data);
};
export { RatingProductAsyn, GetRatingProductAsyn };
