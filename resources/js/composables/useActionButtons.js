import { usePage, router } from "@inertiajs/vue3";
import { useToast } from "primevue";

export function useActionButtons(emits, loading, USERNAME = ""){
    const page = usePage();
    const toast = useToast();

    const userConfirmParams = (type, id) => {
        switch (type) {
            case "Delete":
                return {
                    accept: () => {
                        router.post(
                            route("user.destroy", id),
                            { _method: "DELETE" },
                            {
                                preserveScroll: true,
                                onSuccess: (page) => {
                                    toast.add({
                                        severity: "success",
                                        detail: USERNAME + " has been deleted",
                                        summary: page.props.flash.status,
                                        life: 1000 * 5,
                                    });
    
                                    emits("refresh");
                                    emits("deleted");
                                },
                                onFinish: () => {
                                    loading.value = false;
                                },
                            }
                        );
                    },
                    reject: () => {},
                };
            case "GrantDeals":
                return {
                    accept: () => {
                        router.post(
                            route(`${page.props.routePrefix}reset-deals`, id),
                            {},
                            {
                                preserveScroll: true,
                                onSuccess: (page) => {
                                    toast.add({
                                        severity: "success",
                                        summary: "Deals reseted for " + USERNAME,
                                        detail: page.props.flash.status,
                                        life: 1000 * 5,
                                    });
                                    emits("refresh");
                                    emits("dealsReseted");
                                },
                                onFinish: () => {
                                    loading.value = false;
                                },
                            }
                        );
                    },
                    reject: () => {},
                };
            case "Defroze":
                return {
                    accept: () => {
                        router.post(
                            route(`${page.props.routePrefix}defroze`, id),
                            {},
                            {
                                preserveScroll: true,
                                preserveState: true,
                                onSuccess: (page) => {
                                    toast.add({
                                        severity: "success",
                                        summary: "User defrozed",
                                        detail: page.props.flash.status,
                                        life: 1000 * 5,
                                    });
    
                                    emits("refresh");
                                    emits("defrozed");
                                },
                                onFinish: () => {
                                    loading.value = false;
                                },
                            }
                        );
                    },
                    reject: () => {},
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