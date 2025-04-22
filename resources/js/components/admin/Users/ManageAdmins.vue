<style>
.p-dialog-content {
    padding-top: 5px;
}
</style>
<template>
    <div class="">
        <ConfirmsPassword @confirmed="passwordConfirmed = true">
            <Button type="button" severity="contrast" icon="pi pi-lock" label="Manage Admins" size="small" :disabled="!can" @click="toggle" />
        </ConfirmsPassword>

        <Popover ref="popoverRef">
            <ProgressSpinner v-if="!passwordConfirmed" />
            <div v-else class="max-w-96">
                <div>
                    <span class="mb-2 block font-medium">Here is the admins list</span>
                    <Select
                        v-model="selectedAdmin"
                        :options="admins"
                        optionLabel="call_name"
                        placeholder="Select an admin"
                        fluid
                        checkmark
                        :highlightOnSelect="true"
                        filter
                        :filter-fields="['call_name', 'email']"
                    >
                        <template #option="slotProps">
                            <div class="flex justify-between gap-2">
                                <span>{{ slotProps.option.call_name }}</span>
                                <span class="text-sky-500">{{ slotProps.option.email ? ' :' + slotProps.option.email : '' }}</span>
                            </div>
                        </template>
                        <template #dropdownicon>
                            <i class="pi pi-users" />
                        </template>
                    </Select>
                </div>

                <div class="my-2" v-if="selectedAdmin">
                    <div class="mb-2 flex flex-wrap items-center gap-2">
                        Role:
                        <Tag severity="secondary" v-for="(item, index) in selectedAdmin.roles" :key="item.name">{{ item.name }}</Tag>
                    </div>

                    <div class="flex flex-wrap items-center gap-2">
                        Permissions:
                        <Tag severity="secondary" v-for="(item, index) in selectedAdmin.permissions" :key="item.name">{{ item.name }} </Tag>
                    </div>
                </div>

                <div class="flex flex-wrap justify-end gap-2 border-t pt-2">
                    <Button
                        v-for="(item, index) in actionButtons"
                        :key="index"
                        :severity="item.severity || 'secondary'"
                        :label="item.label"
                        :icon="item.icon"
                        size="small"
                        :disabled="!selectedAdmin"
                        @click="next(item.action)"
                    />
                </div>
            </div>
        </Popover>

        <Dialog v-model:visible="showDialog" maximizable modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <h3 class="text-lg font-medium text-sky-900 dark:text-sky-700">
                    Edit {{ form.section }}:
                    <span class="text-sky-600 underline dark:text-sky-500">{{ selectedAdmin.call_name }}</span>
                    ({{ selectedAdmin.email }})
                </h3>
            </template>

            <!-- Roles -->
            <PickList
                v-if="form.section == 'roles'"
                v-model="rolesList"
                dataKey="id"
                breakpoint="1400px"
                :show-source-controls="false"
                :show-target-controls="false"
            >
                <template #sourceheader>
                    <div class="bg-gray-100 p-2 font-bold">Non Attributed Roles</div>
                </template>
                <template #targetheader>
                    <div class="bg-gray-100 p-2 font-bold">Attributed Roles</div>
                </template>

                <template #option="{ option }">
                    <Tag :value="option.name" severity="secondary" />
                </template>
            </PickList>

            <!-- Permissions -->
            <PickList
                v-if="form.section == 'permissions'"
                v-model="permsList"
                dataKey="id"
                breakpoint="1400px"
                :show-source-controls="false"
                :show-target-controls="false"
            >
                <template #sourceheader>
                    <div class="bg-gray-100 p-2 font-bold">Non Attributed Permissions</div>
                </template>
                <template #targetheader>
                    <div class="bg-gray-100 p-2 font-bold">Attributed Permissions</div>
                </template>

                <template #option="{ option }">
                    <Tag :value="option.name" severity="secondary" />
                </template>
            </PickList>

            <!-- Password -->
            <div v-if="form.section == 'password'" class="justify-around gap-4 md:flex">
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
                <Message severity="error" icon="pi pi-exclamation-triangle"> Are you sure you want to delete this admin?</Message>
            </div>

            <div class="mt-5 flex justify-center">
                <Button label="Confirm" class="w-2/3" :loading="form.processing" @click="submit" />
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import ConfirmsPassword from '@/components/admin/ConfirmsPassword.vue';
import { useAdminStore } from '@/stores/admin';
import { useForm, usePage } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import { onBeforeMount, ref, watch } from 'vue';

defineProps(['can', 'admins']);

const page = usePage();
const toast = useToast();
const adminStore = useAdminStore();

const passwordConfirmed = ref(false);
const popoverRef = ref(); // More descriptive name for popover reference
const actionButtons = [
    {
        label: 'Roles',
        severity: 'help',
        icon: 'pi pi-users',
        action: 'roles',
    },
    // {
    //     label: 'Permissions',
    //     severity: 'help',
    //     icon: 'pi pi-lock',
    //     action: 'permissions',
    // },
    {
        label: 'Password',
        icon: 'pi pi-key',
        severity: 'contrast',
        action: 'password',
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        severity: 'danger',
        action: 'delete',
    },
];

const selectedAdmin = ref(null);
const showDialog = ref(false);
const rolesList = ref(null);
const permsList = ref(null);

const form = useForm({
    section: null,
    password: null,
    password_confirmation: null,
});

const toggle = (event) => popoverRef.value?.toggle(event);

onBeforeMount(async () => {
    await adminStore.fetchRolesPerms(toast);
});

watch(
    () => rolesList.value?.[1],
    (newRoles) => {
        if (newRoles?.length > 1) {
            // Get the last selected role
            const lastSelectedRole = newRoles[newRoles.length - 1];

            // Add all previously selected roles back to the available roles list
            rolesList.value[0] = [
                ...rolesList.value[0], // Keep existing available roles
                ...newRoles.slice(0, -1), // Move all but last selected role back to available
            ];

            // Remove duplicates from the available roles list
            rolesList.value[0] = rolesList.value[0].filter((role, index, self) => self.findIndex((r) => r.id === role.id) === index);

            // Update selected roles list with only the last selected role
            rolesList.value[1] = [lastSelectedRole];
        }
    },
    { deep: true },
);

const submit = () => {
    let formData = {};
    let targetUrl = null;

    // Build URL and form data based on section
    switch (form.section) {
        case 'roles':
            if (rolesList.value && rolesList.value[1]) {
                formData = {
                    roles: rolesList.value[1].map((role) => role.name),
                };
            }
            targetUrl = route(page.props.routePrefix + 'roles-perms.update', selectedAdmin.value.id);
            break;

        case 'permissions':
            formData = {
                permissions: permsList.value[1].map((perm) => perm.name),
            };
            targetUrl = route(page.props.routePrefix + 'roles-perms.update', selectedAdmin.value.id);
            break;

        case 'password':
            formData = {
                type: 'login',
            };
            targetUrl = route('user.password.update', selectedAdmin.value.id);
            break;

        case 'delete':
            targetUrl = route('user.destroy', selectedAdmin.value.id);
            break;
    }

    form.transform((data) => ({
        ...data,
        ...formData,
        _method: form.section === 'delete' ? 'DELETE' : 'PUT',
    }));

    if (!targetUrl) {
        return;
    }

    form.post(targetUrl, {
        onSuccess: (page) => {
            toast.add({
                severity: 'success',
                summary: 'Action performed successfully for ' + selectedAdmin.value.call_name,
                detail: page.props.flash.status || 'The ' + form.section + ' has/have been updated',
                life: 5000,
            });
        },
        onError: (errors) => {
            // Add error handling
            const errorMessage = Object.values(errors).flat().join(', ');
            toast.add({
                severity: 'error',
                summary: 'Error updating ' + selectedAdmin.value.call_name,
                detail: errorMessage || 'An error occurred during the operation',
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
    if (paramAction === 'roles') {
        const unselectedRoles = adminStore.getData('roles')?.filter((role) => !selectedAdmin.value.roles?.some((r) => r.id === role.id));
        rolesList.value = [unselectedRoles, selectedAdmin.value.roles];
    }

    if (paramAction === 'permissions') {
        const unselectedPerms = adminStore.getData('perms')?.filter((perm) => !selectedAdmin.value.permissions?.some((p) => p.id === perm.id));
        permsList.value = [unselectedPerms, selectedAdmin.value.permissions];
    }

    if (paramAction === 'password') {
    }

    if (paramAction === 'delete') {
    }

    form.section = paramAction;
    showDialog.value = true;
}
</script>
