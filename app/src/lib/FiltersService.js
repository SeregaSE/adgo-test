
class FiltersService {
    makeCurrentValueFilters (dataFilters) {
        let currentValueFilters = {};
        let date = new Date()
        // текущая дата
        currentValueFilters.to = date.toJSON().slice(0,10);
        // по умолчанию отчет за месяц от текущей даты
        date.setMonth(date.getMonth() - 1);
        currentValueFilters.from = date.toJSON().slice(0,10);

        currentValueFilters.groups = dataFilters.groups[0];

        currentValueFilters.platforms = dataFilters.platforms[0];

        return currentValueFilters;
    }
}

export default FiltersService;