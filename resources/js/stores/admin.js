import { defineStore, acceptHMRUpdate } from "pinia";
import { usePage, router } from "@inertiajs/vue3";
import { reactive } from "vue";
import {
    showLoadingToast,
    showFailToast,
    showSuccessToast,
    showToast,
} from "vant";
import axios from "axios";
import { reject } from "lodash";

const page = usePage();

const createEntityState = (entities) => {
    const state = reactive({
        data: {},
        loadings: {},
        urls: {},
        totals: {},
        limits: {},
    });

    Object.keys(entities).forEach((entity) => {
        state.data[entity] =
            entity == "roles_perms"
                ? {
                      roles: [],
                      perms: [],
                  }
                : [];

        state.loadings[entity] = false;

        state.urls[entity] = entities[entity];

        state.totals[entity] = 0;

        state.limits[entity] = entity == "deals" ? 200 : 100;
    });

    return state;
};

export const useAdminStore = defineStore("adminStore", {
    state: () => ({
        ...createEntityState({
            users: route("user.index"),
            admins: route("user.index", { get_admins: true }),
            transactions: route("transaction.index"),
            deals: route("deal.index"),
            roles_perms: route(page.props.routePrefix + "roles-perms.index"),
            totals: route(page.props.routePrefix + "data-totals"),
        }),
        currentUser: null,
        search: null,
        deletion: null,
        routePrefix: page.props.routePrefix || "admin.",
    }),

    getters: {
        loading: (state) => (key) => state.loadings[key],

        getData: (state) => (key) => {
            if (["roles", "perms"].includes(key)) {
                return state.data.roles_perms[key];
            }
            return state.data[key];
        },

        getUrl: (state) => (key) => {
            if (Object.keys(state.urls).includes(key)) {
                return state.urls[key];
            } else {
                throw new Error(`No url found for ${key}`);
            }
        },

        getLimit: (state) => (key) => {
            try {
                var limit = state.limits[key];

                if (localStorage.getItem("limits")) {
                    limit = JSON.parse(localStorage.getItem("limits"))[key];
                }

                return limit;
            } catch (error) {
                return 100;
            }
        },

        getTotal: (state) => (key) => {
            if (Object.keys(state.totals).includes(key)) {
                return state.totals[key];
            } else {
                try {
                    return state.data[key].length;
                } catch (error) {
                    return 0;
                }
            }
        },

        getUserDeals: (state) => {
            try {
                if (state.currentUser?.deals) {
                    return Object.values(state.currentUser.deals).map(
                        (item, index) => ({
                            ...item,
                            index: index + 1,
                        })
                    );
                } else {
                    throw new Error("No Current User found");
                }
            } catch (error) {
                console.warn(
                    "Warning while fetching current user deals",
                    error
                );
                return [];
            }
        },
    },

    actions: {
        setLimit(key, limit) {
            this.limits[key] = limit;
            localStorage.setItem("limits", JSON.stringify(this.limits));
        },

        setCurrentUser(user) {
            this.currentUser = user;
        },

        async fetchData(stateKey, toast = null, endpoint = null) {
            this.loadings[stateKey] = true;

            try {
                if (Object.keys(this.urls).includes(stateKey)) {
                    const url = endpoint ?? this.urls[stateKey];

                    const response = await axios.get(url, {
                        params: {
                            limit: this.getLimit(stateKey),
                            search: this.search,
                            current_user: this.currentUser?.id || null,
                        },
                    });

                    if (stateKey != "totals") {
                        this.data[stateKey] = response.data.current_page
                            ? response.data.data
                            : response.data;
                    } else {
                        this.totals = response.data;
                    }
                } else {
                    throw new Error(stateKey + " url not found in state urls");
                }
            } catch (error) {
                const summary = `Error while fetching ${stateKey}`;

                console.error(summary, error);

                this.data[stateKey] = [];

                if (toast) {
                    toast.add({
                        severity: "error",
                        summary: summary,
                        detail: error.response?.data?.msg || error.message,
                    });
                }
            } finally {
                this.loadings[stateKey] = false; // Indiquer que le chargement est terminé
            }
        },

        fetchTotals() {
            return this.fetchData("totals");
        },

        fetchUsers(toast) {
            return this.fetchData("users", toast);
        },

        fetchAdmins(toast) {
            return this.fetchData("admins", toast);
        },

        fetchRolesPerms(toast, url = null) {
            return this.fetchData("roles_perms", toast, url);
        },

        fetchTransactions(toast) {
            return this.fetchData("transactions", toast);
        },

        fetchDeals(toast) {
            return this.fetchData("deals", toast);
        },

        async fetchCurrentUser(id, withDeals = false, withTransactions = false) {
            if (!id) return;

            const toast = showLoadingToast({
                duration: 0,
                forbidClick: true,
                message: "Fetching user info. Please wait...",
            });

            try {
                const response = await axios.get(route("user.show", id));

                this.currentUser = response.data;

                if (withDeals) {
                    const response = await axios.get(route("user.deals", id));
                    this.currentUser.deals = response.data;
                }

                if (withTransactions) {
                    const response = await axios.get(route("user.transactions", id));
                    this.currentUser.transactions = response.data;
                }
            } catch (error) {
                var msg = "Error while fetching current user";

                showFailToast(msg);
                console.error(msg, error);

                this.currentUser = null;
            } finally {
                toast.close();
            }
        },

        async deleteData(table, id, confirmationDialog, toast = null) {
            this.deletion = null;

            confirmationDialog.require({
                group: "confirmDelete",
                message:
                    "Are you sure you want to delete this " +
                    table +
                    " (id: " +
                    id +
                    ")?",
                header: "Confirm Deletion",
                icon: "pi pi-info-circle",
                rejectLabel: "Cancel",
                rejectProps: {
                    label: "Cancel",
                    severity: "secondary",
                    outlined: true,
                },
                acceptProps: {
                    label: "Delete",
                    severity: "danger",
                },
                accept: async () => {
                    const result = await deleteNow(table, id);

                    if (toast) {
                        toast.add({
                            severity: result.ok ? "success" : "error",
                            detail: result.msg,
                            summary: "Data deletion results",
                            life: 3000,
                        });

                        router.reload();
                    } else {
                        showToast({
                            message: result.msg,
                            type: result.ok ? "success" : "danger",
                        });
                    }

                    this.deletion = result.ok;
                },

                reject: () => {
                    this.deletion = null;
                },
            });
        },
    },
});

async function deleteNow(table, id) {
    try {
        const res = await axios.delete(
            route(page.props.routePrefix + "delete-data", { table, id })
        );
        return {
            ok: true,
            msg: res.data.msg,
        };
    } catch (error) {
        console.log("Error while deleting data", error);
        return {
            ok: false,
            msg: error.response?.data?.msg || error.message,
        };
    }
}

// Gestion du HMR (Hot Module Replacement)
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot));
}
