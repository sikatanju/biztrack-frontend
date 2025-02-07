const createDataTable = (e: HTMLTableElement) => {
    return $(e).DataTable({
        order: [[0, "asc"]],
        lengthMenu: [10, 15, 20, 30],
        columnDefs: [
            { width: "20%", targets: "_all" },
            { width: "100px", targets: 0 },
        ],
        destroy: true,
    });
};

const destroyDataTable = (dataTableInstance: DataTables.Api | null) => {
    if (dataTableInstance) dataTableInstance.destroy();
};

export { createDataTable, destroyDataTable };
