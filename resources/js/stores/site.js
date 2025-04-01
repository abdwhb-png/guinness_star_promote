import { defineStore } from "pinia";
import { usePage } from "@inertiajs/vue3";
import { queryOptions } from "@tanstack/vue-query";
import { parseStatuses } from "@/utils/dataTable";

const page = usePage();

function fetch(url) {
    return axios
        .get(url)
        .then((response) => response.data)
        .catch((err) => console.error("Error while fetching " + id, err));
}

export const useSiteStore = defineStore("siteStore", {
    state: () => ({
        showHelpCenter: false,
        showTCS: false,
        defaultCoin: "USDT-TRC20",
        languages: [],
        memberships: [],
        urls: {
            languages: route("config", "languages"),
            memberships: route("memberships"),
            config: route("config"),
            deals: route("deal.index", { limit: 30, per_page: 10 }),
        },
        config: page.props.config,
    }),

    getters: {
        getQueryOptions: (state) => (id) => {
            const url = state.urls[id];

            return queryOptions({
                queryKey: ["siteStore", id],
                queryFn: () => fetch(url),
            });
        },

        getStatuses: (state) => (key) => {
            try {
                return state.config.statuses[key];
            } catch (error) {
                return [];
            }
        },

        getParsedStatuses: (state) => (key) => {
            try {
                return parseStatuses(state.config.statuses[key]);
            } catch (error) {
                return [];
            }
        },
    },

    actions: {
        setDefaultCoin(coin) {
            this.defaultCoin = coin;
        },

        updateLanguages(languages) {
            this.languages = languages;
        },
    },
});
