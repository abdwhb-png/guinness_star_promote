<template>
    <van-popup
        v-model:show="siteStore.showTCS"
        position="right"
        :style="{ width: '100%', height: '100%' }"
    >
        <RightModal
            title="Terms &amp; Conditions"
            @close="siteStore.showTCS = false"
        >
            <template #content>
                <div class="px-4">
                    <p class="text-g60 font-medium text-sm">
                        Last Updated:
                        {{ $page.props.config.settings.updated_at }}
                    </p>
                    <div
                        class="mt-4 p-4 border border-g30 rounded-xl flex flex-col gap-4"
                    >
                        {{ $page.props.config.settings.tcs }}
                    </div>
                </div>
            </template>
        </RightModal>
    </van-popup>
</template>

<script setup>
import { useSiteStore } from "@/stores/site";
import RightModal from "@/Components/User/RightModal.vue";

const siteStore = useSiteStore();
</script>
