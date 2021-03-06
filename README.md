# inverted-index

The inverted index is a structure used to perform the elasticsearch on a document to allow for fast searches. It contains the list of all unique words that appear on a document.

------------------------------------------------------

## Steps to using the inverted index
1. Clone the repo by running the command `git clone git@github.com:andela-jkimani/inverted-index.git`
2. Install http-server by running the command `npm install -g http-server`
3. Run tests by using the following steps:
	* cd into the folder `inverted-index`
	* Run the command `http-server` to start the server.
	* Open chrome and go to the URL `http://localhost:8080/jasmine/SpecRunner.html`

-------------------------------------------------------

## Index functions

### loadData(filePath)
Takes in the file path as its parameters and returns a JSON array

### createIndex(books)
Takes in the JSON array as the argument and creates its inverted index

### getIndex()
Returns the inverted index when called and takes in no parameters

### searchIndex(terms)
Takes in one or more words (string or array) and returns their indexes after searching the index