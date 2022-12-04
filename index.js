const http = require('http')
const fs = require('fs')
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.language)
    output = output.replace(/{%FOUNDER%}/g, product.founder)
    output = output.replace(/{%YEAR%}/g, product.year)
    return output
} 

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url
    if(pathName==='/') {
        res.writeHead(200, {'Content-type': 'text/html'})

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        let output = tempOverview.replace(/{%PRODUCT_CARDS%/g, cardsHtml)
        res.end(output)
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Server is listening on port 8000")
})