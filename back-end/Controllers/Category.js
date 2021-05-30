const db = require("../Database");

exports.get_categories_get = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM category");
    if (result.rows.length > 0) {
      res.status(201).json({
        status: "success",
        data: {
          categories: result.rows,
        },
      });
    } else {
      res.status(201).json({
        status: "error",
        data: {
          msg: "No categories found.",
        },
      });
    }
  } catch (error) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "No categories found.",
      },
    });
  }
};

exports.insert_category_post = async (req, res) => {
  try {
    await db.query("INSERT INTO category (name, image) values ($1, $2)", [
      req.body.category.name,
      req.body.category.imageName,
    ]);
    res.status(201).json({
      status: "success",
      data: {
        msg: "Successfully added a product!",
      },
    });
  } catch (error) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "Something went wrong, please try again.",
      },
    });
  }
};
