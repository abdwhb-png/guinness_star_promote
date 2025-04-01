<template>
    <UserLayout title="History">
        <div class="p-4">
            <van-tabs v-model:active="activeName" @click-tab="onClickTab">
                <van-tab title="Deals" name="tasks">
                    <DealList class="pt-4 px-4" />
                </van-tab>
                <van-tab title="Transactions" name="transactions">
                    <TransacList class="pt-4 px-4" />
                </van-tab>
            </van-tabs>
        </div>
    </UserLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import UserLayout from "@/layouts/UserLayout.vue";
import TransacList from "@/components/user/TransacList.vue";
import DealList from "@/components/user/DealList.vue";

const activeName = ref(
    localStorage.getItem("historyActiveName") || "transactions"
);

const onClickTab = async ({ name }) => {
    localStorage.setItem("historyActiveName", name);
};
</script>
