import axios from 'axios'
import React, { useState } from 'react'

export default function Form() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(null)
    const [date, setDate] = useState(null)

    const SERVER_URL = "http://localhost:8000/"

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(name);
        console.log(email);
        console.log(phone);
        console.log(date);

        axios({
            method: 'post',
            url: SERVER_URL,
            data: {
                name: name,
                email: email,
                phone: phone,
                date: date
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .catch(err=>{
            console.log(err)
        })

        alert(`Your Appointment has been booked successfully on ${date} !
            Appointment Details
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Date: ${date}
        `); 

        setName('');
        setEmail('');
        setPhone(null);
        setDate(null);
    }

    return (
        <>
            <form method='POST' onSubmit={handleSubmit}>
                <h1 className="md-3">Appointment Form</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" id="name" placeholder="your name" onChange={({ target }) => setName(target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="emaiId" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="emailId" placeholder="name@example.com" onChange={({ target }) => setEmail(target.value)} setEmail />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="text" name="phone" className="form-control" id="phone" placeholder="your phone number" onChange={({ target }) => setPhone(target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Select Appointment Date</label>
                    <input type="date" name="date" className="form-control" id="date" onChange={({ target }) => setDate(target.value)} />
                </div>

                <button className="btn btn-dark">Submit</button>
            </form>


        </>
    )
}
