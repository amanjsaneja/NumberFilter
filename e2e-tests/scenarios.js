'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Testing Filter For Different Countries', function() {

  beforeEach(module("mApp"));
  var filter;
  beforeEach(inject(function($filter){
    filter = $filter("phoneNumber");
  }));

  it('Number 123456 in US style formatting', function() {
    expect(filter("123456","US")).toBe("123-456");
  });

  it('Number 123456789 in US style formatting', function() {
    expect(filter("123456789","US")).toBe("123-456-789");
  });

  it('Number 12345678 in Hong Kong style formatting', function() {
    expect(filter("12345678","Hong Kong")).toBe("1234-5678");
  });

  it('Number 1234 in Hong Kong style formatting', function() {
    expect(filter("1234","Hong Kong")).toBe("1234");
  });

  it('Number 1234567890 (exceeding the length 8 ) in Hong Kong style formatting', function() {
    expect(filter("1234567890","Hong Kong")).toBe("1234-5678");
  });

  it('Number 1234567 in Iceland style formatting', function() {
    expect(filter("1234567","Iceland")).toBe("123 4567");
  });

  it('Number 1234 in Iceland style formatting', function() {
    expect(filter("1234","Iceland")).toBe("123 4");
  });

  it('Number 1234567890 (exceeding the length 7 ) in Iceland style formatting', function() {
    expect(filter("1234567890","Iceland")).toBe("123 4567");
  });

  it('Number 1234567 in France style formatting', function() {
    expect(filter("1234567","France")).toBe("1 23 45 67");
  });


  it('Number 1234 in France style formatting', function() {
    expect(filter("1234","France")).toBe("1 23 4");
  });

  it('Number 1234567890 (exceeding the length 9 ) in Iceland style formatting', function() {
    expect(filter("1234567890","France")).toBe("1 23 45 67 89");
  });


  it('Number 1234567 in India style formatting', function() {
    expect(filter("1234567","India")).toBe("12345-67");
  });


  it('Number 1234 in India style formatting', function() {
    expect(filter("1234","India")).toBe("1234");
  });

  it('Number 123456789012 (exceeding the length 10 ) in India style formatting', function() {
    expect(filter("123456789012","India")).toBe("12345-67890");
  });

  it('Number 1234567 in Default style formatting', function() {
    expect(filter("1234567","Other")).toBe("123-456-7");
  });


  it('Number 1234 in Default style formatting', function() {
    expect(filter("1234","Other")).toBe("123-4");
  });

  it('Number 123456789012 (exceeding the length 10 ) in Default style formatting', function() {
    expect(filter("123456789012","Other")).toBe("123-456-7890");
  });


});
