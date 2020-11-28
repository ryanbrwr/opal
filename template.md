# Feature Template

if you are making a new feature, they must strictly follow the format below. Anything that does not will not be merged.

```javascript
const Discord = require("discord.js")
// Any other dependencies here

module.exports = {
  name: "NAME OF YOUR FUNCTION",
  admin: false, // can this command only be used by admins? 
  description: "DESCRIPTION OF YOUR FUNCTION",
  async execute(msg) {
    // Your function here
  }
}
```

