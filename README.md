# disabled-in-progress

Disables a button and shows a spinner icon when the `bp-disabled-in-progress` attribute value is true.

Uses [Font Awesome](https://fontawesome.com/icons) to display the "in progress" spinner icon.

If a font-awesome icon element exists inside the button, it will add/modify ng-class to swap the existing icon class with a spinner when `bp-disabled-in-progress` attribute value is true, otherwise it will prepend an icon element as needed.

Note: this will add/modify ng-disabled on the affected element.

## Installation

```
bower install disabled-in-progress --save
```

## Adding dependency to your project

```
angular.module('myModule', ['bp.disabled-in-progress']);
```

## Usage

```
<button bp-disabled-in-progress="booleanValue">
  <i class="fa fa-icontype"></i> <!-- optional -->
  ...
</button>
```

## License

Licensed under MIT
