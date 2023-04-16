// todo: refactor this file to use KOA instead of express
// todo: refactor this file to use typescript
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
