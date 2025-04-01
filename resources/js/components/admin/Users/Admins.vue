<style>
.p-dialog-content {
    padding-top: 5px;
}
</style>
<template>
    <div class="">
        <ConfirmsPassword @confirmed="passwordConfirmed = true">
            <Button type="button" severity="contrast" icon="pi pi-lock" label="Manage Admins" size="small"
                :disabled="!can" @click="toggle" />
        </ConfirmsPassword>

        <Popover ref="op">
            <ProgressSpinner v-if="!passwordConfirmed" />
            <div v-else class="max-w-2xl">
                <div>
                    <span class="font-medium block mb-2">Here is the admins list</span>
                    <Select v-model="selectedAdmin" :options="admins" optionLabel="call_name"
                        placeholder="Select an admin" fluid checkmark :highlightOnSelect="true" filter
                        :filter-fields="['call_name', 'email']">
                        <template #option="slotProps">
                            <div class="flex justify-between gap-2">
                                <span>{{
                                    slotProps.option.call_name + " :"
                                }}</span>
                                <span class="text-sky-500">{{
                                    slotProps.option.email
                                }}</span>
                            </div>
                        </template>
                        <template #dropdownicon>
                            <i class="pi pi-users" />
                        </template>
                    </Select>
                </div>

                <div class="my-2" v-if="selectedAdmin">
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                        Role:
                        <Tag severity="secondary" v-for="(item, index) in selectedAdmin.roles" :key="item.name">{{
                            item.name }}</Tag>
                    </div>

                    <div class="flex flex-wrap items-center gap-2">
                        Permissions:
                        <Tag severity="secondary" v-for="(item, index) in selectedAdmin.permissions" :key="item.name">{{
                            item.name }}
                        </Tag>
                    </div>
                </div>

                <div class="flex flex-wrap justify-end gap-2 border-t pt-2">
                    <Button v-for="(item, index) in actionButtons" :key="index" :severity="item.severity || 'secondary'"
                        :label="item.label" :icon="item.icon" size="small" :disabled="!selectedAdmin"
                        @click="next(item.action)" />
                </div>
            </div>
        </Popover>

        <Dialog v-model:visible="showDialog" maximizable modal :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <h3 class="text-lg font-medium text-sky-900 dark:text-sky-700">
                    Edit {{ form.section }}:
                    <span class="underline text-sky-600 dark:text-sky-500">{{
                        selectedAdmin.call_name
                    }}</span>
                    ({{ selectedAdmin.email }})
                </h3>
            </template>

            <!-- Roles -->
            <PickList v-if="form.section == 'roles'" v-model="rolesList" dataKey="id" breakpoint="1400px"
                :show-source-controls="false" :show-target-controls="false">
                <template #sourceheader>
                    <div class="bg-gray-100 p-2 font-bold">
                        Non Attributed Roles
                    </div>
                </template>
                <template #targetheader>
                    <div class="bg-gray-100 p-2 font-bold">
                        Attributed Roles
                    </div>
                </template>

                <template #option="{ option }">
                    <Tag :value="option.name" severity="secondary" />
                </template>
            </PickList>

            <!-- Permissions -->
            <PickList v-if="form.section == 'permissions'" v-model="permsList" dataKey="id" breakpoint="1400px"
                :show-source-controls="false" :show-target-controls="false">
                <template #sourceheader>
                    <div class="bg-gray-100 p-2 font-bold">
                        Non Attributed Permissions
                    </div>
                </template>
                <template #targetheader>
                    <div class="bg-gray-100 p-2 font-bold">
                        Attributed Permissions
                    </div>
                </template>

                <template #option="{ option }">
                    <Tag :value="option.name" severity="secondary" />
                </template>
            </PickList>

            <!-- Password -->
            <div v-if="form.section == 'password'" class="md:flex justify-around gap-4">
                <FloatLabel variant="on" class="mb-4 md:w-1/2">
                    <Password id="password" v-model="form.password" toggleMask fluid />
                    <label for="password">New Password</label>
                </FloatLabel>

                <FloatLabel variant="on" class="mb-4 md:w-1/2">
                    <Password fluid id="password_confirmation" v-model="form.password_confirmation" toggleMask />
                    <label for="password_confirmation">Confirm New Password</label>
                </FloatLabel>
            </div>

            <div v-if="form.section == 'delete'">
                <Message severity="error" icon="pi pi-exclamation-triangle">
                    Are you sure you want to delete this admin?</Message>
            </div>

            <div class="flex justify-center mt-5">
                <Button label="Confirm" class="w-2/3" :loading="form.processing" @click="submit" />
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { usePage, useForm } from "@inertiajs/vue3";
import { ref, onBeforeMount, watch } from "vue";
import { useAdminStore } from "@/stores/admin";
import { useToast } from "primevue/usetoast";
import ConfirmsPassword from "@/components/admin/ConfirmsPassword.vue";

defineProps(['can', 'admins']);

const page = usePage();
const toast = useToast();
const adminStore = useAdminStore();

const passwordConfirmed = ref(false);
const op = ref();
const actionButtons = [
    {
        label: "Roles",
        severity: "help",
        icon: "pi pi-users",
        action: "roles",
    },
    // {
    //     label: "Permissions",
    //     severity: "help",
    //     icon: "pi pi-users",
    //     action: "permissions",
    // },
    {
        label: "Password",
        icon: "pi pi-key",
        severity: "contrast",
        action: "password",
    },
    {
        label: "Delete",
        icon: "pi pi-trash",
        severity: "danger",
        action: "delete",
    },
];

const selectedAdmin = ref(null);

const rolesList = ref(null);
const permsList = ref(null);

watch(
    () => rolesList.value?.[1],
    (newRoles, oldRoles) => {
        if (newRoles?.length > 1) {
            // Récupérer le dernier rôle sélectionné
            const lastSelectedRole = newRoles[newRoles.length - 1];

            // Ajouter tous les anciens rôles sélectionnés dans la liste des rôles disponibles
            rolesList.value[0] = [
                ...rolesList.value[0],  // Garder les anciens rôles disponibles
                ...newRoles.slice(0, -1) // Remettre les anciens rôles sélectionnés dans les rôles disponibles
            ];

            // Supprimer les doublons dans rolesList.value[0] (au cas où)
            rolesList.value[0] = rolesList.value[0].filter(
                (role, index, self) => self.findIndex(r => r.id === role.id) === index
            );

            // Mettre à jour rolesList.value[1] avec uniquement le dernier rôle sélectionné
            rolesList.value[1] = [lastSelectedRole];
        }
    },
    { deep: true }
);

const showDialog = ref(false);

const form = useForm({
    section: null,
    password: null,
    password_confirmation: null,
});

const toggle = (event) => op.value?.toggle(event);

onBeforeMount(async () => {
    // await adminStore.fetchAdmins(toast);
    await adminStore.fetchRolesPerms(toast);
});

const submit = () => {
    var newFormData = {};
    var url = null;

    if (form.section == "roles") {
        if (rolesList.value && rolesList.value[1]) {
            newFormData = {
                roles: rolesList.value[1].map((role) => role.name),
            };
        }
        url = route(
            page.props.routePrefix + "roles-perms.update",
            selectedAdmin.value.email
        );
    }

    if (form.section == "permissions") {
        newFormData = {
            permissions: permsList.value[1].map((perm) => perm.name),
        };
        url = route(
            page.props.routePrefix + "roles-perms.update",
            selectedAdmin.value.email
        );
    }

    if (form.section == "password") {
        url = route("user.password.update", selectedAdmin.value.id);
    }

    if (form.section == "delete") {
        url = route("user.destroy", selectedAdmin.value.id);
    }

    form.transform((data) => ({
        ...data,
        ...newFormData,
        _method: form.section == "delete" ? "DELETE" : "PUT",
    }));

    if (!url) {
        return;
    }

    form.post(url, {
        onSuccess: (page) => {
            toast.add({
                severity: "success",
                summary:
                    "Action performed successfully for " +
                    selectedAdmin.value.call_name,
                detail:
                    page.props.flash.status ||
                    "The " + form.section + " has/have been upated",
                life: 5000,
            });
        },
        onFinish: async () => {
            form.reset();
            showDialog.value = false;

            selectedAdmin.value = null;
            rolesList.value = null;
            permsList.value = null;
            // await adminStore.fetchRolesPerms(toast);
        },
    });
};

function next(paramAction) {
    if (paramAction === "roles") {
        const unselectedRoles = adminStore
            .getData("roles")
            .filter(
                (role) =>
                    !selectedAdmin.value.roles?.some((r) => r.id === role.id)
            );
        rolesList.value = [unselectedRoles, selectedAdmin.value.roles];
    }

    if (paramAction === "permissions") {
        const unselectedPerms = adminStore
            .getData("perms")
            .filter(
                (perm) =>
                    !selectedAdmin.value.permissions?.some(
                        (p) => p.id === perm.id
                    )
            );
        permsList.value = [unselectedPerms, selectedAdmin.value.permissions];
    }

    if (paramAction === "password") {
    }

    if (paramAction === "delete") {
    }

    form.section = paramAction;
    showDialog.value = true;
}

</script>
