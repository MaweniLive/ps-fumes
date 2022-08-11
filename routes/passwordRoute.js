// Importing the dependencies
const nodemailer = require("nodemailer");

router.post("/forgot-psw", (req, res) => {
 return authController.forgot-psw(req, res)
});

// Rest Password Route

router.put("reset-psw/:id", (req, res) => {
  let sql = "SELECT * FROM users WHERE ?";
  let user = {
    user_id: req.params.id,
  };
  con.query(sql, user, (err, result) => {
    if (err) throw err;
    if (result === 0) {
      res.status(400), res.send("User not found");
    } else {
      let newPassword = `UPDATE users SET ? WHERE user_id = ${req.params.id}`;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const updatedPassword = {
        fullname: result[0].fullname,
        email: result[0].email,
        userRole: result[0].userRole,
        phone: result[0].phone,
        joinDate: result[0].joinDate,
        cart: result[0].cart,

        // Only thing im changing in table
        password: hash,
      };

      con.query(newPassword, updatedPassword, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Password Updated please login");
      });
    }
  });
});
