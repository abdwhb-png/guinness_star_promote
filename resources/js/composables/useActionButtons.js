import { usePage, router } from "@inertiajs/vue3";
import { useToast } from "primevue";


export function useActionButtons(emits, loading, USERNAME = ""){
    const page = usePage();
    const toast = useToast();

    const submit = (url, success, method = "POST", endFunction = () => {}) => {
        router.post(url,
            { _method: method },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    toast.add({
                        severity: "success",
                        detail: success,
                        summary: page.props.flash.status,
                        life: 1000 * 5,
                    });
                    emits("refresh");
                    endFunction();
                },
                onFinish: () => {
                    loading.value = false;
                },
            }
        );
    }

    const userConfirmParams = (type, id) => {
        switch (type) {
            case "Delete":
                return {
                    accept: () => {
                        submit(route("user.destroy", id), USERNAME + " has been deleted", "DELETE", () => emits("deleted"));
                    },
                };
            case "GrantDeals":
                return {
                    acceptProps: {
                        label: type,
                        severity: "info",
                    },
                    accept: () => {
                        submit(route(`${page.props.routePrefix}reset-deals`, id), "Deals reseted for " + USERNAME, "POST", () =>  emits("dealsReseted"));
                    },
                };
            case "RevokeDeals":
                return {
                    acceptProps: {
                        label: type,
                        severity: "danger",
                    },
                    accept: () => {
                        submit(route(`${page.props.routePrefix}revoke-deals`, id), "Deals revoked for " + USERNAME, "POST", () =>  emits("dealsRevoked"));
                    },
                };
            case "Defroze":
                return {
                    accept: () => {
                        submit(route(`${page.props.routePrefix}defroze`, id), USERNAME + " account has been defrozed", "POST", () => emits("defrozed"));
                    },
                };
    
            default:
                return {
                    accept: () => {
                        loading.value = false;
                        toast.add({
                            severity: "warn",
                            summary: "No action",
                            detail: "This action is not available",
                            life: 3000,
                        });
                    },
                    reject: () => {},
                };
        }
    };
    return {
        userConfirmParams
    }
}