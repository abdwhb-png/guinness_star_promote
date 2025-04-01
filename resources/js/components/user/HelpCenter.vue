<template>
    <van-popup v-model:show="siteStore.showHelpCenter" position="right" :style="{ width: '100%', height: '100%' }">
        <RightModal title="Help &amp; Support" @close="siteStore.showHelpCenter = false">
            <template #content>
                <div class="p-4 border border-g30 rounded-xl flex flex-col gap-4 mx-4 mt-4">
                    <a v-for="(item, index) in $page.props.config.csLinks" :key="'hc_' + item.id" :href="item.url"
                        target="_blank"
                        class="flex justify-between items-center text-g60 border-b border-dashed border-g30 pb-4 cursor-pointer">
                        <p class="text-sm font-medium" translate="no">{{ item.title }}</p>
                        <i class="ph ph-caret-right"></i>
                    </a>
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
