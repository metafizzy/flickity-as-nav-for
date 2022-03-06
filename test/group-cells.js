QUnit.test( 'groupCells', function( assert ) {

  let carousel = document.querySelector('.carousel--group-cells');
  let flkty = new Flickity( carousel );

  let navCarousel = document.querySelector('.carousel--group-cells-nav');
  let navFlkty = new Flickity( navCarousel, {
    groupCells: true,
    asNavFor: '.carousel--group-cells',
  } );

  let navCellElems = navCarousel.querySelectorAll('.cell');

  // getting navCompanion is async
  let done = assert.async();

  function checkSelectedClass( index, bool ) {
    let hasClass = navCellElems[ index ].classList.contains('is-nav-selected');
    let message = `cell ${index} ${bool ? 'has' : 'does not have'} selected class`;
    assert.equal( hasClass, bool, message );
  }

  setTimeout( function() {
    checkSelectedClass( 0, true );
    // stay in group
    flkty.next();
    assert.equal( navFlkty.selectedIndex, 0, 'still at 0' );
    checkSelectedClass( 1, true );
    checkSelectedClass( 0, false );
    // new group
    flkty.select( 3 );
    assert.equal( navFlkty.selectedIndex, 1, 'nav at 1' );
    checkSelectedClass( 3, true );
    checkSelectedClass( 1, false );
    // click
    // fake trigger staticClick event
    navFlkty.staticClick({
      target: navCellElems[7],
    });
    assert.equal( flkty.selectedIndex, 7, 'staticClick selects carousel' );
    assert.equal( navFlkty.selectedIndex, 2, 'staticClick selects nav' );
    // deactivate
    navFlkty.deactivate();
    assert.ok( !navCarousel.querySelector('.is-nav-selected'),
        'no is-nav-selected after deactivate' );
    // re-activate
    flkty.select( 4 );
    navFlkty.activate();
    assert.equal( navFlkty.selectedIndex, 1,
        'nav carousel reactivated at correct selectedIndex' );
    checkSelectedClass( 4, true );

    done();
  } );

} );
