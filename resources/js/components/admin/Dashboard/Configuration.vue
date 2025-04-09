<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const page = usePage();
const toast = useToast();

const props = defineProps({
    datas: Object,
});

const yesNo = [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }];
const currency = (props.datas.base_currency || 'FCFA') + ' ';
const form = useForm(props.datas);

const submit = () => {
    form.put(route(page.props.routePrefix + "setting.update", props.datas.id), {
        preserveScroll: true,
        onSuccess: (page) => {
            toast.add({
                severity: "success",
                summary: page.props.flash.status,
                life: 5000,
            });
        },
    });
};
</script>

<template>
    <div class="grid grid-cols-3 gap-4 mx-3">
        <div class=""></div>
        <div class="col-span-3">
            <div class="md:flex flex-wrap gap-3">
                <div class="mb-4">
                    <h5 class="fw-bold">Base currency</h5>
                    <InputText v-model="form.base_currency" fluid />
                </div>
                <div class="mb-4">
                    <h5 class="fw-bold">Base profit ratio</h5>
                    <InputNumber :min="0" :minFractionDigits="2" prefix="% " v-model="form.profit_ratio" fluid />
                </div>
                <div class="mb-4">
                    <h5 class="fw-bold">Minimum balance</h5>
                    <InputNumber :min="0" :minFractionDigits="2" :prefix="currency" v-model="form.min_balance" fluid />
                </div>
                <div class="mb-4">
                    <h5 class="fw-bold">Base Daily Deals</h5>
                    <InputNumber :min="1" v-model="form.max_deals" fluid />
                </div>
                <div class="mb-4">
                    <h5 class="fw-bold">Enable Welcome bonus ?</h5>
                    <Select :options="yesNo" option-label="label" option-value="value"
                        v-model="form.enable_welcome_bonus" fluid />
                </div>
                <div class="mb-4">
                    <h5 class="fw-bold">Welcome bonus</h5>
                    <InputNumber :min="0" :minFractionDigits="2" :prefix="currency" locale="en-US"
                        v-model="form.welcome_bonus" fluid />
                </div>
                <div class="mb-4">
                    <h5 class="fw-bold">Enable referal bonus ?</h5>
                    <Select :options="yesNo" option-label="label" option-value="value"
                        v-model="form.enable_referal_bonus" fluid />
                </div>
                <div class="mb-4">
                    <h5 class="fw-bold">Referal bonus</h5>
                    <InputNumber :min="0" :minFractionDigits="2" :prefix="currency" locale="en-US"
                        v-model="form.referal_bonus" fluid />
                </div>
                <div class="mb-4 hidden">
                    <h5 class="fw-bold">Max profit on trial</h5>
                    <InputNumber :min="0" :minFractionDigits="2" :prefix="currency" v-model="form.profit_max_on_first"
                        fluid />
                </div>
                <div class="mb-4">
                    <h5 class="fw-bold">Enable telegram notif ?</h5>
                    <Select :options="yesNo" option-label="label" option-value="value" v-model="form.telegram" fluid />
                </div>
            </div>
            <div class="mb-4">
                <h5 class="fw-bold">Announcement</h5>
                <InputText v-model="form.announcement" fluid />
            </div>

            <div class="flex justify-center">
                <Button label="Update" :loading="form.processing" @click="submit" icon="pi pi-check" type="button"
                    class="w-2/3" />
            </div>
        </div>
    </div>
</template>
