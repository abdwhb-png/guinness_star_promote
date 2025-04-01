<style scoped>
.value-text {
    color: #4c7def;
}
</style>

<script setup>
import { usePage } from "@inertiajs/vue3";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const page = usePage();
const userStore = useUserStore();

const account = computed(() => userStore.getData("user").account);

const withCurrency = (amount) => {
    amount = amount || 0;
    return `${page.props.auth.user.account.currency} ${parseFloat(
        amount
    ).toFixed(2)}`;
};
</script>
<template>
    <div class="px-4 flex flex-col gap-3">
        <div class="p-4 rounded-xl border border-g30 bg-g20">
            <div class="flex justify-between items-center gap-3">
                <div class="flex justify-start items-center gap-3">
                    <i class="ph-thin text-xl ph-currency-dollar"></i>
                    <p class="text-sm font-medium">Account Balance</p>
                </div>

                <p class="value-text font-medium">
                    {{ withCurrency(account.balance) }}
                </p>
            </div>
        </div>

        <div class="p-4 rounded-xl border border-g30 bg-g20">
            <div class="flex justify-between items-center gap-3">
                <div class="flex justify-start items-center gap-3">
                    <i class="ph-thin text-xl ph-currency-dollar"></i>
                    <p class="text-sm font-medium">Your Profit</p>
                </div>

                <p class="value-text font-medium">
                    {{ withCurrency(account.profit) }}
                </p>
            </div>
        </div>

        <div
            v-if="account.isFrozed"
            class="p-4 rounded-xl border border-g30 bg-g20"
        >
            <div class="flex justify-between items-center gap-3">
                <div class="flex justify-start items-center gap-3">
                    <i class="ph-thin text-xl ph-currency-dollar"></i>
                    <p class="text-sm font-medium">Frozen Balance</p>
                </div>

                <p class="invalid-feedback font-medium">
                    {{ withCurrency(account.frozen_balance) }}
                </p>
            </div>
        </div>

        <div class="p-4 rounded-xl border border-g30 bg-g20">
            <div class="flex justify-between items-center gap-3">
                <div class="flex justify-start items-center gap-3">
                    <i class="ph-thin text-xl ph-seal-percent"></i>
                    <p class="text-sm font-medium">Credit Score</p>
                </div>

                <p
                    class="font-medium"
                    :class="
                        account.isFrozed ? 'invalid-feedback' : 'value-text'
                    "
                >
                    {{ `${account.credit_score}%` }}
                </p>
            </div>
        </div>
    </div>
</template>
