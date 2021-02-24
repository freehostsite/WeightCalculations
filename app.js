const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
  // Plate Mass Formula - width(mm) * length(m) * breadth(m) * 7.85

  var span = req.body.span;
  var height = req.body.height;
  var width = req.body.width;
  var sidePlate = req.body.sidePlate;
  var topPlate = req. body.topPlate;
  var bottomPlate = req.body.bottomPlate;
  var noOfBeams = Number(req.body.noOfBeams);

  // Side Plate Mass
  var sidePlateMass = Number(sidePlate) * (Number(span) / 1000) * (Number(height) / 1000) * 7.85 * 2

  // Top Plate Mass
  var topPlateMass = Number(topPlate) * (Number(span) / 1000) * (Number(width) / 1000) * 7.85
  // Bottom Plate Mass
  var bottomPlateMass = Number(bottomPlate) * (Number(span) / 1000) * (Number(width) / 1000) * 7.85

  // Ribs Mass
  var noOfRibs = Math.floor(Number(span) / 1000 * 1.5)
  var ribsMass = Number(sidePlate) * (Number(height) / 1000) * (Number(width) / 1000) * 7.85 * noOfRibs

  var totalMass = ((sidePlateMass + topPlateMass + bottomPlateMass + ribsMass) * 2).toFixed(3);

  res.send("<strong>Total Wight is " + totalMass + "kg</strong>")
})

app.listen(3000, function () {
  console.log("Server is running on port 3000");
})
