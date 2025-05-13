/* 
 *  Example Review:
 * {
 *   "id": 0,
 *   "userid": 7,
 *   "businessid": 8,
 *   "dollars": 1,
 *   "stars": 4.5,
 *   "review": "Cheap, delicious food."
 * }
 */

module.exports = (review) => {
    if (review && review.userid && review.businessid && review.dollars &&
        review.stars) {
        return true
    } else {
        return false
    }
}