/*jshint browser: true, unused: true, undef: true */
/*globals Flickity, QUnit */

QUnit.test( 'groupCells main', function( assert ) {
  'use strict';

  var carousel = document.querySelector('.carousel--group-main');
  var flkty = new Flickity( carousel, {
    groupCells: true,
  });

  var navCarousel = document.querySelector('.carousel--group-main-nav');
  var navFlkty = new Flickity( navCarousel, {
    asNavFor: '.carousel--group-main',
  });

  var navCellElems = navCarousel.querySelectorAll('.cell');

  // getting navCompanion is async
  var done = assert.async();

  function checkSelectedClass( index, bool ) {
    var hasClass = navCellElems[ index ].classList.contains('is-nav-selected');
    var message = 'cell ' + index + ( bool ? ' has ' : ' does not have ' ) + 'selected class';
    assert.equal( hasClass, bool, message );
  }

  function checkSelectedClasses( indexes, bool ) {
    indexes.forEach( function( index ) {
      checkSelectedClass( index, bool );
    });
  }

  setTimeout( function() {
    assert.equal( navFlkty.selectedIndex, 1, 'init nav at 1' );
    checkSelectedClasses( [ 0, 1, 2 ], true );
    // new group
    flkty.next();
    assert.equal( navFlkty.selectedIndex, 4, 'nav at 4, main at 3' );
    checkSelectedClasses( [ 3, 4, 5 ], true );
    checkSelectedClasses( [ 0, 1, 2 ], false );
    // click
    // fake trigger staticClick event
    navFlkty.staticClick({
      target: navCellElems[2]
    });
    assert.equal( flkty.selectedIndex, 0, 'staticClick selects carousel' );
    assert.equal( navFlkty.selectedIndex, 1, 'staticClick selects nav, center cell' );
    // deactivate
    navFlkty.deactivate();
    assert.ok( !navCarousel.querySelector('.is-nav-selected'), 'no is-nav-selected after deactivate' );
    // re-activate
    flkty.select( 2 );
    navFlkty.activate();
    assert.equal( navFlkty.selectedIndex, 6, 'nav carousel reactivated at correct selectedIndex' );
    checkSelectedClasses( [ 6, 7 ], true );

    done();
  });

});
