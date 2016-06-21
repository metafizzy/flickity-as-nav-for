/*jshint browser: true, unused: true, undef: true */
/*globals Flickity, QUnit */

QUnit.test( 'groupCells', function( assert ) {
  'use strict';

  var carousel = document.querySelector('.carousel--group-cells');
  var flkty = new Flickity( carousel );

  var navCarousel = document.querySelector('.carousel--group-cells-nav');
  var navFlkty = new Flickity( navCarousel, {
    groupCells: true,
    asNavFor: '.carousel--group-cells'
  });

  var navCellElems = navCarousel.querySelectorAll('.cell');

  // getting navCompanion is async
  var done = assert.async();

  function checkSelectedClasses( indexes, bool ) {
    indexes.forEach( function( index ) {
      var hasClass = navCellElems[ index ].classList.contains('is-nav-selected');
      var message = 'cell ' + index + ( bool ? 'has' : 'does not have' ) + 'selected class';
      assert.equal( hasClass, bool, message );
    });
  }

  setTimeout( function() {
    checkSelectedClasses( [ 0, 1, 2 ], true );
    // stay in group
    flkty.next();
    assert.equal( navFlkty.selectedIndex, 0, 'still at 0' );
    checkSelectedClasses( [ 0, 1, 2 ], true );
    // new group
    flkty.select( 3 );
    assert.equal( navFlkty.selectedIndex, 1, 'nav at 1' );
    checkSelectedClasses( [ 3, 4, 5 ], true );
    checkSelectedClasses( [ 0, 1, 2 ], false );
    // click
    // fake trigger staticClick event
    navFlkty.staticClick({
      target: navCellElems[7]
    });
    assert.equal( flkty.selectedIndex, 7, 'staticClick selects carousel' );
    assert.equal( navFlkty.selectedIndex, 2, 'staticClick selects nav' );
    // deactivate
    navFlkty.deactivate();
    assert.ok( !navCarousel.querySelector('.is-nav-selected'), 'no is-nav-selected after deactivate' );
    // re-activate
    flkty.select( 4 );
    navFlkty.activate();
    assert.equal( navFlkty.selectedIndex, 1, 'nav carousel reactivated at correct selectedIndex' );
    checkSelectedClasses( [ 3, 4, 5 ], true );

    done();
  });

});
