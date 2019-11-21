const express = require('express');
const path = require('path');
const routes = require('./routes')
const app = express();
const PORT = process.env.PORT || 8080;
// Route requires


// MIDDLEWARE
//Set up url encoding and json mapping
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Heroku environment declaration for the build directory
//Neccesary for later routing
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
//MongoDB simple connection
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/googlebooks_db",
    {
        useCreateIndex: true,
        useNewUrlParser: true
    }
);
//Connect to React proceduraly created build directory, currently target is in public
//Proxy in the client package.json handles this connection for localhost
app.use(express.static(path.join(__dirname, "client", "build")));
// Routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.use("/api", routes);
// Starting Server 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})
