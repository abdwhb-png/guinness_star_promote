<template>
    <Button type="button" label="Notifications" icon="pi pi-bell" severity="secondary"
        :badge="count.toString()" :badge-severity="userStore.unreadCount > 0
            ? 'primary'
            : 'contrast'
            " @click="$inertia.visit(route($page.props.routePrefix + 'notifications'))" />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const count = userStore.unreadCount > 99 ? '99+' : userStore.unreadCount;
</script>
