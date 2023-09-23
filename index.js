import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import concat from "concat-stream";


//declaring constants
const app = express();
const port = 3000;

//app usages
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));


//routing
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.post("/", (req, res) => {
    var text = req.body["Text"];
    // console.log("text is ", text);
    var qr_png = qr.image(text, { type: 'png' });
    // console.log("type is ", typeof (qr_png));
    //image converting
    qr_png.pipe(concat(function (imgData) {
        var imgDataUrl = "data:image/png;base64," + imgData.toString('base64');
        res.render('index.ejs', { imgDataUrl: imgDataUrl });
    }));
});


//local hosting
app.listen(port, function () {
    console.log(`Server hosted in local port ${port}`);
});