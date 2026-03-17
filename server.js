app.post("/check-allotment", async (req, res) => {

  const { ipoName, pan } = req.body;

  let url = "";

  // 👉 Simple registrar logic (NO database needed)
  if (ipoName.toLowerCase().includes("sedemac") ||
      ipoName.toLowerCase().includes("cmpdi")) {
    url = "https://ipostatus.kfintech.com";
  } 
  else {
    url = "https://linkintime.co.in/initial_offer/public-issues.html";
  }

  // ALWAYS return redirect
  res.json({
    status: "redirect",
    url: url
  });

});
