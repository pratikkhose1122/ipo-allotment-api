const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
  res.send("IPO Allotment API Running")
})

app.post("/check-allotment", async (req, res) => {

  const { ipoName, pan } = req.body

  try {

    // 🔥 Replace with your Firebase / API URL
    const response = await axios.get("https://firestore.googleapis.com/v1/projects/ipo-trackit/databases/(default)/documents/ipos")

    const ipoList = response.data

    const ipo = ipoList.find(i => i.name === ipoName)

    if (!ipo) {
      return res.json({
        status: "error",
        message: "IPO not found"
      })
    }

    let url = ""

    if (ipo.registrar === "kfintech") {
      url = "https://ipostatus.kfintech.com"
    }

    if (ipo.registrar === "linkintime") {
      url = "https://linkintime.co.in/initial_offer/public-issues.html"
    }

    if (ipo.registrar === "bigshare") {
      url = "https://ipo.bigshareonline.com/IPO_Status.html"
    }

    res.json({
      status: "redirect",
      url: url
    })

  } catch (error) {

    res.json({
      status: "error",
      message: "Server error"
    })

  }

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})