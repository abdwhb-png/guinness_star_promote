<script setup>
import { usePage, useForm } from "@inertiajs/vue3";

const emits = defineEmits(["sended"]);
const props = defineProps({
    user: {
        type: Object,
        default: null,
    },
});

const memberships = usePage().props.config.memberships;
const { deposit, profit, currency, can_work, max_deals, credit_score, membership_id, profit_ratio } = props.user.account;

const form = useForm({
    // membership_id,
    deposit,
    profit,
    currency,
    profit_ratio,
    max_deals,
    can_work,
    credit_score,
});

const yesNo = [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }];

const send = () => {
    form.transform((data) => {
        return {
            section: "account",
            ...data,
        };
    });
    emits("sended", form);
};
</script>

<template>
    <div class="md:flex flex-wrap gap-2" v-if="user">
        <FloatLabel variant="on" class="mb-4 grow" v-if="form.membership_id">
            <Select id="membership_id" v-model="form.membership_id" :options="memberships" optionLabel="levelName"
                optionValue="id" fluid />

            <label for="membership_id" class="uppercase"> membership </label>
        </FloatLabel>
        <template v-for="(item, index) in form.data()" :key="index">
            <FloatLabel variant="on" class="mb-4" v-if="index != 'membership_id'">
                <Select v-if="index == 'can_work'" :options="yesNo" option-label="label" option-value="value"
                    v-model="form.can_work" fluid />
                <InputNumber v-else-if="index == 'profit_ratio'" :min="0" :minFractionDigits="2" prefix="% "
                    v-model="form.profit_ratio" fluid />
                <InputText v-else v-model="form[index]" :id="index" :disabled="index == 'profit'" fluid />

                <label :for="index" class="uppercase">
                    {{ index.replace("_", " ") }}
                </label>
            </FloatLabel>
        </template>
    </div>

    <div class="flex justify-end">
        <Button label="Save" icon="pi pi-save" size="small" :loading="form.processing" @click="send" />
    </div>
</template>
