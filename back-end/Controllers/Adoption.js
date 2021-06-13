const db = require("../Database");

exports.insert_adopter_post = async (req, res) => {
  req.body.user.id;
  try {
    await db.query(
      "INSERT INTO adopter (user_id, experience, conditions, other_pets, live, pet_id, created_at) values ($1,$2,$3,$4,$5, $6, $7)",
      [
        req.body.user.id,
        req.body.adoptionForm.experience,
        req.body.adoptionForm.conditions,
        req.body.adoptionForm.otherPets,
        req.body.adoptionForm.live,
        req.body.animalId,
        req.body.createdAt
      ]
    );
    await db.query("UPDATE animal SET isAdopted= $1 WHERE animal_id=$2", [true, req.body.animalId])
    res.status(201).json({
      status: "success",
      data: {
        msg: "Successfully added an adopter!",
      },
    });
  } catch (e) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "Could not add an adopter!",
      },
    });
  }
};
exports.fetch_all_adopters_get = async (req, res) => {
  try {
    const adoptersRaw = await db.query(
      "SELECT (id, experience, conditions, other_pets, live, username, email, pet_id) FROM adopter INNER JOIN users ON (adopter.user_id = users.u_id)"
    );
    let rows = adoptersRaw.rows;
    let adoptersClean = [];
    let obj = {};
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i].row;
      row = row.replace(/"/g, "").replace("(", "").replace(")", "");
      row = row.split(",");
      obj = {
        adopterId: row[0],
        experience: row[1],
        conditions: row[2],
        otherPets: row[3],
        live: row[4],
        username: row[5],
        email: row[6],
        petId: row[7],
      };
      adoptersClean.push(obj);
    }
    res.status(201).json({
      status: "success",
      data: {
        adopters: adoptersClean,
        msg: "Successfully fetched all adopters list!",
      },
    });
  } catch (e) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "Could not fetch all adopters list!",
      },
    });
  }
};
exports.confirm_adoption_delete = async (req, res) => {
  try {
    db.query("DELETE FROM adopter WHERE id=$1", [req.params.id]);
    res.status(201).json({
      status: "success",
      data: {
        msg: "Successfully confirmed an adoption!",
      },
    });
  } catch (e) {
    res.status(201).json({
      status: "error",
      data: {
        msg: "Could not confirm an adoption, please try again later!",
      },
    });
  }
};
