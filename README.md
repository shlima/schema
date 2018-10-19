## URL query schema coercion

I have made this npm package to coerce/type cast values comes from URI query


## Install

```bash
yarn add @shlima/schema
```

## Example (Vue2)

```js
import Schema from "shlima/schema"

const schema = new Schema({
  filter: {
    user_ids: {
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
    }
  }
})

export default {
  data() {
    return schema.coerce(this.$route.query)
  }
}
```
