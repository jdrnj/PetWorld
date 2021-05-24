const db = require("../Database");

exports.login_user_get = async (req, res) => {
  console.log(req.params.user);
  console.log(res.status.value);
  // try {
  try {
    const result = await db.query("SELECT  * FROM users WHERE email = $1", [
      req.params.email,
    ]);
    res.status(201).json({
      status: "success",
      data: {
        users: result.rows[0],
      },
    });
  } catch (error) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "There is not such an email",
      },
    });
  }

  if (res.status.value === undefined) {
    res.status(201).json({
      status: "Error",
      data: {
        msg: "There is not such an email",
      },
    });
  } else {
    res.status(201).json({
      status: "success",
      data: {
        msg: "You are logged in!",
      },
    });
  }

  // if (result.rows.length > 0) {
  //   const user = result.rows[0];

  //   return res.status(201).json({
  //     msg: "success",
  //   });
  // } else {
  //   return res.status(201).json({ msg: "Wrong data!" });
  // }
  // if (result.rows[0]) {
  //   return res
  //     .status(201)
  //     .json({ msg: "Please fill all the fields properly!" });
  // } else {
  //   return res.status(201).json({ msg: "success" });
  // }
  // res.status(201).json({
  //   status: "success",
  //   data: {
  //     users: result.rows[0],
  //   },
  // });
  //   } catch (error) {
  //     res.status(201).json({
  //       status: "error",
  //       data: {
  //         msg: "Please fill all the fields properly!",
  //       },
  //     });
  //   }
};
