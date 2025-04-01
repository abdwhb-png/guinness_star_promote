import { defineStore, acceptHMRUpdate } from "pinia";
import { usePage } from "@inertiajs/vue3";
import axios from "axios";
import dayjs from "dayjs";
import { reactive } from "vue";
import {
    showLoadingToast,
    showFailToast,
    showSuccessToast,
    showToast,
    showNotify,
} from "vant";
import { formatNotification } from "@/utils/helpers";
import { isValidUrl } from "@/utils";

const page = usePage();

const createEntityState = (entities) => {
    const state = {};
    const loadingState = {};

    entities.forEach((entity) => {
        if (entity == "user") {
            state[entity] = page.props.auth?.user || [];
        } else if (entity == "notifications") {
            state[entity] = {
                unread: [],
                readed: [],
            };
        } else {
            state[entity] = [];
        }

        loadingState[entity] = false;
    });

    return { data: reactive(state), loadings: reactive(loadingState) };
};

export const useUserStore = defineStore("userStore", {
    state: () => ({
        ...createEntityState(["user", "sessions", "notifications"]),
        unreadCount: 0,
        showAccount: false,
    }),

    getters: {
        loading: (state) => (key) => state.loadings[key],

        getData: (state) => (key) => {
            if (["transactions", "deals"].includes(key)) {
                return state.data.user[key];
            }

            if (["unread", "readed"].includes(key)) {
                return state.data.notifications[key];
            }

            return state.data.user;
        },

        getUnreadNotifications: (state) => () => {
            return state.data.notifications.unread?.length || 0;
        },

        hasNotifications: (state) =>
            !!state.data.notifications.unread?.length ||
            !!state.data.notifications.readed?.length,

        getNotifications:
            (state) =>
            (status = null) => {
                const data = state.data.notifications;
                const notifications = [];

                if (data.unread) {
                    state.unreadCount = data.unread?.length || 0;

                    Object.values(data.unread).forEach((notif) => {
                        notifications.push(formatNotification(notif));
                    });
                }

                if (data.readed) {
                    Object.values(data.readed).forEach((notif) => {
                        notifications.push(formatNotification(notif));
                    });
                }

                return notifications;
            },
    },

    actions: {
        async fetch(endpoint, stateKey, toast = null) {
            this.loadings[stateKey] = true;

            const url = isValidUrl(endpoint) ? endpoint : route(endpoint);

            var loadingToast = null;

            if (stateKey != "user") {
                loadingToast = showLoadingToast({
                    duration: 0,
                    forbidClick: true,
                    message: `${stateKey.toUpperCase()} ...`,
                });
            }

            try {
                const response = await axios.get(url);
                this.data[stateKey] = response.data;
            } catch (error) {
                const summary = `Error while fetching ${stateKey}`;
                console.error(summary, error);

                this.data[stateKey] = stateKey = "notifications"
                    ? ["unread", "readed"]
                    : [];

                if (toast) {
                    toast.add({
                        severity: "error",
                        summary: summary,
                        detail: error.response?.data?.msg || error.message,
                    });
                }
            } finally {
                if (loadingToast) {
                    loadingToast.close();
                }
                this.loadings[stateKey] = false; // Indiquer que le chargement est terminé
            }
        },

        async fetchUser(id = 0) {
            return await this.fetch(route("user.show", id), "user").then(() => {
                // this.unreadCount = this.getData("user").unreadNotifications;
            });
        },

        fetchSessions() {
            return this.fetch("user.sessions", "sessions");
        },

        async fetchNotifications() {
            return await this.fetch("notification.index", "notifications");
        },

        async readNotifications() {
            if (this.getUnreadNotifications === 0) return;

            const toast = showLoadingToast({
                duration: 0,
                forbidClick: true,
                message: "Marking all notifications as readed...",
            });

            axios
                .patch(route("notifications.read"))
                .then(() => {
                    this.fetchNotifications();
                })
                .finally(() => {
                    toast.close();
                    if (this.getUnreadNotifications === 0) {
                        showSuccessToast({
                            message: "Notifications marked as readed",
                            duration: 500,
                        });
                    }
                });
        },

        async readNotification(id) {
            if (this.getUnreadNotifications === 0) return;

            axios.put(route("notification.update", id)).then(() => {
                const notification = this.data.notifications.unread.find(
                    (item) => item.id === id
                );

                if (notification) {
                    var date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

                    const newNotification = {
                        ...notification,
                        read_at: date,
                        updated_at: date,
                    };

                    this.data.notifications = {
                        ...this.data.notifications,
                        unread: this.data.notifications.unread.filter(
                            (item) => item.id !== id
                        ),
                        readed: [
                            newNotification,
                            ...this.data.notifications.readed,
                        ],
                    };
                }

                this.unreadCount--;

                showToast("Readed");
            });
        },

        async deleteNotifications() {
            if (!this.hasNotifications) return;

            const toast = showLoadingToast({
                duration: 0,
                forbidClick: true,
                message: "Deleting all notifications...",
            });

            axios
                .delete(route("notifications.delete"))
                .then(() => {
                    this.data.notifications = {
                        unread: [],
                        readed: [],
                    };
                })
                .finally(() => {
                    toast.close();

                    if (this.getUnreadNotifications === 0) {
                        showSuccessToast({
                            message: "Notifications deleted",
                            duration: 500,
                        });
                    }
                });
        },

        async setMailNotif() {
            axios.put(route("user.mail-notif")).then(() => {
                this.fetchUser();
            });
        },

        async toggleDealFavourite(item) {
            axios
                .post(route("deal.like", item.id), {
                    status: item.isLiked ? "unlike" : "like",
                })
                .then((response) => {
                    item.isLiked = !item.isLiked;

                    var text = item.isLiked
                        ? "added to favourites"
                        : "removed from favourites";

                    showNotify({
                        type: "primary",
                        background: item.isLiked ? "#000" : "#fff",
                        color: item.isLiked ? "#fff" : "#ad0000",
                        message: item.category + " has been " + text,
                    });

                    // return item.isLiked;
                });
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
