<script setup>
import { usePage } from "@inertiajs/vue3";
import { ref, reactive, watch } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useAdminStore } from "@/stores/admin";
import { useActionButtons } from "@/composables/useActionButtons";
import { capitalizeFirstLetter } from "@/utils/helpers";

import ShowUser from "@/components/admin/Users/ShowUser.vue";
import EditUser from "@/components/admin/Users/EditUser.vue";
import CoLogs from "@/components/admin/Dashboard/CoLogs.vue";
import DealsList from "@/components/admin/Users/Deals/List.vue";
import ConfirmsPassword from "@/components/admin/ConfirmsPassword.vue";

const emits = defineEmits(["defrozed", "deleted", "dealsReseted", "refresh"]);

const props = defineProps({
    data: Object,
});

const page = usePage();

const CAN = ref(page.props.auth.user.isSuperAdmin);
const USERNAME = ref('');

const adminStore = useAdminStore();
const toast = useToast();
const confirm = useConfirm();
const loading = ref(false);
const buttonSize = ref("small");

const { userConfirmParams: confirmParams } = useActionButtons(emits, loading, USERNAME.value);
const userDialog = reactive({
    show: false,
    header: null,
    type: null,
    width: "50vw",
});

const selectUser = async (type, data) => {
    userDialog.header = `${capitalizeFirstLetter(
        type
    )} dialog for <span class="text-sky-600 dark:text-sky-500">${USERNAME.value}</span>`;

    if (type == "deals") {
        userDialog.width = "75vw";
    }

    await adminStore.fetchCurrentUser(data.id, type == "deals");

    userDialog.type = type;
    userDialog.show = true;
};

const onUserDialogHide = () => {
    userDialog.show = false;
    userDialog.width = "50vw";
    userDialog.type = null;
    userDialog.header = null;
    adminStore.setCurrentUser(null);
};

watch(() => props.data, () => {
    USERNAME.value = props.data.call_name.toUpperCase();
}, { immediate: true });

function confirmAction(id, type) {
    const confParams = confirmParams(type, id)
    const params = {
        group: `${USERNAME.value}_confirm${type}`,
        message: "Do you want to " + type + " " + USERNAME.value + " account?",
        header: type == "Delete" ? "Danger Zone" : "Confirmation",
        icon:
            type == "Delete" ? "pi pi-info-circle" : "pi pi-exclamation-circle",
        rejectLabel: "Cancel",
        rejectProps: {
            label: "Cancel",
            severity: "secondary",
            outlined: true,
        },
        acceptProps: {
            label: type,
            severity: type == "Delete" ? "danger" : "default",
        },
        ...confParams,
        accept: () => {
            loading.value = true;
            confParams.accept();
        },
    };

    confirm.require(params);
};
</script>

<template>
    <ConfirmDialog :group="`${USERNAME}_confirmDelete`"></ConfirmDialog>
    <ConfirmDialog :group="`${USERNAME}_confirmGrantDeals`"></ConfirmDialog>
    <ConfirmDialog :group="`${USERNAME}_confirmDefroze`"></ConfirmDialog>
    <ConfirmDialog :group="`${USERNAME}_confirmRevokeDeals`"></ConfirmDialog>

    <Dialog @hide="onUserDialogHide" v-model:visible="userDialog.show" modal maximizable :dismissable-mask="true"
        :style="{ width: userDialog.width || '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
            <h3 class="text-lg font-medium text-sky-900 dark:text-sky-700" v-html="userDialog.header"></h3>
        </template>

        <!-- show user -->
        <ShowUser v-if="userDialog.type == 'show'" />

        <!-- edit user -->
        <EditUser v-if="userDialog.type == 'edit'" />

        <!-- user deals -->
        <DealsList v-if="userDialog.type == 'deals'" />

        <!-- user coLogs -->
        <CoLogs v-if="userDialog.type == 'coLogs'" :search-text="USERNAME" />
    </Dialog>

    <!-- actions -->
    <div class="flex flex-wrap gap-3">
        <Button label="Show" :size="buttonSize" outlined raised severity="secondary" icon="pi pi-eye"
            @click="selectUser('show', props.data)" />

        <Button label="Edit" :size="buttonSize" severity="primary" icon="pi pi-pencil" :disabled="!CAN"
            @click="selectUser('edit', props.data)" />

        <Button label="Deals" icon="pi pi-th-large" severity="primary" outlined raised :size="buttonSize"
            :disabled="!CAN" @click="selectUser('deals', data)" />

        <ConfirmsPassword @confirmed="confirmAction(data.id, 'GrantDeals')">
            <Button type="button" :loading="loading" label="Grant/Reset Deals" icon="pi pi-th-large" severity="info"
                :size="buttonSize" :disabled="!CAN" />
        </ConfirmsPassword>

        <ConfirmsPassword @confirmed="confirmAction(data.id, 'RevokeDeals')">
            <Button type="button" :loading="loading" label="Revoke Deals" icon="pi pi-times" severity="danger" outlined
                :size="buttonSize" :disabled="!CAN" />
        </ConfirmsPassword>

        <Button v-if="data.isFrozed" type="button" :loading="loading" label="Defroze" severity="success" outlined raised
            icon="pi pi-check" :size="buttonSize" :disabled="!CAN" @click="confirmAction(data.id, 'Defroze')" />

        <Button @click="selectUser('coLogs', data)" label="Co. Logs" outlined severity="contrast" icon="pi pi-sign-in"
            :size="buttonSize" />

        <ConfirmsPassword @confirmed="confirmAction(data.id, 'Delete')">
            <Button type="button" :loading="loading" label="Delete" icon="pi pi-trash" :disabled="!CAN"
                severity="danger" :size="buttonSize" />
        </ConfirmsPassword>
    </div>
</template>
