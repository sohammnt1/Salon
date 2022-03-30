import serviceModel from "../modules/service/service.schema"
import roleModel from "../modules/role/role.schema"
import { ObjectId } from 'mongodb'

export const populate = async () => {
    try {
        const allRoles = () => { return roleModel.find({}, { name: 1, _id: { "$toString": "$_id" } }).exec() }
        const allServices = () => { return serviceModel.find({}, { name: 1, _id: { "$toString": "$_id" } }).exec() }
        
        const assignVariable = async () => {
            try {
                const allRolesArr = await allRoles();
                const allServiceArr = await allServices();
                return [allRolesArr, allServiceArr]
            }
            catch (error) {
                throw error;
            }
        }
        const variables = await assignVariable()
        //console.log(variables)
    }
    catch (error) {
        throw error;
    }
}

// console.log(populatedVariableArray)
//get return value of populate function i.e. Array in populatedVariableArray.

let populatedVariableArray:any = [
    [
      { name: 'Admin', _id: new ObjectId("623aebd324fe9ad75b775fc1") },
      { name: 'Stylist', _id: new ObjectId("623aebee24fe9ad75b775fc2") }
    ],
    [
      { name: 'Hair_Cut', _id: new ObjectId("623aec5324fe9ad75b775fc5") },
      {
        name: 'Hair_Wash',
        _id: new ObjectId("623aec6b24fe9ad75b775fc6")
      }
    ]
  ]

const convertArrayToObject = (array: any, key: any) => {
    const initialValue = {};
    return array.reduce((obj: any, item: any) => {
        return {
            ...obj,
            [item[key]]: item._id.toHexString(),
        };
    }, initialValue);
};

const allRollsObject = convertArrayToObject(populatedVariableArray[0], "name")
const allServicesObject = convertArrayToObject(populatedVariableArray[1], "name")
export const ROLES = allRollsObject
export const DEPARTMENTS = allServicesObject
