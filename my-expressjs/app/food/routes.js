const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const foodController = require("./controller");

router.get("/food", foodController.index);
router.get("/food/:id", foodController.view);
router.post("/food", upload.single("image"), foodController.store);
router.put("/food/:id", upload.single("image"), foodController.update);
router.delete("/food/:id", foodController.destroy);

module.exports = router;
