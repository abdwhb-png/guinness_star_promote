<script setup>
import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    user: Object,
});

const page = usePage();
const toast = useToast();
const transacPopover = ref(null);
const visible = ref(false);

const form = useForm({
    amount: '',
    type: '',
    user_id: props.user.id,
});

const newTransac = (type) => {
    transacPopover.value.hide();
    form.type = type;
    visible.value = true;
}

const submit = () => {
    form.post(route(page.props.routePrefix + 'transactions.store', { user: props.user.id }), {
        onSuccess: (page) => {
            toast.add({ severity: 'success', summary: page.props.flash.success, life: 3000 });
            visible.value = false;
        },
        onFinish: () => {
            form.reset();
        }
    });
}
</script>

<template>
    <Button label="New Transac." icon="pi pi-plus" size="small" outlined @click="transacPopover.toggle($event)" />

    <Popover ref="transacPopover">
        <div class="flex flex-col gap-4">
            <div>
                <span class="font-medium block mb-2">New Transaction</span>
                <ul class="list-none p-0 m-0 flex flex-col">
                    <li class="px-2 py-3 hover:bg-blue-50 text-blue-500 cursor-pointer rounded-border"
                        @click="newTransac('recharge')">
                        <i class="pi pi-plus"></i>
                        Recharge
                    </li>
                    <li class="px-2 py-3 hover:bg-red-50 text-red-500 cursor-pointer rounded-border"
                        @click="newTransac('withdrawal')">
                        <i class="pi pi-minus"></i>
                        Withdrawal
                    </li>
                </ul>
            </div>
        </div>
    </Popover>

    <Dialog v-model:visible="visible" :header="capitalizeFirstLetter(form.type) + ' Transaction'" :modal="true"
        :style="{ width: '50vw' }">
        <form @submit.prevent="submit">
            <div class="flex justify-between gap-2">
                <InputNumber v-model="form.amount" placeholder="Amount" class="grow" fluid />
                <Button label="Submit" type="submit" :loading="form.processing" />
            </div>
        </form>
    </Dialog>
</template>