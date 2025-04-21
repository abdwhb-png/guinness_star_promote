<style scoped>
.top-nav {
    box-shadow: none;
    transition:
        box-shadow 0.25s ease-in,
        background-color 0.25s ease-in;
    background-color: rgba(238, 234, 234, 0.8) !important;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 0 5px;
    border-radius: 1rem;
}

.top-nav.scrolled {
    top: 1%;
    box-shadow:
        inset 0 1px 1px 1px rgba(172, 171, 171, 0.9),
        0 20px 27px 0 rgba(0, 0, 0, 0.05) !important;
    backdrop-filter: saturate(200%) blur(30px);
    -webkit-backdrop-filter: saturate(200%) blur(30px);
    background-color: rgba(255, 255, 255, 0.8) !important;
    transition:
        box-shadow 0.25s ease-in,
        background-color 0.25s ease-in;
}
</style>

<template>
    <a href="/" class="mb-3 flex items-center justify-center gap-2 self-center font-medium">
        <div class="z-[1020] flex max-w-[50px] items-center justify-center">
            <img src="/images/guiness-logo.png" alt="logo" />
        </div>
        <span class="display-3 text-g60 animate__animated font-bold" translate="no" ref="appLogo">{{ $page.props.name }}</span>
    </a>
    <div class="flex items-center justify-between px-4" :class="['sticky', 'top-nav', { scrolled: isScrolled }]">
        <div class="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white" @click="userStore.showAccount = true">
            <i class="ph-fill ph-piggy-bank text-g40 text-2xl"></i>
        </div>

        <h1 class="text-2xl">{{ title }}</h1>

        <div class="relative cursor-pointer rounded-full" @click="getNotifications">
            <div class="absolute right-0 top-0.5 rounded-full bg-white p-0.5">
                <div class="size-2 rounded-full" :class="userStore.unreadCount ? 'bg-sky-500' : 'bg-g40'"></div>
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
import Notifications from '@/components/user/Notifications.vue';
import RightModal from '@/components/user/RightModal.vue';
import { useUserStore } from '@/stores/user';
import { onMounted, onUnmounted, ref, watch } from 'vue';

defineProps({
    title: {
        type: String,
    },
});

const userStore = useUserStore();
const isScrolled = ref(false);
const appLogo = ref();
const showNotifs = ref(false);

const getNotifications = () => {
    userStore.fetchNotifications();
    showNotifs.value = true;
};

const handleScroll = () => {
    isScrolled.value = window.scrollY > 0;
};

watch(isScrolled, (value) => {
    if (appLogo.value) {
        if (!value) {
            appLogo.value.classList.add('animate__fadeInDown');
        } else {
            setTimeout(() => {
                appLogo.value.classList.remove('animate__fadeInDown');
            }, 1000);
        }
    }
});

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>
