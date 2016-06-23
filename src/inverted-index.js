function Index() {
  this.index = {};

  //load the JSON file
  this.loadData = function(filePath) {
    var request = new XMLHttpRequest();
    request.open('GET', filePath, false);
    request.send(null);
    if (request.status === 200) {
      if (request.responseText.trim().length === 0) {
        throw new Error('the file is empty');
      }

      try {
        return JSON.parse(request.responseText);
      } catch (e) {
        throw new Error('invalid json file');
      }
    }

    throw new Error('unable to open file');
  };

  //reading the json file
  this.createIndex = function(books) {
    var uniqueWords = [];
    self = this;

    //removing punctuation marks, splitting and concatenating the strings 
    for (i = 0; i < books.length; i++) {
      var content = (books[i].title + ' ' + books[i].text)
        .replace(/\W+/g, ' ')
        .toLowerCase()
        .trim()
        .split(' ');

      //getting unique words
      var words = content.filter(function(word, key) {
        return content.indexOf(word) == key;
      });
      uniqueWords.push(words);
    }

    //creating index
    for (i = 0; i < uniqueWords.length; i++) {
      for (var j = 0; j < uniqueWords[i].length; j++) {
        if (!(uniqueWords[i][j] in self.index)) {
          self.index[uniqueWords[i][j]] = [i];
        } else {
          self.index[uniqueWords[i][j]].push(i);
        }

      }
    }
  };

  //getting the index
  this.getIndex = function() {
    return self.index;
  };

  //searching for specific terms
  this.searchIndex = function(terms) {
    var self = this,
      results = [];

    if (!Array.isArray(terms)) {
      terms = terms
        .toLowerCase()
        .replace(/[,]/g, '')
        .split(' ');
    }

    terms.forEach(function(word) {
      if (self.index.hasOwnProperty(word)) {
        results.push(self.index[word]);
      } else {
        results.push('Not found');
      }
    });

    return results;
  };
}
