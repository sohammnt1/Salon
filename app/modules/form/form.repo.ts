import formModel from "./form.schema";
import { IForm } from "./form.types";


const create = (form: IForm) => formModel.create(form);

const getAll = () => formModel.find()

const getAverage = () => formModel.aggregate([
    {
        $group: {
            _id: null,
            averageAmbienceRating: { $avg: '$ambienceRating' },
            averageCleanlinessRating: { $avg: '$cleanlinessRating' },
            averageServiceRating: { $avg: '$serviceRating' },
            averageOverallRating: { $avg: '$overallRating' }
        }
    },
    {
        $project: {
            averageAmbienceRating: 1,
            averageCleanlinessRating: 1,
            averageServiceRating: 1,
            averageOverallRating: 1,
            overallAverage: {
                $avg: [
                    '$averageAmbienceRating',
                    '$averageCleanlinessRating',
                    '$averageServiceRating',
                    '$averageOverallRating'
                ]
            }
        }
    }
]);

const getAveragePerForm = (id: string) => formModel.aggregate([
    {
        $project:
        {
            avgRating:
            {
                $avg:
                    [
                        "$ambienceRating",
                        "$cleanlinessRating",
                        "$serviceRating",
                        "$overallRating"
                    ]
            }
        },

    }, {
        $match: { '_id': id }
    }])

const filterAverage = (filters: any) => formModel.aggregate([
    {
        $project: {
            name: 1,
            email: 1,
            age: 1,
            ambienceRating: 1,
            cleanlinessRating: 1,
            serviceRating: 1,
            overallRating: 1,
            comments: 1,
            createdAt: 1,
            servicesAvailed : 1,
            serviceBy : 1,
            overallAverage: {
                $avg: [
                    '$ambienceRating',
                    '$cleanlinessRating',
                    '$serviceRating',
                    '$overallRating'
                ]
            }
        }
    },
    ...filters,
    {
        $lookup: {
            from: 'users',
            localField: 'serviceBy',
            foreignField: '_id',
            as: 'serviceBy'
          }
    },
    {
        $lookup: {
            from: 'services',
            localField: 'servicesAvailed',
            foreignField: '_id',
            as: 'servicesAvailed'
          }
    },
]);


export default {
    create,
    getAll,
    getAverage,
    getAveragePerForm,
    filterAverage
}