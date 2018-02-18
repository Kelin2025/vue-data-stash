# vue-data-stash

Save component data for rainy day

## What?

This small mixin allows you to define _stashable_ data in your components i.e. data that will be saved until next time when component will be used.

## Why?

I'm bored to write `localStorage.setItem` for every time I need to save some data.

## When to use?

See [this](https://medium.com/@kelin2025/components-stash-f2e14603a874)

## Install

Install via NPM:

```
npm install vue-data-stash
```

Add it globally:

```javascript
import VueDataStash from 'vue-data-stash'

Vue.use(VueDataStash)
```

Or in a single component:

```javascript
import { mixin } from 'vue-data-stash'

export default {
  mixins: [mixin]
}
```

## Usage

Just add `stash` property like it's just `data`:

```javascript
export default {
  name: 'MyComponent',
  stash: () => ({
    activeId: true
  })
}
```

> **NOTE**: Name for localStorage is based on the `name` option
