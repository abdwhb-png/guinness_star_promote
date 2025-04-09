<script setup lang="ts">
import { router, usePage } from '@inertiajs/vue3';
import { ref, onBeforeMount, onMounted } from 'vue';
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import SpeedDial from '@/components/admin/SpeedDial.vue';
import type { BreadcrumbItemType } from '@/types';
import { useUserStore } from '@/stores/user';
import { usePusher } from "@/composables/usePusher";
import { useToast } from 'primevue/usetoast';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage();
const toast = useToast();
const userStore = useUserStore();
const { subscribeToUser } = usePusher(
    page.props.config.pusher,
    userStore
);
const reloading = ref(false);

const onReload = () => {
    reloading.value = true;
    router.reload({
        onSuccess: () => toast.add({ summary: 'Page reloaded', detail: 'The page has been reloaded', severity: 'secondary', life: 2000 }),
        onFinish: () => (reloading.value = false),
    });
};

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
        <div class="flex justify-center my-3" :class="{ 'animate-pulse': reloading }">
            <Button severity="secondary" @click="onReload()" :loading="reloading" label="Reload" icon="pi pi-refresh"
                size="small" />
        </div>
        <div class="flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl p-4 mx-auto">
            <slot />
        </div>
    </AppLayout>
</template>
