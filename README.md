## JS object schema coercion & type casting 

I have made this npm package to coerce/type cast values comes from URI query.
Compatible with IE11+.

## Install

```bash
yarn add @shlima/schema
```

## Example

```js
import Schema from "@shlima/schema"

const schema = new Schema({
  filter: {
    user_ids: {
      // array of numbers
      type: [Number]
    },
    
    status: {
      type: String,
      default: 'all'
    },
    
    active: {
      type: Boolean,
      default: false
    },
    
    users: {
      type: [function(val) { return val }]
    },
    
    some: {
      long: {
        nested: {
          param: {
            type: String
          }
        }
      }
    },
    
    person: {
      documents: [
        new Schema({
          id: {
            type: Number
          }
        })
      ]
    }
  }
})

schema.coerce({ user_ids: [1, 2, ''] }) 
// => { user_ids: [1, 2] }

schema.coerce({ status: '' }) 
// => { status: 'all' }

schema.coerce({ active: 'true' }) 
// => { active: 'true' }

schema.coerce({ some: { long: { nested: { param: 4 } } } }) 
// => { some: { long: { nested: { param: '4' } } } }

schema.coerce({ person: { documents: [{id: '1'}, { id: null }] } }) 
// => { person: { documents: [{id: 1}] } }
```

## Config

```js
// Change 'type' key globaly
Schema.type = '__type__'

// or localy
const schema = new Schema({
  id: {
    __type__: Number
  }
})

schema.type = '__type__'
```

```js
// Change 'default' key globaly
Schema.default = '__default__'

// or localy
const schema = new Schema({
  id: {
    type: Number,
    __default__: 0 
  }
})

schema.default = '__default__'
```

```js
// Change 'isBlank' function (rejects empty elements from arrays and 
// detect if default value should be returned)
Schema.isBlank = function(val) {
  return val === '0';
}

// or localy
const schema = new Schema({
  name: {
    type: String,
    default: 'none'
  }
})

schema.isBlank = function(val) {
  return val === '0';
}

schema.coerce({ name: '0' }) // => { name: 'none' }
```
