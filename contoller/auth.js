//login
//register
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const con = require("../lib/dbConnection");
require("dotenv").config();

async function Login(req, res) {
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        // Decryption
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        // If password !== (does not match)
        if (!isMatch) {
          res.send("Password incorrect");
        } else {
          // res.send(result);

          // The information should be stored inside the token
          const payload = {
            user: {
              user_id: result[0].user_id,
              full_name: result[0].full_name,
              email: result[0].email,
              user_type: result[0].user_type,
              phone: result[0].phone,
              country: result[0].country,
              billing_address: result[0].billing_address,
              default_shipping_address: result[0].default_shipping_address,
            },
          };

          // Creating a token and setting an expiry date
          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function Register(req, res) {
     const {
       full_name,
       email,
       password,
       user_type,
       phone,
       country,
       billing_address,
       default_shipping_address,
     } = req.body;

     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(password, salt);

     try {
       con.query(
         `INSERT INTO users (full_name,email,password,user_type,phone,country,billing_address,default_shipping_address) VALUES ('${full_name}','${email}','${hash}','${user_type}','${phone}','${country}','${billing_address}','${default_shipping_address}')`,
         (err, result) => {
           if (err) throw err;
           console.log(result);
           res.send(`User ${(full_name, email)} created successfully`);
         }
       );
     } catch (error) {
       console.log(error);
       res.status(400).send(error);
     }
}

module.exports = {
  Login,
  Register,
};
