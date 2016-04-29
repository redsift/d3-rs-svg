# D3-RS-SVG

By cutting it in code, we can make the frame theme dynamic and do things like animate the resize of the window.

This also serves as a minimal reusable component demonstrating the reference reusable chart model we use at Redsift.

Our ovjective was to use a modern approach that relied on a minimum number of external libraries (in this instance, that translates to D3) and uses language features to achieve encapsulation. As a result of this, we have esentially adopted the [vanilla reusable chart convention](https://bost.ocks.org/mike/chart/).

## Objective


## Usage


## Making it: Data Driven


## Making it: Selectable


## Making it: Composable


## Making it: Re-entrant

One side effect of this is that it makes each layer clearly selectable in the DOM which provides an easy way to apply CSS customization to each layer.

## Making it: Animate

Note that accidental tweeing of values can cause surprsing results.

## Full Pattern


## Packaging

The components include any style elements required to present a default rendering without having to rely on additional supplied CSS. While this may seem a retrograde step, this is to ensure the component function without having to address and bundle additional CSS. Customisation can be achieved by exposing the parameters associated with presentaiton and/or overiding the style in project CSS using the `class` to address instances of the component in the DOM. To ensure this works as expected, avoid specifying inline styles, use the SVG presentation attribute instead.

## Design for customization

This can lead to a huge list of calls on the object. Instead, use CSS to allow customisation using the default presentation attributes to provide a baseline presentation. Note that D3 can no longer interpolate these via a transition and they can't be easily data driver so provide calls to set or customize parameters that:

- Are dependend on the data
- Affect layout
- Should be transitioned by D3

Other attributes should have sensible defaults and customised by application specific CSS.

Referencing the [SVG specification](http://www.w3.org/TR/SVG/styling.html), 

Inline Style > CSS > Presentation Attribute

Effectively

`<rect style="fill:green">` > `rect { fill:green; }` > `<rect fill="green">`

To ensure the project CSS can override the built in style, avoid inline styles.

## Performance Tuning

Render time scales approximately linearly with the number of elements,
remove groups from common items.

In chrome, Timeline > Frames.

Use a custom namespace in the DOM and render to canvas.

## Referencing defs

If the `defs` are constant, a simple one time creation and set will suffice.

Else, you need to tie up the def with an id that is relevant for the run.