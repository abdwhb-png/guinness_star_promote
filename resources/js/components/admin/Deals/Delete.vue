<style>
.p-dialog-content {
    padding-top: 5px;
}
</style>
<template>
    <ConfirmDialog group="deleteDeals" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    </ConfirmDialog>
    <ConfirmsPassword @confirmed="passwordConfirmed = true">
        <Button type="button" icon="pi pi-trash" label="Delete Deals" size="small" severity="danger"
            :loading="form.processing" :disabled="!can" @click="toggle" />
    </ConfirmsPassword>

    <Popover ref="op">
        <ProgressSpinner v-if="!passwordConfirmed" />
        <div v-else class="min-w-[350px] max-w-full">
            <div>
                <span class="font-medium block mb-2">Select Period</span>
                <DatePicker v-model="dates" showIcon iconDisplay="input" showTime fluid selectionMode="range"
                    :manualInput="false" />
            </div>

            <div class="flex flex-wrap justify-end gap-2 border-t pt-2">
                <Button label="Continue" icon="pi pi-arrow-right" size="small" :disabled="dates?.length < 2"
                    @click="confirmAction" />
            </div>
        </div>
    </Popover>
</template>

<script setup>
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmsPassword from "@/components/admin/ConfirmsPassword.vue";
import dayjs from "dayjs";

defineProps({
    can: {
        type: Boolean,
        default: false
    }
});

const toast = useToast();
const confirm = useConfirm();

const passwordConfirmed = ref(false);
const op = ref();

const dates = ref([]);

const form = useForm({
    start_date: null,
    end_date: null,
});

const toggle = (event) => {
    op.value.toggle(event);
};

function confirmAction() {
    confirm.require({
        group: `deleteDeals`,
        message:
            "Do you want to delete the deals from " +
            dates?.value[0] +
            " to " +
            dates?.value[1] +
            " ?",
        header: "Danger Zone",
        icon: "pi pi-info-circle",
        rejectLabel: "Cancel",
        rejectProps: {
            label: "Cancel",
            severity: "secondary",
            outlined: true,
        },
        acceptProps: {
            label: "Delete",
            severity: "danger",
        },
        accept: () => {
            submit();
        },
    });
}

const submit = () => {
    const url = route("admin.deals.delete");

    form.transform((data) => ({
        start_date: dayjs(dates.value[0]).format("YYYY-MM-DD HH:mm:ss"),
        end_date: dayjs(dates.value[1]).format("YYYY-MM-DD HH:mm:ss"),
    })).delete(url, {
        onSuccess: (page) => {
            toast.add({
                severity: "success",
                summary: "Action performed successfully",
                detail:
                    page.props.flash.status ||
                    "The deals have been deleted",
                life: 5000,
            });
        },
        onFinish: async () => {
            form.reset();
        },
    });
};
</script>
