import { createPinia } from 'pinia';
import { VueQueryPlugin } from "@tanstack/vue-query";

import Vant from 'vant';
import { Lazyload } from 'vant';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import {pt as DataTablePt} from '@/utils/dataTable';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import AnimateOnScroll from 'primevue/animateonscroll';

import { Head, Link } from "@inertiajs/vue3";
import { Button as UiButton } from '@/components/ui/button'
import InputError from '@/components/InputError.vue';
import ToastError from "@/components/shared/ValidationError.vue";
import CustomToolbar from "@/components/admin/CustomToolbar.vue";
import CustomDataTable from "@/components/admin/CustomDataTable.vue";
import BottomModal from "@/components/user/BottomModal.vue";
import RightModal from "@/components/user/RightModal.vue";
import GradBeams from "@/components/user/GradBeams.vue";

export default {
    appName: import.meta.env.VITE_APP_NAME || 'Laravel',

    initPinia(app) {
        const pinia = createPinia();
        app.use(pinia)
    },

    initVueQuery(app) {
        app.use(VueQueryPlugin)
    },

    initVant(app) {
        app.use(Vant)
        .use(Lazyload)
    },
    
    initPrimeVue(app) {
        const MyPreset = definePreset(Aura,{
            semantic: {
                primary: {
                    50: "{blue.50}",
                    100: "{blue.100}",
                    200: "{blue.200}",
                    300: "{blue.300}",
                    400: "{blue.400}",
                    500: "{blue.500}",
                    600: "{blue.600}",
                    700: "{blue.700}",
                    800: "{blue.800}",
                    900: "{blue.900}",
                    950: "{blue.950}",
                },
            },
        });

        app.use(PrimeVue, {
            theme: {
                preset: MyPreset,
                options: {
                    darkModeSelector: ".dark",
                },
            },
            ripple: true,
            pt: {
                dataTable: DataTablePt,
                editor: {
                    codeBlock: (props) => ({
                        style: "display: none",
                    }),
                },
                rating:{
                    onIcon:{
                        style: "color: rgb(255, 210, 30)"
                    },
                }
            },
        })
        .use(ToastService)
        .use(ConfirmationService)
        .directive("animateonscroll", AnimateOnScroll)
    },

    initComponents(app){
        app.component("Head", Head);
        app.component("Link", Link);
        app.component("UiButton", UiButton);
        app.component("InputError", InputError);
        app.component("ToastError", ToastError);
        app.component("CustomDataTable", CustomDataTable);
        app.component("CustomToolbar", CustomToolbar);
        app.component("BottomModal", BottomModal);
        app.component("RightModal", RightModal);
        app.component("GradBeams", GradBeams);
    }
}