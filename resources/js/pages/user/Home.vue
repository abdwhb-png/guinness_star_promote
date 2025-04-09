<template>
    <UserLayout title="Accueil">
        <!-- Slider Section Start -->
        <div class="px-4 pt-6">
            <HomeSlider />
        </div>
        <!-- Slider Section Start -->

        <!-- Balance Card Section Start -->
        <div class="px-4 my-4 mb-2">
            <BalanceCard :deposit="account.deposit" :profit="account.profit" :currency="account.currency" />
        </div>
        <!-- Balance Card Section End -->

        <!-- Transaction Section Start -->
        <div class="px-4">
            <TransacButtons />
        </div>
        <!-- Transaction Section End -->

        <!-- Announcement Section Start -->
        <div class="py-4" v-if="$page.props.config.settings.announcement">
            <van-notice-bar :scrollable="true" :text="$page.props.config.settings.announcement" left-icon="volume-o" />
        </div>
        <!-- Announcement Section End -->

        <Divider align="center" type="dotted">
            <b>Tasks of the day</b>
        </Divider>

        <div class="px-4 mt-3">
            <DealsRepeater />
        </div>
    </UserLayout>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';
import UserLayout from "@/layouts/UserLayout.vue";
import HomeSlider from "@/components/user/HomeSlider.vue";
import TransacButtons from "@/components/user/TransacButtons.vue";
import DealsRepeater from "@/components/user/DealsRepeater.vue";
import BalanceCard from "@/components/user/BalanceCard.vue";

const account = usePage().props.auth.user.account;
</script>
