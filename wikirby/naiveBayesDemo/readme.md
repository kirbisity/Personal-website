# What does each file do

naive_bayes.js is the file to be included, it contains all functions used in naive bayes part.
A demo is also avalible in index.html. It will run a sample training and testing.

# How functions are called

Train

parameter  String  text (review text) 

parameter  String  catagory or tag (spam or not spam)

	classifier.learn(text, category);

Categorize

	result = classifier.categorize(text);

ToJSON

return String Representation of the classifier.

	stateJson = classifier.toJson();

FromJSON

parameter  String Representation of the classifier obtained by ToJSON 

return NaiveBayes Classifier

	classifier = classifier.fromJson(jsonstr);