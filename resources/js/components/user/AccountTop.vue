<template>
    <div class="px-4 pt-8">
        <div @click="showQrCode = true" class="flex justify-between items-center p-4 rounded-xl account-overview-card">
            <div class="flex justify-start items-center gap-4">
                <div class="text-white">
                    <p class="text-xl font-semibold" translate="no">
                        {{ user.username }}
                    </p>
                    <p class="text-sm" translate="no">{{ user.email }}</p>
                    <CopyBtn :text="accountNo" translate="no" />
                </div>
            </div>

            <button type="button"
                class="cursor-pointer rounded-full !leading-none size-9 flex justify-center items-center bg-white myQrCodeOpenButton">
                <i class="ph ph-qr-code text-g60 text-xl"></i>
            </button>
        </div>

        <van-dialog v-model:show="showQrCode" confirm-button-text="Copy Link" cancel-button-text="Close"
            show-cancel-button :closeOnClickOverlay="true" @confirm="
                copyToClipboard(route('register', { ref: accountNo }))
                " class="p-4" :style="{ width: 'auto', 'max-width': '350px' }">
            <div class="flex justify-center items-center">
                <img src="/app/assets/images/slider-img-2.png" class="screenWidth"
                    style="max-width: 200px; max-height: fit-content" alt="" />
            </div>

            <div class="p-6">
                <h1 class="display-3 font-bold text-g60 text-center">
                    <span class="account_no">
                        {{ accountNo }}
                    </span>
                </h1>
                <p class="pt-3 text-g50 text-center text-sm">
                    Invitation Link
                    <span class="text-g60 font-semibold">
                        {{ route("register", { ref: accountNo }) }}
                    </span>
                </p>
            </div>
        </van-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { copyToClipboard } from "@/utils";
import CopyBtn from "@/components/shared/CopyBtn.vue";

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const accountNo = props.user.account.account_no;
const showQrCode = ref(false);
</script>