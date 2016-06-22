var books,
    myIndex,
    index;

beforeEach(function() {
    myIndex = new Index();
    books = myIndex.loadData("../jasmine/books.json");
    myIndex.createIndex(books);
    index = myIndex.getIndex();
});

describe("File loading test", function() {
    it("should return an array if loaded properly", function() {
        expect(Array.isArray(books)).toBeTruthy();
    });
    it("should check whether file is empty", function() {
        expect(function() {
            myIndex.loadData("../jasmine/empty_file.json");
        }).toThrow(new Error('the file is empty'));
    });
    it('should throw an error when file cannot be opened', function() {
        expect(function() {
            myIndex.loadData('hello.json');
        }).toThrow(new Error('unable to open file'));
    });
});

describe("Read book data", function() {
    it("should check whether array is empty", function() {
        expect(books.length).not.toEqual(0);
    });
    it("should ensure each object contains a string property", function() {
        expect(typeof books[0].title).toBe('string');
        expect(typeof books[0].text).toBe('string');
        expect(typeof books[1].title).toBe('string');
        expect(typeof books[1].text).toBe('string');
    });
});

describe("Populate Index", function() {
    it("should ensure index is created", function() {
        expect(index).toBeDefined();
    });
    it("should ensure index is correct", function() {
        expect(index.alice).toEqual([0, 1]);
        expect(index.a).toEqual([0, 1]);
        expect(index.dwarf).toEqual([1]);
    });
});

describe("Search Index", function() {
    it("should ensure index returns the correct results when searched", function() {
        expect(myIndex.searchIndex(['alice', 'a'])).toEqual([[0, 1], [0, 1]]);
        expect(myIndex.searchIndex('a')).toEqual([[0, 1]]);
        expect(myIndex.searchIndex('dwarf')).toEqual([[1]]);
        expect(myIndex.searchIndex('jacky')).toEqual(["Not found"]);
        // expect(myIndex.searchIndex('alice jacky')).toEqual([0, 1], ["Not found"]);
    });
    it("should ensure searchIndex can handle an array of search terms", function() {
        expect(myIndex.searchIndex(['alice'])).toEqual([[0, 1]]);
        expect(myIndex.searchIndex(['alice', 'jacky'])).toEqual([[0, 1], "Not found"]);
    });
});
