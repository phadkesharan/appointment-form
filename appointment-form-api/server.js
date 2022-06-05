const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');


dotenv.config();
const app = express()
app.use(express.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    next();
});
app.use(express.json())


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));


const AppointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    date: String
})

const Appointment = new mongoose.model("Appointment", AppointmentSchema);

app.post('/', (req, res) => {

    console.log(req.body);

    const newAppointment = new Appointment({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: req.body.date
    })

    newAppointment.save((err) => {
        if (err)
            console.log(err);
    })

    return res.send("All OK");
})

app.listen(8000, () => {
    console.log("Server running on PORT 8000");
})