<template>
    <UserLayout title="Home">
        <!-- Slider Section Start -->
        <div class="px-4 pt-6">
            <HomeSlider />
        </div>
        <!-- Slider Section Start -->

        <!-- Transaction Section Start -->
        <div class="px-4">
            <TransacButtons />
        </div>
        <!-- Transaction Section End -->

        <!-- Announcement Section Start -->
        <div class="py-4" v-if="$page.props.config.settings.announcement">
            <van-notice-bar
                :scrollable="true"
                :text="$page.props.config.settings.announcement"
                left-icon="volume-o"
            />
        </div>
        <!-- Announcement Section End -->

        <div class="px-4 pt-3">
            <DealsRepeater />
        </div>
    </UserLayout>
</template>

<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import HomeSlider from "@/components/user/HomeSlider.vue";
import TransacButtons from "@/components/user/TransacButtons.vue";
import DealsRepeater from "@/components/user/DealsRepeater.vue";
</script>
