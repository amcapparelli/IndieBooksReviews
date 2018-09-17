import 'styles/main.scss';
import queryString from 'query-string';

const query = queryString.parse(window.location.search);
const reviewId = query && query.id;

console.log(reviewId)