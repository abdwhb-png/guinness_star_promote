<style scoped>
.top-nav {
    box-shadow: none;
    transition: box-shadow 0.25s ease-in, background-color 0.25s ease-in;
    background-color: rgba(238, 234, 234, 0.8) !important;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 0 5px;
    border-radius: 1rem;
}

.top-nav.scrolled {
    top: 1%;
    box-shadow: inset 0 1px 1px 1px rgba(172, 171, 171, 0.9),
        0 20px 27px 0 rgba(0, 0, 0, 0.05) !important;
    backdrop-filter: saturate(200%) blur(30px);
    webkit-backdrop-filter: saturate(200%) blur(30px);
    background-color: rgba(255, 255, 255, 0.8) !important;
    transition: box-shadow 0.25s ease-in, background-color 0.25s ease-in;
}
</style>

<template>
    <div class="flex justify-between items-center px-4" :class="['sticky', 'top-nav', { scrolled: isScrolled }]">
        <div class="flex items-center justify-center size-10 rounded-full bg-white cursor-pointer"
            @click="userStore.showAccount = true">
            <i class="ph-fill ph-piggy-bank text-g40 text-2xl"></i>
        </div>

        <h1 class="text-2xl">{{ title }}</h1>

        <div class="relative rounded-full cursor-pointer" @click="getNotifications">
            <div class="absolute top-0.5 right-0 bg-white p-0.5 rounded-full">
                <div class="size-2 rounded-full" :class="userStore.unreadCount ? 'bg-sky-500' : 'bg-g40 '"></div>
            </div>
            <i class="ph-fill ph-bell-simple text-g40 text-2xl"></i>
        </div>
    </div>

    <van-popup v-model:show="showNotifs" position="right" :style="{ width: '100%', height: '100%' }">
        <RightModal title="Notifications" @close="showNotifs = false">
            <template #content>
                <Notifications />
            </template>
        </RightModal>
    </van-popup>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";
import RightModal from "@/components/user/RightModal.vue";
import Notifications from "@/components/user/Notifications.vue";

defineProps({
    title: {
        type: String,
    },
});

const userStore = useUserStore();
const isScrolled = ref(false);
const showNotifs = ref(false);

const getNotifications = () => {
    userStore.fetchNotifications();
    showNotifs.value = true;
};

const handleScroll = () => {
    isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>
