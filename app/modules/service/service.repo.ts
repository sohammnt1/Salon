import serviceModel from "./service.schema";

const getAll = () => serviceModel.find()

export default {    
    getAll,
}