<template>
    <div>
        <Button label="Create User" icon="pi pi-plus" size="small" @click="dialogVisible = true" />

        <Dialog v-model:visible="dialogVisible" modal header="New User" :style="{ width: '450px' }">
            <form @submit.prevent="submit">
                <div class="mb-4 flex flex-col space-y-4">
                    <FloatLabel id="username" variant="on">
                        <InputText v-model="form.username" required fluid />
                        <label for="username">Username</label>
                    </FloatLabel>

                    <FloatLabel id="phone" variant="on">
                        <InputText fluid v-model="form.phone" />
                        <label for="phone">Phone Number</label>
                    </FloatLabel>

                    <FloatLabel id="password" variant="on">
                        <Password fluid v-model="form.password" toggleMask required />
                        <label for="password">Password</label>
                    </FloatLabel>

                    <FloatLabel id="password_confirmation" variant="on">
                        <Password v-model="form.password_confirmation" toggleMask required fluid />
                        <label for="password_confirmation">Confirm Password</label>
                    </FloatLabel>

                    <FloatLabel id="role" variant="on">
                        <Select :options="roles" v-model="form.role" fluid />
                        <label for="role">Role</label>
                    </FloatLabel>
                </div>

                <div class="flex justify-end gap-2">
                    <Button label="Cancel" severity="secondary" icon="pi pi-times" class="p-button-text" @click="dialogVisible = false" />
                    <Button label="Save" icon="pi pi-check" type="submit" :loading="form.processing" @click="submit" />
                </div>
            </form>
        </Dialog>
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

defineProps({
    roles: Array,
});

const dialogVisible = ref(false);

const toast = useToast();

const form = useForm({
    username: null,
    phone: null,
    password: null,
    password_confirmation: null,
    role: null,
});

const submit = () => {
    form.post(route('user.store'), {
        onSuccess: (page) => {
            form.reset();
            toast.add({
                severity: 'success',
                summary: page.props.flash?.success || 'User created successfully.',
                life: 5000,
            });
            dialogVisible.value = false;
        },
    });
};
</script>
