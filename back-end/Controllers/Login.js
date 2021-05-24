const db = require("../Database");

exports.login_user_post = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 and password = $2",
      [req.body.email, req.body.password]
    );
    if (result.rows.length > 0) {
      res.status(201).json({
        status: "success",
        data: {
          users: result.rows[0],
        },
      });
    } else {
      res.status(201).json({
        status: "error",
        data: {
          msg: "There is not such an email",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
