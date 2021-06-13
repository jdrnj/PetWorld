const db = require("../Database");

exports.insert_pet_post = async (req, res) => {
  try {
    const cat_ID = await db.query("SELECT id FROM category WHERE name = $1", [
      req.body.pet.category,
    ]);
    const result = await db.query(
      "INSERT INTO animal (category_id, category_name, animal_name, breed, age, sex, color, animal_weight, story, medical_info, image, isAdopted) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *",
      [
        cat_ID.rows[0].id,
        req.body.pet.category,
        req.body.pet.name,
        req.body.pet.breed,
        req.body.pet.age,
        req.body.pet.sex,
        req.body.pet.color,
        req.body.pet.weight,
        req.body.pet.story,
        req.body.medical_info.join(","),
        req.body.pet.imageName,
        false
      ]
    );
    res.status(201).json({
      status: "success",
      data: {
        msg: "Successfully added a pet!",
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
const updateAdoptedAnimals = async (date) => {
  try {
    const adopters = await db.query('SELECT * from adopter WHERE date<$1', [date])
    const rows = adopters.rows
    for (let i = 0; i < rows.length; i++) {
      await db.query('UPDATE animal SET isAdoped=$1 WHERE animal_id=$2', [false, rows[i].pet_id])
    }
  } catch (e) {
    throw e
  }
}
exports.fetch_all_animals_get = async (req, res) => {
  try {
    await updateAdoptedAnimals(req.params.date)
    const animals = await db.query("SELECT * FROM animal");
    res.status(201).json({
      status: "success",
      data: {
        animals: animals.rows,
        msg: "Successfully fetched animal list!",
      },
    });
  } catch (e) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "There was a problem getting animals list!",
      },
    });
  }
};
exports.fetch_animal_by_id = async (req, res) => {
  try {
    await updateAdoptedAnimals(req.params.date)
    const animals = await db.query("SELECT * FROM animal where animal_id=$1", [
      req.params.id,
    ]);
    res.status(201).json({
      status: "success",
      data: {
        animal: animals.rows[0],
        msg: "Successfully fetched animal by id!",
      },
    });
  } catch (e) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "There was a problem fetching animal by id!",
      },
    });
  }
};
exports.fetch_animals_by_filter_get = async (req, res) => {
  let filter = JSON.parse(req.query.filter);
  filter = filter.type.map((item) => item.replace(item.slice(-1)[0], ""));
  let pets = [];
  try {
    await updateAdoptedAnimals(req.query.date)
    for (let i = 0; i < filter.length; i++) {
      let currentCategory = await db.query(
        "SELECT id FROM category WHERE name=$1",
        [filter[i]]
      );
      let currentPets = await db.query(
        "SELECT * FROM animal WHERE category_id=$1",
        [currentCategory.rows[0].id]
      );
      pets.push(...currentPets.rows);
    }
    res.status(201).json({
      status: "success",
      data: {
        animals: pets,
        msg: "Successfully fetched animal list by filter!",
      },
    });
  } catch (e) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "There was a problem getting animals list by filter!",
      },
    });
  }
};
exports.fetch_animals_by_category_get = async (req, res) => {
  let categoryName = req.query.name.replace(req.query.name.slice(-1)[0], "");
  try {
    await updateAdoptedAnimals(req.query.date)
    let category = await db.query("SELECT id FROM category WHERE name=$1", [
      categoryName,
    ]);
    let pets = await db.query("SELECT * FROM animal WHERE category_id=$1", [
      category.rows[0].id,
    ]);

    res.status(201).json({
      status: "success",
      data: {
        animals: pets.rows,
        msg: "Successfully fetched animal list by category!",
      },
    });
  } catch (e) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "There was a problem getting animals list by category!",
      },
    });
  }
};
