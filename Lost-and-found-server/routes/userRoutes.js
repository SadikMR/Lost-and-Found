const multer = require('multer');

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the folder where images will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Set a unique filename for the uploaded file
    }
});
const express = require("express");
const { saveInfo, getInfo, updateInfo, verifyEmail, resetPassword, forgotPassword, updateImage } = require("../controllers/userController");
const validateUserInfo = require("../middleware/validateUserInfo");

const upload = multer({ storage });

const router = express.Router();

router.post("/saveInfo", validateUserInfo, saveInfo);
router.post("/updateImage", upload.single("image"), updateImage);
router.get("/getInfo/:firebase_uid", getInfo);
router.put("/updateInfo/:firebase_uid", updateInfo);

router.get("/verifyEmail/:token", verifyEmail);

router.post("/resetPassword/:token", resetPassword);
router.post("/forgotPassword", forgotPassword);


module.exports = router;
