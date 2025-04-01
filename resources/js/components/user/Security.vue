<script setup>
import { ref } from "vue";
import { showToast } from "vant";
import { useUserStore } from "@/stores/user";
import EditPassword from "@/Components/User/EditPassword.vue";
import BrowserSessions from "@/Components/User/BrowserSessions.vue";

const userStore = useUserStore();

const showEditPassword = ref(false);
const showSessions = ref(false);

const pwdForm = ref("");

const editPwd = (type) => {
    pwdForm.value = type;
    showEditPassword.value = true;
};

const getSessions = async () => {
    await userStore.fetchSessions();
    showSessions.value = true;
};

const deactivateAccount = () => {
    showToast("Please contact support to deactivate your account!");
};
</script>

<template>
    <div class="border border-g30 bg-g20 rounded-xl p-4 mx-4">
        <div
            class="flex justify-between items-center pb-3 border-b border-dashed border-g30"
        >
            <div class="flex justify-start items-center gap-4">
                <div
                    class="bg-white p-3 rounded-full border-g30 flex justify-center items-center"
                >
                    <i class="ph ph-key"></i>
                </div>
                <p class="text-sm font-medium text-g60">Login Password</p>
            </div>

            <button
                @click="editPwd('login')"
                class="primaryButtonOutline w-14 py-2"
                style="margin-top: 0"
            >
                <i class="ph ph-pencil-simple-line"></i>
            </button>
        </div>
        <div class="flex justify-between items-center pt-3">
            <div class="flex justify-start items-center gap-4">
                <div
                    class="bg-white p-3 rounded-full border-g30 flex justify-center items-center"
                >
                    <i class="ph ph-key"></i>
                </div>
                <p class="text-sm font-medium text-g60">Withdrawal Password</p>
            </div>
            <button
                @click="editPwd('withdrawal')"
                class="primaryButtonOutline w-14 py-2"
                style="margin-top: 0"
            >
                <i class="ph ph-pencil-simple-line"></i>
            </button>
        </div>

        <van-popup v-model:show="showEditPassword" position="bottom" round>
            <BottomModal
                :title="`Edit ${pwdForm} password`"
                @close="(showEditPassword = false), (pwdForm = '')"
            >
                <template #content>
                    <EditPassword :type="pwdForm" />
                </template>
            </BottomModal>
        </van-popup>
    </div>

    <div class="px-4 pt-8 flex flex-col gap-4">
        <div
            class="border border-g30 p-4 rounded-xl cursor-pointer"
            @click="getSessions"
        >
            <div class="flex justify-between items-center">
                <p class="text-g60 text-sm font-medium">Device Management</p>
                <i class="ph ph-caret-right"></i>
            </div>
            <p class="text-g50 pt-2 text-xs">
                Device Management oversees and secures devices, ensuring optimal
                performance and security.
            </p>
        </div>
        <div
            class="border border-g30 p-4 rounded-xl cursor-pointer"
            @click="deactivateAccount"
        >
            <div class="flex justify-between items-center">
                <p class="text-g60 text-sm font-medium">Deactivate Account</p>
                <i class="ph ph-caret-right"></i>
            </div>
            <p class="text-g50 pt-2 text-xs">
                Before deactivating your account, please download any data or
                information that you wish to retain.
            </p>
        </div>

        <van-popup v-model:show="showSessions" position="bottom" round>
            <BottomModal
                title="Device Management"
                @close="showSessions = false"
            >
                <template #content>
                    <BrowserSessions />
                </template>
            </BottomModal>
        </van-popup>
    </div>
</template>
