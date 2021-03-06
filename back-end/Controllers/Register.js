const db = require("../Database");

exports.insert_register_post = async (req, res) => {
  try {
    await db.query(
      "INSERT INTO users (username,email,password, account_type) values ($1,$2,$3, $4)",
      [req.body.username, req.body.email, req.body.password, req.body.type]
    );
    res.status(201).json({
      status: "success",
      data: {
        msg: "Successfully registered user!",
      },
    });
  } catch (error) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "Please fill all of the fields!",
      },
    });
  }
};
