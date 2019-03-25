//parse a reviewer data from a list of parameters
/*
To use reviewerParser

Create a newuser:
	let user1 = new reviewerObject();

Populate the attributes:
	user1.username = 'kirby';
	user1.city = 'wakanda'

When use learning or creating, pass in the string using user.toJson().
	classifier2.learn(user1.toJson(), 'good');

When checking categorize, set the 4th parameter as true to get the probalbility list
	classifier.categorize(text, 0, 0, true);
	It will return a list like [result, [categoryA, probability], [categoryB, probability]]
	For example, [spam, [spam, 0.57], [non-spam, 0.43]]

*/
/*
module.exports = function () {
  return new reviewerObject()
}
*/
let REVIEWER_STATE_KEYS = [
  'username', 'token_balance', 'level', 'experience', 'city', 'restaurants_advertised', 'peer_review'
];

/**
 * Reviewer object
 */
function reviewerObject () {
	this.username = ''
    this.token_balance = 0
    this.level = 0
    this.experience = 0
    this.city = ''
    this.restaurants_advertised = [];
    this.peer_review = [];
}


/**
 * Dump the classifier's state as a JSON string.
 * @return {String} Representation of the classifier.
 */
reviewerObject.prototype.toJson = function () {
  var state = {}
  var self = this
  REVIEWER_STATE_KEYS.forEach(function (k) {
    state[k] = self[k]
  })

  var jsonStr = JSON.stringify(state)

  return jsonStr
}