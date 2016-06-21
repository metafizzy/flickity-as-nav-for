/*jshint browser: true, unused: true, undef: true */
/*globals Flickity, QUnit */

QUnit.test( 'asNavFor', function( assert ) {
  'use strict';

  var carouselB = document.querySelector('#carousel-b');
  var flktyB = new Flickity( carouselB, {
    asNavFor: '#carousel-a'
  });
  var bCellElements = carouselB.querySelectorAll('.cell');

  var flktyA = new Flickity('#carousel-a');

  // getting navCompanion is async
  var done = assert.async();

  function containsNavSelectedClass( index ) {
    return bCellElements[ index ].classList.contains('is-nav-selected');
  }

  setTimeout( function() {
    assert.ok( containsNavSelectedClass(0), 'first cell element has nav selected class' );

    flktyA.next();
    assert.equal( flktyB.selectedIndex, 1, 'A.next() syncs to B' );
    assert.ok( containsNavSelectedClass(1), '2nd cell element has nav selected class' );
    assert.ok( !containsNavSelectedClass(0), '1st cell element does not have nav selected class' );
    flktyA.previous();
    assert.equal( flktyB.selectedIndex, 0, 'A.previous() syncs to B' );
    flktyA.select( 3 );
    assert.equal( flktyB.selectedIndex, 3, 'A.select() syncs to B' );
    assert.ok( containsNavSelectedClass(3), 'fourth cell element has nav selected class' );
    assert.ok( !containsNavSelectedClass(0), '1st cell element does not have nav selected class' );
    // click
    // fake trigger staticClick event
    flktyB.staticClick({
      target: bCellElements[2]
    });
    assert.equal( flktyA.selectedIndex, 2, 'B.staticClick selects A' );
    assert.equal( flktyB.selectedIndex, 2, 'B.staticClick selects B' );
    assert.ok( containsNavSelectedClass(2), 'third cell element has nav selected class' );
    assert.ok( !containsNavSelectedClass(3), '4th cell element does not have nav selected class' );

    flktyB.deactivate();
    assert.ok( !carouselB.querySelector('.is-nav-selected'), 'no is-nav-selected after deactivate' );

    flktyB.activate();
    assert.equal( flktyB.selectedIndex, 2, 'B reactivated with selectedIndex' );
    assert.ok( containsNavSelectedClass(2), 'third cell element has nav selected class' );

    done();
  });

});
