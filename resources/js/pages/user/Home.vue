<template>
    <UserLayout title="Accueil">
        <!-- Slider Section Start -->
        <div class="px-4 pt-6">
            <HomeSlider />
        </div>
        <!-- Slider Section Start -->

        <!-- Balance Card Section Start -->
        <div class="my-4 mb-2 px-4">
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

        <Divider align="center" type="dotted" style="z-index: 0">
            <b>Tasks of the day</b>
        </Divider>

        <div class="mt-3 px-4">
            <DealsRepeater />
        </div>
    </UserLayout>
</template>

<script setup>
import BalanceCard from '@/components/user/BalanceCard.vue';
import DealsRepeater from '@/components/user/DealsRepeater.vue';
import HomeSlider from '@/components/user/HomeSlider.vue';
import TransacButtons from '@/components/user/TransacButtons.vue';
import UserLayout from '@/layouts/UserLayout.vue';
import { usePage } from '@inertiajs/vue3';

const account = usePage().props.auth.user.account;
</script>
