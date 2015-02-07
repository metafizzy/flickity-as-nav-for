/*jshint browser: true, unused: true */
/*global test: false, ok: false, equal: false, Flickity: false, classie: false */

test( 'asNavFor', function( assert ) {
  'use strict';

  var galleryB = document.querySelector('#gallery-b');
  var flktyB = new Flickity( galleryB, {
    asNavFor: '#gallery-a'
  });
  var bCellElements = galleryB.querySelectorAll('.cell');

  var flktyA = new Flickity('#gallery-a');

  // getting navCompanion is async
  var done = assert.async();

  setTimeout( function() {
    ok( classie.has( bCellElements[0], 'is-nav-selected' ), 'first cell element has nav selected class' );

    flktyA.next();
    equal( flktyB.selectedIndex, 1, 'A.next() syncs to B' );
    ok( classie.has( bCellElements[1], 'is-nav-selected' ), '2nd cell element has nav selected class' );
    ok( !classie.has( bCellElements[0], 'is-nav-selected' ), '1st cell element does not have nav selected class' );
    flktyA.previous();
    equal( flktyB.selectedIndex, 0, 'A.previous() syncs to B' );
    flktyA.select( 3 );
    equal( flktyB.selectedIndex, 3, 'A.select() syncs to B' );
    ok( classie.has( bCellElements[3], 'is-nav-selected' ), 'fourth cell element has nav selected class' );
    ok( !classie.has( bCellElements[0], 'is-nav-selected' ), '1st cell element does not have nav selected class' );
    // click
    // fake trigger staticClick event
    flktyB.staticClick({
      target: bCellElements[2]
    });
    equal( flktyA.selectedIndex, 2, 'B.staticClick selects A' );
    equal( flktyB.selectedIndex, 2, 'B.staticClick selects B' );
    ok( classie.has( bCellElements[2], 'is-nav-selected' ), 'third cell element has nav selected class' );
    ok( !classie.has( bCellElements[0], 'is-nav-selected' ), '1st cell element does not have nav selected class' );

    flktyB.deactivate();
    ok( !galleryB.querySelector('.is-nav-selected'), 'no is-nav-selected after deactivate' );

    flktyB.activate();
    equal( flktyB.selectedIndex, 2, 'B reactivated with selectedIndex' );
    ok( classie.has( bCellElements[2], 'is-nav-selected' ), 'third cell element has nav selected class' );

    done();
  });

});
