<script setup lang="ts">
import { router, useForm, usePage } from "@inertiajs/vue3";
import { ref, watch } from "vue";
import { type BreadcrumbItem } from '@/types';
import { useUserStore } from "@/stores/user";
import { getSeverity } from "@/utils";
import { formatNotification } from "@/utils/helpers";
import AppLayout from '@/layouts/AppLayout.vue';
import CustomDataTable from '@/components/admin/CustomDataTable.vue';
import {
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'

const props = defineProps(['notifications'])

const page = usePage();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notifications',
        href: '/notifications',
    },
];

const userStore = useUserStore();
const loading = ref(false);
const paginated = ref([]);

const updateNotifs = (action: string) => {
    loading.value = true;
    if (action == 'readAll') {
        router.patch(route('notifications.read'));
    } else if (action == 'delete') {
        router.delete(route("notifications.delete"))
    }
    loading.value = false;
}

watch(() => props.notifications, () => {
    // Reformater uniquement `data`
    const formattedNotifications = props.notifications.data.map((notification: any) => formatNotification(notification));
    paginated.value = {
        ...props.notifications,
        data: formattedNotifications
    };
}, { immediate: true, deep: true });

watch(() => userStore.unreadCount, () => {
    router.visit('/notifications')
});
</script>

<template>

    <Head title="Notifications" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <Toolbar class="m-2">
            <template #end>
                <div class="flex gap-3 items-center">
                    <Button size="small" severity="contrast" outlined label="Mark All As Readed" icon="pi pi-check"
                        :disabled="!userStore.unreadCount" :loading="loading" @click="updateNotifs('readAll')" />
                    <Button size="small" severity="danger" label="Delete All" icon="pi pi-trash"
                        :disabled="!paginated.total" :loading="loading" @click="updateNotifs('delete')" />
                </div>
            </template>
        </Toolbar>

        <CustomDataTable title="Notifications list" :paginated="paginated" :data-filters="page.props.filters"
            filter-key="status" :show-id="false">
            <template #filterContent>
                <DropdownMenuRadioItem v-for="(status, index) in page.props.statuses" :key="index"
                    :value="status.toString()">
                    <span class="capitalize">{{ index }}</span>
                </DropdownMenuRadioItem>
            </template>

            <Column field="status" header="Status" style="width: 5%">
                <template #body="{ data }">
                    <div class="flex gap-3">
                        <Tag :value="data.status" :severity="getSeverity(data.status)" />
                        <UiButton v-if="data.status == 'unread'" variant="secondary"
                            @click="router.put(route('notification.update', data.id))">
                            Mark as read
                        </UiButton>
                    </div>
                    <p>
                        received at :
                        {{ data.created ?? data.created_at }}
                    </p>
                </template>
            </Column>

            <Column field="title" header="Title" style="width: 25%">
                <template #body="{ data }">
                    <p v-html="data.title"></p>
                </template>
            </Column>

            <Column field="body" header="Body" style="width: 70%">
                <template #body="{ data }">
                    <div v-if="data.body" v-html="data.body"></div>
                    <span v-else class="text-gray-400">No body</span>
                </template>
            </Column>
        </CustomDataTable>
    </AppLayout>
</template>