import { response, Router } from "express";
import User from "../db/user.js";

const router = Router();

router.post("/signup", (req, res) => {
  let newUser = new User({ ...req.body });
  // Validate input user
  let error = newUser.validateSync();
  if (error == null) {
    // if it's valid
    newUser
      .save()
      .then((v) => {
        res.json({ error: false, message: "Successfully created." });
      })
      .catch((error) => {
        res.json({ error: true, message: error.message });
      });
  } else {
    res.json({ error: true, message: error.message });
  }
});
router.post("/signin", async (req, res) => {
  let tempUser = new User({ ...req.body });

  // Validate input user first
  let error = tempUser.validateSync();

  if (error.errors["email"]) {
    return res.json({ error: true, message: error.errors["email"].message });
  }
  if (error.errors["password"]) {
    return res.json({ error: true, message: error.errors["password"].message });
  }

  // find user
  let foundUser = await User.findByEmail(req.body.email);

  // return user
  if (foundUser) {
    if (User.comparePassword(req.body.password, foundUser.password))
      res.json({
        error: false,
        user: { name: foundUser.name, email: foundUser.email },
      });
    else res.json({ error: true, message: "Wrong password." });
  } else res.json({ error: true, message: "No user found." });
});

export default router;
