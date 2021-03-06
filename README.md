# snippet
[![Bower](https://img.shields.io/bower/v/snippet.svg)](https://github.com/jamiehenson/snippet)
[![NPM](https://img.shields.io/npm/v/snippet-box.svg)](https://github.com/jamiehenson/snippet)

An easy way to glam up your truncated comments/reviews/whatever!

For a nice interactive demo, visit: http://jh47.com/snippet/

### Installation
```
bower install snippet
```

```
npm install snippet-box
```

Alternatively, download the latest release from here, and include snippet.css and snippet.js from /dist in an appropriate place within your project.

### Usage

It's very easy to set up one of these boxes. Just include snippet.css (or the supplied SASS version) and snippet.js (or the CoffeeScript version) in your page, and then use the following markup:

```
<div class="snippet-box">
  <div class="snippet-content" style="max-height: CUSTOM-BOX-HEIGHT-VALUE">
    CONTENT GOES HERE
  </div>
  <div class="snippet-expander"></div>
</div>
```
  
Append whatever styling classes and data attributes you like to the *snippet-expander* element. Additionally, you can always style the key divs however you like with your own CSS. More information on the provided stuff below:

### Classes
#### Styles
- snippet-pulldown
- snippet-reveal
- snippet-shutter-vertical
- snippet-shutter-horizontal
- snippet-inline
- snippet-inline-animated

#### Data Attributes
- data-expand - _(the text used for the "more" button, defaults to "more")_
- data-collapse - _(the text used for the "less" button, defaults to "less")_
- data-length - _(the number of characters to shorten to in inline mode, defaults to 50)_
- data-speed - _(the speed of animation in animated inline mode, defaults to 20 words per frame)_

#### Sizes
- snippet-xs
- snippet-sm
- snippet-md
- snippet-lg

#### Colours
- snippet-text
- snippet-default
- snippet-primary
- snippet-success
- snippet-warning
- snippet-danger

#### Alignment
- snippet-left
- snippet-center
- snippet-right
- snippet-full

#### Tint
- snippet-tint-dark
- snippet-tint-light
- snippet-tint-solid

### Dependencies
Snippet needs jQuery to run. Bower will pull down at least version 2.2.1, but this version isn't a hard requirement.

### Feedback
This is quite a young project so any contributions or bits of feedback are certainly welcome!
