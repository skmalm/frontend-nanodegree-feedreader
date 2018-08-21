/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  describe('RSS Feeds', function() {
    /* This test makes sure that the allFeeds variable has been defined
     * and that it is not empty.
     */
    it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
     it('have defined URLs', function() {
       allFeeds.forEach(function(feed) {
         expect(feed.url).toBeDefined();
         expect(feed.url.length).not.toBe(0);
       });
     });

    /* This test loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
     it('have defined names', function() {
       allFeeds.forEach(function(feed) {
         expect(feed.name).toBeDefined();
         expect(feed.name.length).not.toBe(0);
       });
     });
  });

  describe('The menu', function() {
    /* This test ensures the menu element is
     * hidden by default.
     */
     it('is hidden by default', function() {
       expect($('body').hasClass('menu-hidden')).toBe(true);
     });

     /* This test ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * has two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
      it('visibility toggles when clicked', function() {
        // click the menu icon to show the menu
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        // click the menu icon once more to hide the menu
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
  });

  describe('Initial Entries', function() {
    /* This test suite ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
     beforeEach(function(done) {
       loadFeed(0, function() {
         done();
       });
     });

     it('should have at least one article', function(done) {
       expect($('.feed .entry').length).not.toBe(0);
       done();
     });
   });

  describe('New Feed Selection', function() {
    /* This test suite ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * To do this, it loads feed 0, saves the first article title,
     * then loads feed 1 and saves that feeds first article title.
     * It then compares the titles to ensure that they don't match.
     */
    let firstArticleTitle;
    let secondArticleTitle;
    beforeEach(function(done) {
      loadFeed(0, function() {
        firstArticleTitle = $('.entry').first()[0].innerText;
        console.log(firstArticleTitle);
      });
      loadFeed(1, function() {
        secondArticleTitle = $('.entry').first()[0].innerText;
        console.log(secondArticleTitle);
        done();
      })
    });

     it('should change the displayed entry list', function(done) {
       expect(firstArticleTitle === secondArticleTitle).toBe(false);
       done();
     });
  });
}());
