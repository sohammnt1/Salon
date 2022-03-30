import { Schema, model, Types } from "mongoose";

class formSchema extends Schema {
    constructor() {
        super({
        name:{type:String,required:true},
        age:{type:Number,required:true},
        email:{type:String,required:true},
        serviceBy:{type:Types.ObjectId,required:true,ref:"user"},
        servicesAvailed:[{type:Types.ObjectId,required:true,ref:"services"}],
        ambienceRating:{type:Number,required:true},
        cleanlinessRating:{type:Number,required:true},
        serviceRating:{type:Number,required:true},
        overallRating:{type:Number,required:true},
        comments:{type:String,required:true}
        }, {
            timestamps: true,
        });
    }
}

const formModel = model('feedbackform', new formSchema());

export default formModel;
