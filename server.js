const express = require("express")
const cors = require("cors")

const ipoData = require("./ipoData")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/check-allotment", (req, res) => {

const { ipoName, pan } = req.body

const ipo = ipoData.find(i => i.name === ipoName)

if(!ipo){
return res.json({
status:"IPO not found"
})
}

let url = ""

if(ipo.registrar === "kfintech"){

url = `https://ris.kfintech.com/ipostatus/?pan=${pan}`

}

if(ipo.registrar === "linkintime"){

url = "https://linkintime.co.in/initial_offer/public-issues.html"

}

if(ipo.registrar === "bigshare"){

url = "https://ipo.bigshareonline.com/IPO_Status.html"

}

res.json({
status:"redirect",
url:url
})

})

app.listen(3000, () => {

console.log("IPO Allotment API Running on port 3000")

})
app.get("/", (req,res)=>{
    res.send("IPO Allotment API Running")
    })
    app.get("/check-allotment", (req,res)=>{
        res.send("API working. Use POST request.")
        })