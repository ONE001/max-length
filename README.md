max-length
==========

This is a simple javascript plugin which was made on native javascript.

You don't need any dependencies.

## Usage

1 - include on your page
``` html
<script src="max-length.js" type="text/javascript"></script>
```

2 - use it with inputs and textarea nodes in your code, for instance:

``` js
// only one input
document.querySelector("input").maxLengthInput();
document.querySelector("input").maxLengthInput({ threshold : 20 });

// only one input
maxLengthInput(document.querySelector("input"));
maxLengthInput(document.querySelector("input"), { threshold : 20, asc : false });

// for all inputs
document.querySelectorAll("input").maxLengthInput();
document.querySelectorAll("input").maxLengthInput({ threshold : 20, interrupt_after_threshold : false });
```

## Plugin setup

1 - threshold for values:

``` js
document.querySelector("input").maxLengthInput({ threshold : 20 }); // 10 by default
```

2 - css class when value will over threshold:

``` js
document.querySelector("input").maxLengthInput({ limit_class : "max-length-exceeded" });
```

3 - interrupt when value will over threshold:

``` js
document.querySelector("input").maxLengthInput({ interrupt_after_threshold : false }); // by default true
```

4 - ascending or descending

``` js
document.querySelector("input").maxLengthInput({ asc : false }); // by default true
```

## Screenshot

![View](https://raw.github.com/ONE001/max-length/master/screenshots/%D1%81%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA27.png "view")
