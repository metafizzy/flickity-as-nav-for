# Flickity asNavFor

Enables `asNavFor` option for [Flickity](https://flickity.metafizzy.co/), where one gallery is navigation or another.

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

## Install

Add `as-nav-for.js` to your scripts, after including Flickity.

### Download

+ [as-nav-for.js](https://unpkg.com/flickity-as-nav-for@2/as-nav-for.js)

### CDN

``` html
<script src="https://unpkg.com/flickity-as-nav-for@2/as-nav-for.js"></script>
```

### Package managers

npm: `npm install flickity-as-nav-for`

Yarn: `yarn add flickity-as-nav-for`

## Usage

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

Bower: `bower install flickity-as-nav-for --save`

npm: `npm install flickity-as-nav-for`

### Webpack

``` js
const Flickity = require('flickity');
require('flickity-as-nav-for');

var flktyA = new Flickity('.gallery-a');
var flktyB = new Flickity( '.gallery-b', {
  asNavFor: '.gallery-a'
});
```

---

MIT license

By [Metafizzy](https://metafizzy.co)
