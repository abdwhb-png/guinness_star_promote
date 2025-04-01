<script setup lang="ts">
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import SpeedDial from '@/components/admin/SpeedDial.vue';
import type { BreadcrumbItemType } from '@/types';
import { useUserStore } from '@/stores/user';
import { usePusher } from "@/composables/usePusher";
import { onBeforeMount, onMounted } from 'vue';
import { router, usePage } from '@inertiajs/vue3';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage();
const userStore = useUserStore();
const { subscribeToUser } = usePusher(
    page.props.config.pusher,
    userStore
);

onBeforeMount(async () => {
    if (page.props.auth.user !== null) {
        subscribeToUser(page.props.auth.user.id);
    }
});

onMounted(() => {
    userStore.unreadCount = page.props.auth.unreadCount;
    router.on('finish', () => {
        userStore.unreadCount = page.props.auth.unreadCount;
    });
});
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <SpeedDial />
        <Toast />
        <ConfirmDialog group="confirmDelete" />
        <ScrollTop />
        <div class="flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl p-4 mx-auto">
            <slot />
        </div>
    </AppLayout>
</template>
