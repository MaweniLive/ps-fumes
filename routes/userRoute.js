const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");

// Getting All Users

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Getting A Single User

router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM users WHERE user_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Editing A User

router.put("/:id", (req, res) => {
  const { 
    email, 
    password, 
    fullname, 
    joinDate, 
    userRole, 
    phone 
  } =
    req.body;

  try {
    con.query(
      `UPDATE users SET email='${email}', password='${password}', 
      fullname='${fullname}', joinDate='${joinDate}', 
      userRole='${userRole}', phone='${phone}'
       WHERE user_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Deleting A User

router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM users WHERE user_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;

// Password Encryption

const bcrypt = require("bcryptjs");
const { request } = require("express");

// Register Route

router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";
    // This is the body in requesting
    const { 
      fullname, 
      email, 
      password, 
      phone, 
      joinDate, 
      userRole 
    } =
      req.body;

    // The start of hashing / encryption
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let user = {
      fullname,
      email,
      // We sending the hash value to be stored within the table
      password: hash,
      phone,
      joinDate,
      userRole,
    };

    // connection to the database
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`User ${(user.fullname, user.email)} created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});

// Login Route
  const jwt = require("jsonwebtoken");

  // Login
  router.post("/login", (req, res) => {
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
          const isMatch = await bcrypt.compare(
            req.body.password,
            result[0].password
          );
          if (!isMatch) {
            res.send("Password incorrect");
          } else {
            // The information the should be stored inside token
            const payload = {
              user: {
                user_id: result[0].user_id,
                fullname: result[0].fullname,
                email: result[0].email,
                userRole: result[0].userRole,
                phone: result[0].phone,
                joinDate: result[0].joinDate
              },
            };
            // Creating a token and setting expiry date
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
    }
  });


// Verify Route

router.get("/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({ msg: "Unauthorised Access!" });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
});

const middleware = require("../middleware/auth");

router.get("/", middleware, (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
