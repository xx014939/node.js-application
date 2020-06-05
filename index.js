const path = require('path')
const fs = require('fs')

const V = require('vaxic')

const quoteFileContents = fs.readFileSync(path.join(__dirname, 'quotes.txt')).toString() // read quotes.txt and convert its contents to string

const quotes = []

quoteFileContents.split('\n').forEach((line) => { // Split lines up in quote.txt

    const lineParts = line.split('---') // seperate line into to parts, part one is before '---' and part two after.

    quotes.push({
        "quote" : lineParts[0], // lineParts[0] is the quote
        "by" : lineParts[1] // lineParts[1] is the author

    })

})

const app = new V()

app.add('GET', '/api/quote', (req, res) =>{ // local host 8080 (see below) followed by /api/quote, will perform the following

    res.writeHead(200, {
        'Content-Type' : 'application/json' // content-type is an api used for browsers, to tell them what type of content they'll be reading
    })


    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)] // randomly selects quote from quptes.txt
    
    res.end(JSON.stringify(randomQuote).replace("\\r", " ")) // replace removes \r which appears in one quote of stringify is applied

    


})

app.add((req, res) =>{
    res.writeHead(404, {
        'Content-Type' : 'application/json' 
    })
    res.end(JSON.stringify({ // in the event that a page is selected which does not exist, output the following message
        'error': '404: resource not found'
    }))
})

app.listen(8080, () =>{
    console.log("The API is now running") // This message appears in the command prompt, when you run this node files using the "node index.js" command
})

