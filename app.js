// imports
const express = require("express");
const morgan = require("morgan")
const Cache = require("./cache");

// initialise express application
const app = express();

// attaches the morgan middleware to log http requests
// in the middleware chain
app.use(morgan(':method :url :response-time'))

// initialize a cache object which takes time (in minutes) 
// for the cache's ttl
const cache = new Cache(1);

// a simple route to handle a request in the index route
app.get('/', async (req, res, next) => {
    try{

        // retrieves the cached data from memory
        const cachedData = cache.readCache();

        // if there is cached data, we simply
        // send the cached data to the user
        if (cachedData){
            return res.json(cachedData);
        }

        // if there is no cached data, we simply fetch the data 
        // and store it in the cache for future requests
        else{
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok){
                throw new Error(`${response.statusText}`, {cause: {status: response.status, message: response.statusText}});
            } else{
                const productData = await response.json();
                cache.setCache(productData)
                return res.json({productData});
            }
        }
    } catch(err){
        return (err.cause.status) ? res.status(err.cause.status).json({error: err.cause.message}) : res.status(400).json({error: "Bad Request"});
    }
})

// configuring the express app to listen for
// requests in port 3000
app.listen(3000, () => {
    console.log("Listening At Port 3000 For Requests...");
})