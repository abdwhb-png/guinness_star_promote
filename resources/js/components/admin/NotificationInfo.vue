<template>
    <Button type="button" label="Notifications" icon="pi pi-bell" severity="secondary"
        :badge="userStore.unreadCount.toString()" :badge-severity="userStore.unreadCount > 0
            ? 'primary'
            : 'contrast'
            " @click="$inertia.visit(route($page.props.routePrefix + 'notifications'))" />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>
