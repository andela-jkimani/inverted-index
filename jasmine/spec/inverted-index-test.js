describe('Inverted Index', function() {
  var books,
    index,
    myIndex = new Index();

  beforeAll(function(done) {
    myIndex.loadData('books.json', function(response) {
      books = response;
      myIndex.createIndex(books);
      index = myIndex.getIndex();
      done();
    });
  });

  describe('File loading test', function() {
    it('should return an array if loaded properly', function() {
      expect(Array.isArray(books)).toBeTruthy();
    });
  });

  describe('Read book data', function() {
    it('should check whether array is empty', function() {
      expect(books.length).not.toEqual(0);
    });

    it('should ensure each object contains a string property', function() {
      expect(typeof books[0].title).toBe('string');
      expect(typeof books[0].text).toBe('string');
      expect(typeof books[1].title).toBe('string');
      expect(typeof books[1].text).toBe('string');
    });
  });

  describe('Populate Index', function() {

    it('should ensure index is created', function() {
      expect(index).toBeDefined();
    });

    it('should ensure index is correct', function() {
      expect(index.falls).toEqual([0]);
      expect(index.rabbit).toEqual([0]);
      expect(index.alice).toEqual([0, 1]);
      expect(index.a).toEqual([0, 1]);
      expect(index.dwarf).toEqual([1]);
      expect(index.lord).toEqual([1]);
      expect(index.alliance).toEqual([1]);
    });
  });

  describe('Search Index', function() {
    it("should return an array", function() {
      expect(myIndex.searchIndex('wizard')).toEqual([
        [1]
      ]);

      expect(myIndex.searchIndex('world')).toEqual([
        [0]
      ]);

      expect(myIndex.searchIndex('hello')).toEqual([
        [-1]
      ]);
    });

    it("should ensure index returns the correct results when searched", function() {
      expect(myIndex.searchIndex(['alice', 'a'])).toEqual([
        [0, 1],
        [0, 1]
      ]);

      expect(myIndex.searchIndex('a')).toEqual([
        [0, 1]
      ]);

      expect(myIndex.searchIndex('jacky')).toEqual([
        [-1]
      ]);
      expect(myIndex.searchIndex('man')).toEqual([
        [1]
      ]);

      expect(myIndex.searchIndex('fellowship')).toEqual([
        [1]
      ]);

      expect(myIndex.searchIndex('Hole')).toEqual([
        [0]
      ]);
    });

    it("should ensure searchIndex can handle an array of search terms", function() {
      expect(myIndex.searchIndex(['alice'])).toEqual([
        [0, 1]
      ]);

      expect(myIndex.searchIndex(['alice', 'jacky'])).toEqual([
        [0, 1],
        [-1]
      ]);
    });
  });
});
