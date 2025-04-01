<script setup>
import { computed } from "vue";
import { useSiteStore } from "@/stores/site";
import { useUserStore } from "@/stores/user";
import { useQuery } from "@tanstack/vue-query";

const siteStore = useSiteStore();
const userStore = useUserStore();

const { data, isLoading, isSuccess, isError, error } = useQuery(
    siteStore.getQueryOptions("memberships")
);

const memberships = computed(() => data.value);
</script>

<template>
    <div class="flex flex-col gap-4 px-4">
        <div v-if="isLoading" class="flex justify-center items-center">
            <van-loading type="spinner" />
        </div>
        <van-notice-bar
            v-if="isError"
            color="red"
            background="#ecf9ff"
            left-icon="info-o"
            :description="error"
        />

        <van-empty
            v-if="isSuccess && data?.length == 0"
            description="No records found"
        />
        <div
            v-for="(item, index) in memberships"
            :key="index"
            class="border border-g30 rounded-xl p-4"
        >
            <div
                class="flex justify-between items-center border-b border-dashed border-g30 pb-3"
            >
                <div class="flex justify-start items-center gap-2">
                    <Avatar :image="item.image" />
                    <p
                        class="text-xs text-g50 py-0.5 px-1 bg-g20 border border-g30 rounded-md"
                    >
                        {{ $page.props.auth.user.account.currency }}
                        {{ item.price }}
                    </p>
                </div>
                <button>
                    <p class="text-sm font-medium text-g60">
                        {{ item.levelName }}
                    </p>
                    <Tag
                        v-if="
                            item.id ===
                            userStore.getData('user').account.membership_id
                        "
                        value="Current"
                    ></Tag>
                </button>
            </div>
            <p
                class="flex justify-start items-center gap-1 text-g50 text-xs pt-3"
            >
                ● Commission of {{ item.profit_ratio }}% per deal
            </p>
            <p
                class="flex justify-start items-center gap-1 text-g50 text-xs pt-2"
            >
                ● Up to {{ item.max_tasks }} deals per day available to
                {{ item.name }} subscribers
            </p>
            <p
                class="flex justify-start items-center gap-1 text-g50 text-xs pt-2"
                v-html="item.description"
            ></p>
        </div>
    </div>
</template>
