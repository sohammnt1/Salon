import servicesRepo from "./service.repo";

const displayServicess = async () => {
        const result = servicesRepo.getAll();
        return result;
    }

export default {
    displayServicess,
}