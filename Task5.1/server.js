const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Account = require("./models/Account")
const validator = require("validator")
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use('/public', express.static("public"))
const uri = "mongodb+srv://admin-haosen:Niallerrr.0913!@cluster0.ma67h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
const bcrypt = require("bcrypt")

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/custlogin.html")
})

app.get('/custsignup', (req, res)=>{
    res.sendFile(__dirname + "/custsignup.html")
})

app.post('/custsignup', (req, res)=>{
    const account = new Account({
        country: req.body.country,
        fname: req.body.first_name,
        lname: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        confirm: req.body.confirm_password,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        ZIP: req.body.ZIP_code,
        phone: req.body.phone_number,
        hashcode: "",
    })

    if(account.password == account.confirm){
        bcrypt.hash(account.password, 10, (err, hash)=>{
            if(err){
                res.send(err)
            }
            else{
                account.hashcode = hash
                account.save((err)=>{
                    if(!err){
                        res.sendFile(__dirname + "/success.html")
                        console.log(account)
                    }
                    else{
                        res.send(err)
                   }
                })    
            }        
        })
    }
    else{
        res.send('different input of password')        
    }
})

app.post('/success', (req, res)=>{
    res.sendFile(__dirname + "/custlogin.html")
})

app.post('/custlogin', (req, res)=>{
    const email = req.body.login_email
    const password = req.body.login_password

    Account.findOne({"email": email}, "hashcode", (err, account)=>{
        if(!err){
            bcrypt.compare(password, account.hashcode, (err, result)=>{
                if(!err){
                    if(result){
                        res.sendFile(__dirname + "/custtask.html")
                    }
                    else{
                        res.send('invalid input')
                    }
                }
                else{
                    console.log(err)
                }
            })
        }
        else{
            console.log(err)
        }
    })
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}

app.listen(port, (req,res)=>{
    console.log("on port 8080")
})
