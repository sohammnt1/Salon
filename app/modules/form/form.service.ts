import formRepo from "./form.repo";
import { IForm } from "./form.types";
import { ObjectId } from "mongodb"

const createForm = async (form: IForm) => {
    try {
        const result = await formRepo.create(form);
        let id = result._id
        let data = await formRepo.getAveragePerForm(id)
        let avgrating = data[0].avgRating
        if (avgrating >= 4) {
            console.log("Thank You Email Sent")
        }
        else if (avgrating < 3) {
            console.log("Sorry Email Sent")
        }
        return result
    } catch (error) {
        throw error;
    }
}

const displayForms = async () => {
    const result = formRepo.getAll();
    return result;
}


const getAverage = async () => {
    let result = await formRepo.getAverage();
    result[0].averageAmbienceRating=parseFloat(result[0].averageAmbienceRating).toFixed(2)
    result[0].averageCleanlinessRating=parseFloat(result[0].averageCleanlinessRating).toFixed(2)
    result[0].averageServiceRating=parseFloat(result[0].averageServiceRating).toFixed(2)
    result[0].averageOverallRating=parseFloat(result[0].averageOverallRating).toFixed(2)
    result[0].overallAverage=parseFloat(result[0].overallAverage).toFixed(2)
    return result;
}

const getAveragePerForm = async (id: any) => {
    id = new ObjectId(id)
    console.log(id)
    const result = formRepo.getAveragePerForm(id);
    return result;
}

const filterAverage = async (filter: any) => {
    const { fromDate, toDate, overallAverage, serviceBy } = filter;
    let { servicesAvailed, page, itemsPerPage } = filter;
    const filters = [];
    const filterQuery = [];

    if (fromDate) {
        filterQuery.push({ 'createdAt': { $gte: new Date(fromDate) } });
    }
    if (toDate) {
        filterQuery.push({ 'createdAt': { $lt: new Date(toDate) } });
    }
    if (servicesAvailed) {
        servicesAvailed = servicesAvailed.map((service: string) => new ObjectId(service));
        filterQuery.push({ 'servicesAvailed': { $in: servicesAvailed } });
    }
    if (serviceBy) {
        filterQuery.push({ 'serviceBy': new ObjectId(serviceBy) });
    }
    if (overallAverage) {
        filterQuery.push({ 'overallAverage': { $gte: +overallAverage }})
    }
    const match = {
        $match: {
            $and: filterQuery
        }
    };
    if (filterQuery.length && match && match.$match.$and) {
        filters.push(match);
    }
    if (page && itemsPerPage) {
        page = Math.floor(page)
        itemsPerPage = Math.floor(itemsPerPage)
        filters.push({ $skip: (page - 1) * itemsPerPage });
        filters.push({ $limit: itemsPerPage });
    }
    return formRepo.filterAverage(filters);
}
export default {
    createForm,
    displayForms,
    getAverage,
    getAveragePerForm,
    filterAverage
}