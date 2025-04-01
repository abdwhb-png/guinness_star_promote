<script setup>
import { useSiteStore } from "@/stores/site";
import { copyToClipboard } from "@/utils";
import EditPaymentMethods from "./EditPaymentMethods.vue";

const emits = defineEmits(["selected"]);
defineProps({
    section: {
        type: String,
        defaut: "show",
    },
});

const siteStore = useSiteStore();

const selectItem = (item) => {
    siteStore.setDefaultCoin(item.method.symbol);
    emits("selected", item);
};
</script>
<template>
    <div>
        <!-- list area -->
        <div v-if="section == 'list'"
            class="px-4 pt-8 flex justify-start items-start flex-col gap-4 radioItems selectPaymentMethods">
            <div v-for="(item, index) in $page.props.auth.user.payment_methods" :key="item.id"
                class="p-4 border border-g30 rounded-xl w-full item cursor-pointer" :class="item.method.symbol == siteStore.defaultCoin ? 'active' : ''
                    " @click="copyToClipboard(item.method.address)">
                <div class="flex justify-between items-center">
                    <div class="flex justify-start items-center gap-3">
                        <div class="bg-white size-8 rounded-full flex justify-center items-center shadow-3">
                            <img :src="item.method.image_url || `/app/assets/images/coins/${item.method.symbol}.jpg`"
                                alt="image" />
                        </div>
                        <p class="text-sm font-medium text-g60">
                            {{ item.method.name || item.method.label }}
                        </p>
                    </div>
                    <div class="text-g50 underline text-sm"
                        @click="copyToClipboard(item.method.type == 'crypto' ? item.method.address : item.method.phone_number)">
                        <i class="ph ph-copy"></i>
                        <span>Copy</span>
                    </div>
                </div>
                <div class="flex justify-end">
                    <p class="text-xs text-g50 px-2" style="overflow-x: auto" v-if="item.method.type == 'crypto'">
                        {{ item.method.address }}
                    </p>
                    <p class="text-xs text-g50 px-2 text-right" style="overflow-x: auto" v-else>
                        Marchand : <span class="text-blue-500">{{ item.method.owner }}</span>
                        <br>
                        Phone Number : <span class="font-semibold">{{ item.method.phone_number }}</span>
                    </p>
                </div>
            </div>
        </div>

        <!-- choose area -->
        <div v-else-if="section == 'choose'"
            class="px-4 pt-8 flex justify-start items-start flex-col gap-4 radioItems selectPaymentMethods">
            <div v-for="(item, index) in $page.props.auth.user.payment_methods" :key="item.id"
                class="p-4 border border-g30 rounded-xl flex justify-between items-center w-full item cursor-pointer"
                :class="item.method.symbol == siteStore.defaultCoin ? 'active' : ''
                    " @click="selectItem(item)">
                <div class="flex justify-start items-center gap-3">
                    <div class="bg-white size-8 rounded-full flex justify-center items-center shadow-3">
                        <img :src="item.method.image_url || `/app/assets/images/coins/${item.method.symbol}.jpg`"
                            :alt="`${item.method.symbol}image`" />
                    </div>
                    <p class="text-sm font-medium text-g60">
                        {{ item.method.name }}
                    </p>
                </div>
                <div class="rounded-full duration-500 circle-outer">
                    <div class="size-3 rounded-full duration-500 circle-inner"></div>
                </div>
            </div>
        </div>

        <!-- show area -->
        <div v-else class="px-4 pt-8 flex justify-start items-start flex-col gap-4">
            <EditPaymentMethods :paymentMethods="$page.props.auth.user.payment_methods" />
        </div>
    </div>
</template>
