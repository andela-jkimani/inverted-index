function Index() {
  this.index = {};

  //load the JSON file
  this.loadData = function(filePath) {
    var request = new XMLHttpRequest();
    request.open('GET', filePath, false);
    request.send();
    if (request.status === 200) {
      if (request.responseText.trim().length === 0) {
        throw new Error('the file is empty');
      }

      try {
        return JSON.parse(request.responseText);
      } catch (e) {
        throw new Error('invalid json file');
      }
    } else {
      throw new Error('unable to open file');
    }
  };

  //reading the json file
  this.createIndex = function(books) {
    var uniqueWords = [];
    self = this;

    var booksLength = books.length;

    function filter(content) {
      return content.filter(function(word, key) {
        return content.indexOf(word) === key;
      });
    }

    for (i = 0; i < booksLength; i++) {

      //removing all non-word characters, splitting and concatenating the strings 
      var content = (books[i].title + ' ' + books[i].text)
        .replace(/\W+/g, ' ')
        .toLowerCase()
        .trim()
        .split(' ');

      //getting unique words
      var words = filter(content);

      uniqueWords.push(words);
    }

    var uniqueWordsLength = uniqueWords.length;
    //creating index
    for (i = 0; i < uniqueWordsLength; i++) {
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
        results.push([-1]);
      }
    });

    return results;
  };
}
