<script setup>
import { useSiteStore } from '@/stores/site';
import { copyToClipboard } from '@/utils';
import EditPaymentMethods from './EditPaymentMethods.vue';

const emits = defineEmits(['selected']);
defineProps({
    section: {
        type: String,
        defaut: 'show',
    },
});

const siteStore = useSiteStore();

const selectItem = (item) => {
    siteStore.setDefaultCoin(item.method.symbol);
    emits('selected', item);
};
</script>
<template>
    <div>
        <!-- list area -->
        <div v-if="section == 'list'" class="radioItems selectPaymentMethods flex flex-col items-start justify-start gap-4 px-4 pt-8">
            <div
                v-for="(item, index) in $page.props.auth.user.payment_methods"
                :key="item.id"
                class="border-g30 item w-full cursor-pointer rounded-xl border p-4"
                :class="item.method.symbol == siteStore.defaultCoin ? 'active' : ''"
                @click="copyToClipboard(item.method.address)"
            >
                <div class="flex items-center justify-between">
                    <div class="flex items-center justify-start gap-3">
                        <div class="shadow-3 flex size-8 items-center justify-center rounded-full bg-white">
                            <img :src="item.method.image_url || `/app/assets/images/coins/${item.method.symbol}.jpg`" alt="image" />
                        </div>
                        <p class="text-g60 text-sm font-medium">
                            {{ item.method.name || item.method.label }}
                        </p>
                    </div>
                    <div
                        class="text-g50 text-sm underline"
                        @click="copyToClipboard(item.method.type == 'crypto' ? item.method.address : item.method.phone_number)"
                    >
                        <i class="ph ph-copy"></i>
                        <span>Copy</span>
                    </div>
                </div>
                <div class="flex justify-end">
                    <p class="text-g50 px-2 text-xs" style="overflow-x: auto" v-if="item.method.type == 'crypto'">
                        {{ item.method.address }}
                    </p>
                    <p class="text-g50 px-2 text-right" style="overflow-x: auto" v-else>
                        <span class="text-xs">Marchand</span> : <span class="text-lg font-semibold">{{ item.method.owner }}</span>
                        <br />
                        <span class="text-xs">Phone Number</span> : <span class="text-lg text-blue-500">{{ item.method.phone_number }}</span>
                    </p>
                </div>
            </div>
        </div>

        <!-- choose area -->
        <div v-else-if="section == 'choose'" class="radioItems selectPaymentMethods flex flex-col items-start justify-start gap-4 px-4 pt-8">
            <div
                v-for="(item, index) in $page.props.auth.user.payment_methods"
                :key="item.id"
                class="border-g30 item flex w-full cursor-pointer items-center justify-between rounded-xl border p-4"
                :class="item.method.symbol == siteStore.defaultCoin ? 'active' : ''"
                @click="selectItem(item)"
            >
                <div class="flex items-center justify-start gap-3">
                    <div class="shadow-3 flex size-8 items-center justify-center rounded-full bg-white">
                        <img
                            :src="item.method.image_url || `/app/assets/images/coins/${item.method.symbol}.jpg`"
                            :alt="`${item.method.symbol}image`"
                        />
                    </div>
                    <p class="text-g60 text-sm font-medium">
                        {{ item.method.name }}
                    </p>
                </div>
                <div class="circle-outer rounded-full duration-500">
                    <div class="circle-inner size-3 rounded-full duration-500"></div>
                </div>
            </div>
        </div>

        <!-- show area -->
        <div v-else class="flex flex-col items-start justify-start gap-4 px-4 pt-8">
            <EditPaymentMethods :paymentMethods="$page.props.auth.user.payment_methods" />
        </div>
    </div>
</template>
