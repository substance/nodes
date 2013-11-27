var _ = require('underscore');
var Node = require('substance-document').Node;

// Citation
// -----------------
//

var Citation = function(node) {
  Node.call(this, node);
};

// Type definition
// -----------------
//

Citation.type = {
  "id": "article_citation", // type name
  "parent": "content",
  "properties": {
    "source_id": "string",
    "title": "string",
    "label": "string",
    "authors": ["array", "string"],
    "doi": "string",
    "source": "string",
    "volume": "string",
    "publisher_name": "string",
    "publisher_location": "string",
    "fpage": "string",
    "lpage": "string",
    "year": "string",
    "citation_urls": ["array", "string"]
  }
};

Citation.description = {
  "name": "Citation",
  "remarks": [
    "A journal citation.",
    "This element can be used to describe all kinds of citations."
  ],
  "properties": {
    "title": "The article's title",
    "label": "Optional label (could be a number for instance)",
    "doi": "DOI reference",
    "source": "Usually the journal name",
    "volume": "Issue number",
    "publisher_name": "Publisher Name",
    "publisher_location": "Publisher Location",
    "fpage": "First page",
    "lpage": "Last page",
    "year": "The year of publication",
    "citation_urls": "A list of links for accessing the article on the web"
  }
};

// Example Citation
// -----------------
//

Citation.example = {
  "id": "article_nature08160",
  "type": "article_citation",
  "label": "5",
  "title": "The genome of the blood fluke Schistosoma mansoni",
  "authors": [
    "M Berriman",
    "BJ Haas",
    "PT LoVerde"
  ],
  "doi": "http://dx.doi.org/10.1038/nature08160",
  "source": "Nature",
  "volume": "460",
  "fpage": "352",
  "lpage": "8",
  "year": "1984",
  "citation_urls": [
    "http://www.ncbi.nlm.nih.gov/pubmed/19606141"
  ]
};


Citation.Prototype = function() {
  // Returns the citation URLs if available
  // Falls back to the DOI url
  // Always returns an array;
  this.urls = function() {
    return this.properties.citation_urls.length > 0 ? this.properties.citation_urls
                                                    : [this.properties.doi];
  };
};

Citation.Prototype.prototype = Node.prototype;
Citation.prototype = new Citation.Prototype();
Citation.prototype.constructor = Citation;

// Generate getters
// --------

var getters = {
  header: {
    get: function() {
      return this.properties.title;
    }
  }
};

_.each(Citation.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    }
  };
});

Object.defineProperties(Citation.prototype, getters);

module.exports = Citation;
