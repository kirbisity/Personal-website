var bayes = require('./naive_bayes');
var reviewer = require('./reviewerParser');


console.log('start');

var classifier = bayes('review');
console.log(classifier);

// teach it positive phrases

classifier.learn('This is my favorite Chinese Restaurant in the Capital District.', 'ham')
/*
classifier.learn('Sweet, this is incredibly, amazing, perfect, great!!', 'positive')

// teach it a negative phrase

classifier.learn('terrible, shitty thing. Damn. Sucks!!', 'negative')

// now ask it to categorize a document it has never seen before

let result = classifier.categorize('awesome, cool, amazing!! Yay.')
console.log(result);

result = classifier.categorize('Man, it Sucks.')
console.log(result);
// => 'positive'

// serialize the classifier's state as a JSON string.
var stateJson = classifier.toJson()

//console.log(stateJson); 

// load the classifier back from its JSON representation.
var revivedClassifier = bayes.fromJson(stateJson)
*/


/*
console.log('Reviewer'); 
classifier2 = bayes('Reviewer');
let user1 = reviewer();
user1.username = 'user1';
user1.city = 'wakanda'
console.log(user1.toJson());
classifier2.learn(user1.toJson(), 'good');
console.log(classifier2);
*/