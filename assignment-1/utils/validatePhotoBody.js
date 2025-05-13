/* 
 *  Example Photo: 
 * {
 *   "id": 0,
 *   "userid": 7,
 *   "businessid": 8,
 *   "caption": "This is my dinner."
 * }
 */

module.exports = (photo) => {
    if (photo && photo.userid && photo.businessid) {
        return true
    } else {
        return false
    }
}