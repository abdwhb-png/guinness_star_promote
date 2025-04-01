<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import Button from "primevue/button";

const userStore = useUserStore();

const [pageSize, step] = [ref(10), 10];

const notifications = computed(() => {
    return userStore.getNotifications().slice(0, pageSize.value);
});
</script>

<template>
    <div class="px-4 flex flex-col gap-4">
        <van-empty
            v-if="!userStore.hasNotifications"
            description="No records found"
        />

        <Button
            v-else
            label="Mark All As Readed"
            severity="secondary"
            class="w-full !py-2"
            :disabled="!userStore.unreadCount"
            :loading="userStore.loading('notifications')"
            @click="userStore.readNotifications()"
        />

        <div
            v-for="(item, index) in notifications"
            :key="index"
            class="border border-g30 p-4 rounded-xl"
            :class="item.status == 'unread' ? 'cursor-pointer' : ''"
            @click="userStore.readNotification(item.id)"
        >
            <div class="flex justify-between items-center">
                <div
                    class="text-g60 text-sm font-medium"
                    v-html="item.title"
                ></div>

                <i
                    v-if="item.status == 'readed'"
                    class="ph ph-eye text-g30"
                ></i>

                <i v-if="item.status == 'unread'" class="ph ph-eye-slash"></i>
            </div>

            <div class="text-g50 pt-2 text-xs" v-html="item.body"></div>

            <p
                class="border-t border-dashed border-g30 text-xs mt-3 pt-1"
                :class="item.status == 'unread' ? 'text-g50' : 'text-g30'"
            >
                {{ item.created || item.created_at }}
            </p>
        </div>

        <div class="w-full">
            <Button
                @click="pageSize = pageSize + step"
                v-show="userStore.getNotifications().length > pageSize"
                label="Load More"
                unstyled
                class="primaryButton w-full mt-4"
            />
        </div>
    </div>
</template>
