# Flickity sync

Enables `asNavFor` option for [Flickity](http://flickity.metafizzy.co/), where one gallery is navigation or another.

+ Clicking the nav gallery will select the content gallery
+ Selecting the content gallery will sync to the nav gallery

``` html
<div class="gallery gallery-a">
  ...
</div>
<div class="gallery gallery-b">
  ...
</div>
```

``` js
// options
asNavFor: '.gallery-a'
// set as a selector string

asNavFor: document.querySelector('.gallery-a')
// set as an element
```

### jQuery

``` js
$('.gallery-a').flickity();
$('.gallery-b').flickity({
  asNavFor: '.gallery-a'
});
```

### Vanilla JS

``` js
var flktyA = new Flickity('.gallery-a');
var flktyB = new Flickity( '.gallery-b', {
  asNavFor: '.gallery-a'
});
```

### HTML

``` html
<div class="gallery gallery-a js-flickity">
  ...
</div>
<div class="gallery gallery-b js-flickity"
  data-flickity-options='{ "asNavFor": ".gallery-a" }'>
  ...
</div>
```

## Install

`as-nav-for.js` is included with the Flickity `pkgd.js` files. If you are using those, you do not need to install.

Bower: `bower install flickity-as-nav-for --save`

npm: `npm install flickity-as-nav-for`

### RequireJS

``` js
requirejs( [ 'path/to/flickity-as-nav-for/as-nav-for' ], function( Flickity ) {
  var flktyA = new Flickity('.gallery-a');
  var flktyB = new Flickity( '.gallery-b', {
    asNavFor: '.gallery-a'
  });
});
```

### Browserify

``` js
var Flickity = require('flickity-as-nav-for');

var flktyA = new Flickity('.gallery-a');
var flktyB = new Flickity( '.gallery-b', {
  asNavFor: '.gallery-a'
});
```

---

MIT license

By [Metafizzy](http://metafizzy.co)
