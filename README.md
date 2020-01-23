ember-splitjs-modifier
==============================================================================

Easily use split.js in Ember projects by using a modifier. ```{{splitjs}}```


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.8 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-splitjs-modifier
```


Usage
------------------------------------------------------------------------------
Horizontal
```
<div class="ember-splitjs-modifier-container">
  <div {{splitjs}}>
    <!-- Left panel content -->
  </div>
  <div {{splitjs}}>
    <!-- Right panel content -->
  </div>
</div>
```

Vertical
```
<div class="ember-splitjs-modifier-container ember-splitjs-modifier-container-vertical">
  <div {{splitjs direction="vertical"}}>
    <!-- Left panel content -->
  </div>
  <div {{splitjs direction="vertical"}}>
    <!-- Right panel content -->
  </div>
</div>
```

Defining an initial percent of available space
```
<div class="ember-splitjs-modifier-container">
  <div {{splitjs initialSize=25}}>
    <!-- Left panel content -->
  </div>
  <div {{splitjs initialSize=75}}>
    <!-- Right panel content -->
  </div>
</div>
```

3 Panels
```
<div class="ember-splitjs-modifier-container">
  <div {{splitjs initialSize=25}}>
    <!-- Left panel content -->
  </div>
  <div {{splitjs initialSize=50}}>
    <!-- Right panel content -->
  </div>
  <div {{splitjs initialSize=25}}>
    <!-- Right panel content -->
  </div>
</div>

Use ember conditionals to hide/show panels
```
<div class="ember-splitjs-modifier-container">
  {{#if this.showLeftPanel}}
    <div {{splitjs}}>
      <!-- Left panel content -->
    </div>
  {{/if}}
  <div {{splitjs initialSize=50}}>
    <!-- Center panel content -->
  </div>
  <div {{splitjs initialSize=50}}>
    <!-- Right panel content -->
  </div>
</div>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
