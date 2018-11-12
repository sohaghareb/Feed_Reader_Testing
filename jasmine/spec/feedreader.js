/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function() {
    describe('RSS Feeds', function() {
        // Test if allFeeds is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test if the url of each feed is defined and not empty  
        it('All Feeds have defined URLs', function(){
            allFeeds.forEach(function(feed){
                //check first if the url is defined
                expect(feed.url).toBeDefined();
                // then check if the url is not empty
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Test if the name of each feed is defined and not empty
        it('All Feeds have defined URLs', function(){
            allFeeds.forEach(function(feed){
                //same checking as url 
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu',function(){
        // Test the default visibility of our menu which should be hidden on start of our app
        it('Menu element is hidden by default',function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test the visibility change of the menu. it is initially hidden.
         * After clicking on the menu icon it should be displayed 
         * And after clicking in one of its links it should be hidden again*/
        it('Menu changes visibility correctly',function(){
            //check if the body default is hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
            // click on the menu icon
            $('.menu-icon-link').click();
            //the body should be visible so the menu-hiden class should be removed
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // click again
            $('.menu-icon-link').click();
            //the body should be hidden so it must have menu-hidden class again
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
   
    /* Test the behavior of loadFuntion().
     * when it is called, I shoud have at least one entry with the .feed container */
    describe('Initial Entries',function(){
        beforeEach(function(done){
            /*before checking the new added feeds we need to call loadFeed() 
            and then check after it is done*/
            loadFeed(0,done);
        });

        it('Load feeds correctly',function(){
            //if the feeds are loaded correctly, the .feed .entry should have length > 0
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /*Test that when we call loadFeed that content must change*/
    describe('New Feed Selection',function(){
        //initialize an empty array to store the html result generated after calling the loadFeed
        let myFeeds = [];
        beforeEach(function(done) {
            /* Before excuting our test case call load Feed to make first load
             * then store the feeds html generated after that call at index 0*/
            loadFeed(0, function() {
               /* After loading the feeds for the first time call loadFeed again*/
                myFeeds.push($('.feed').html());
                loadFeed(1, done);
            });
        });

        it('The content actually changes after adding new feed', function() {
            //store the html generated from the 2nd call at index 1 
            myFeeds.push($('.feed').html());
            /* After the 1st call, the content is located at index 0 and content after 2nd call is
             * located at index 1. so if calling loadFeed changes the content, the data at index 0 and index 1
             * should be different */
            expect(myFeeds[0]).not.toEqual(myFeeds[1]);
        });
    });
}());
