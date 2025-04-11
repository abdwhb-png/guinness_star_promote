import { FilterMatchMode } from "@primevue/core/api";
import {
    findFirstParentWithClass,
    scrollToPosition,
    findParentWithOverflowY,
} from "@/utils";

export const itemsPerPage = [15, 20, 30, 50, 100, 200];

export function getRowsOptions(length = null) {
    if (!length) {
        return itemsPerPage;
    }

    const results = [];

    // Ajout des valeurs par pas de 10 jusqu'à 50
    for (let i = 10; i < 50; i += 10) {
        results.push(i);
    }

    // Ajout des valeurs par pas de 50 jusqu'à 100
    for (let i = 50; i < 100; i += 50) {
        results.push(i);
    }

    // Ajout des valeurs par pas de 100 au-delà de 100
    for (let i = 100; i < length; i += 100) {
        results.push(i);
    }

    if (results[results.length - 1] !== length) {
        results.push(length);
    }

    return results;
}

export const scrollHeight = "700px";

export const pt = {
    table: { style: "min-width: 50rem" },
    column: {
        bodycell: ({ state }) => ({
            style:
                state["d_editing"] &&
                "padding-top: 0.75rem; padding-bottom: 0.75rem",
        }),
    },
};

export async function scrollTable(el, position) {
    const searchClass = "p-datatable-scrollable";

    const findedParent = findFirstParentWithClass(el, searchClass);

    if (findedParent) {
        const dataTable = findedParent.querySelector(
            ".p-datatable-table-container"
        );
        if (dataTable) {
            const parentWithOverflowY = findParentWithOverflowY(dataTable);

            if (position === "top") {
                scrollToPosition(0, 500, parentWithOverflowY);
                dataTable.scrollTop = 0;
            }

            if (position === "bottom") {
                scrollToPosition(700, 500, parentWithOverflowY);

                dataTable.scrollTop = dataTable.scrollHeight;
            }
        }
    } else {
        console.log("No parent with class " + searchClass + " found.");
    }
}

export function parseStatuses(statuses) {
    return statuses?.map((status) => {
        return {
            label: status.label || status.name || status,
            value: status.value || status.name || status,
        };
    });
}

export function getFilters(type = "", search = null) {
    const base = {
        global: { value: search, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
    switch (type) {
        case "all":
            return {};

        case "notifications":
            return {
                ...base,
                title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                body: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                created_at: {
                    value: null,
                    matchMode: FilterMatchMode.STARTS_WITH,
                },
            };

        case "transactions":
            return {
                ...base,
                type: { value: null, matchMode: FilterMatchMode.EQUALS },
            };

        case "deals":
            return {
                ...base,
                category: { value: null, matchMode: FilterMatchMode.EQUALS },
                with_users: { value: null, matchMode: FilterMatchMode.EQUALS },
            };

        case "user_deals":
            return {
                ...base,
                category: { value: null, matchMode: FilterMatchMode.EQUALS },
                index: { value: null, matchMode: FilterMatchMode.EQUALS },
                name: { value: null, matchMode: FilterMatchMode.CONTAINS },
                "state.negative_balance": {
                    value: null,
                    matchMode: FilterMatchMode.CONTAINS,
                },
            };

        default:
            return base;
    }
}

export function getSeverity(status) {
    switch (status) {
        case "approved":
            return "success";

        case "verified":
            return "success";

        case "pending":
            return "warn";

        case "rejected":
            return "danger";

        case "canceled":
            return "secondary";

        case "completed":
            return "success";

        case "unverified":
            return "danger";

        case "not provided":
            return "secondary";

        case "recharge":
            return "info";

        case "withdrawal":
            return "danger";

        case "completed":
            return "info";

        case "uncompleted":
            return "danger";

        case "system":
            return "secondary";

        case "granted":
            return "info";

        case "processing":
            return "info";

        case "has":
            return "info";

        case "hasnot":
            return "secondary";

        default:
            return null;
    }
}
