
class FiltersService {
    makeCurrentValueFilters (dataFilters) {
        let currentValueFilters = {};
        currentValueFilters.to = new Date().toJSON().slice(0,10);
        console.log(currentValueFilters.to)
        return currentValueFilters;
    }
}

export default FiltersService;