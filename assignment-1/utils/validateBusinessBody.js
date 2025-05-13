/* 
 *  Example Business:
 *  {
 *     "id": 0,
 *     "ownerid": 0,
 *     "name": "Block 15",
 *     "address": "300 SW Jefferson Ave.",
 *     "city": "Corvallis",
 *     "state": "OR",
 *     "zip": "97333",
 *     "phone": "541-758-2077",
 *     "category": "Restaurant",
 *     "subcategory": "Brewpub",
 *     "website": "http://block15.com"
 *  }
 */

module.exports = (business) => {
    if (business && business.name && business.address && business.city &&
        business.state && business.zip && business.phone && business.category &&
        business.subcategory) {
        return true
    } else {
        return false
    }
}