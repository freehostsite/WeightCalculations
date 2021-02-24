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

  // Declarations for Beams

  var span = Number(req.body.span);
  var height = Number(req.body.height);
  var width = Number(req.body.width);
  var sidePlate = Number(req.body.sidePlate);
  var topPlate = Number(req. body.topPlate);
  var bottomPlate = Number(req.body.bottomPlate);
  var noOfBeams = Number(req.body.noOfBeams);

  // Mass Calculations For Beams

  // Side Plate Mass
  var sidePlateMass = sidePlate * (span / 1000) * (height / 1000) * 7.85 * 2

  // Top Plate Mass
  var topPlateMass = topPlate * (span / 1000) * (width / 1000) * 7.85
  // Bottom Plate Mass
  var bottomPlateMass = bottomPlate * (span / 1000) * (width / 1000) * 7.85

  // Ribs Mass
  var noOfRibs = Math.floor(span / 1000 * 1.5)
  var ribsMass = sidePlate * (height / 1000) * (width / 1000) * 7.85 * noOfRibs

  var totalMass = ((sidePlateMass + topPlateMass + bottomPlateMass + ribsMass) * 2).toFixed(3);

  // Declarations for End Carriages

  var spanEC = Number(req.body.spanEC);
  var heightEC = Number(req.body.heightEC);
  var widthEC = Number(req.body.widthEC);
  var sidePlateEC = Number(req.body.sidePlateEC);
  var topPlateEC = Number(req. body.topPlateEC);
  var bottomPlateEC = Number(req.body.bottomPlateEC);
  var noOfBeamsEC = Number(req.body.noOfBeamsEC);

  // Mass Calculations For End Carriages

  // Side Plate Mass
  var sidePlateMassEC = sidePlateEC * (spanEC / 1000) * (heightEC / 1000) * 7.85 * 2

  // Top Plate Mass
  var topPlateMassEC = topPlateEC * (spanEC / 1000) * (widthEC / 1000) * 7.85
  // Bottom Plate Mass
  var bottomPlateMassEC = bottomPlateEC * (spanEC / 1000) * (widthEC / 1000) * 7.85

  // Ribs Mass
  var noOfRibsEC = Math.floor(spanEC / 1000 * 2)
  var ribsMassEC = sidePlateEC* (heightEC/ 1000) * (widthEC / 1000) * 7.85 * noOfRibsEC

  var totalMassEC = ((sidePlateMassEC + topPlateMassEC + bottomPlateMassEC + ribsMassEC) * 2).toFixed(3);

  res.write("<h1>Total Wight of Beams is " + totalMass + "kg</h1>")
  res.write("<h1>Total Wight of End Carriages is " + totalMassEC + "kg</h1>")
  res.send();
})

app.listen(3000, function () {
  console.log("Server is running on port 3000");
})
