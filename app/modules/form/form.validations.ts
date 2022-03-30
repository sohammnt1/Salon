import { body } from "express-validator";
import validate from "../../utility/validate";

export const CreateFormValidator = [
    body("name").isString().withMessage("Enter a name"),
    body("age").isNumeric().withMessage("Enter a age"),
    body("email").isEmail().withMessage("Enter a valid email."),
    body("serviceBy").isString().withMessage("Enter a valid serviceBy"),
    body("servicesAvailed").isArray().withMessage("Enter a valid services Availed"),
    body("ambienceRating").isNumeric().withMessage("Enter a valid ambienceRating"),
    body("cleanlinessRating").isNumeric().withMessage("Enter a valid cleanlinessRating"),
    body("serviceRating").isNumeric().withMessage("Enter a valid serviceRating"),
    body("overallRating").isNumeric().withMessage("Enter a valid overallRating"),
    body("comments").isString().withMessage("Enter a valid comments"),
    validate
];
