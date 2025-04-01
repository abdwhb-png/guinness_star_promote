<template>
    <UserLayout title="Account">
        <!-- User Info Section Start -->
        <AccountTop :user="$page.props.auth.user" />
        <!-- User Info Section End -->

        <!-- Transaction Section Start -->
        <div class="px-4">
            <TransacButtons />
        </div>
        <!-- Transaction Section End -->

        <!-- User Menu Start -->
        <div class="px-4 pt-4">
            <van-popup v-model:show="showModal" position="right" :style="{ width: '100%', height: '100%' }">
                <RightModal :title="currentModal.title" @close="modalToShow = null">
                    <template #content>
                        <component :is="currentModal.component" v-bind="currentModal.props" />
                    </template>
                </RightModal>
            </van-popup>
            <ul class="flex flex-col">
                <li>
                    <a href="javascript:void(0);" @click="modalToShow = 'profile'"
                        class="flex justify-between items-center pb-4 border-b border-dashed border-g30 pt-4">
                        <div class="flex justify-start items-center gap-4">
                            <div
                                class="cursor-pointer rounded-full border border-g30 !leading-none size-10 flex justify-center items-center bg-g20">
                                <i class="ph ph-user text-g60 text-xl"></i>
                            </div>
                            <p class="text-g60 font-medium">My Profile</p>
                        </div>

                        <i class="ph ph-caret-right text-g60 text-xl"></i>
                    </a>
                </li>

                <li>
                    <a href="javascript:void(0);" @click="modalToShow = 'pMethods'"
                        class="flex justify-between items-center pb-4 border-b border-dashed border-g30 pt-4">
                        <div class="flex justify-start items-center gap-4">
                            <div
                                class="cursor-pointer rounded-full border border-g30 !leading-none size-10 flex justify-center items-center bg-g20">
                                <i class="ph ph-wallet text-g60 text-xl"></i>
                            </div>
                            <p class="text-g60 font-medium">Payment Methods</p>
                        </div>

                        <i class="ph ph-caret-right text-g60 text-xl"></i>
                    </a>
                </li>

                <li>
                    <a href="javascript:void(0);" @click="modalToShow = 'security'"
                        class="flex justify-between items-center pb-4 border-b border-dashed border-g30 pt-4">
                        <div class="flex justify-start items-center gap-4">
                            <div
                                class="cursor-pointer rounded-full border border-g30 !leading-none size-10 flex justify-center items-center bg-g20">
                                <i class="ph ph-shield-check text-g60 text-xl"></i>
                            </div>
                            <p class="text-g60 font-medium">Security</p>
                        </div>

                        <i class="ph ph-caret-right text-g60 text-xl"></i>
                    </a>
                </li>

                <li>
                    <a href="javascript:void(0);" @click="modalToShow = 'language'"
                        class="flex justify-between items-center pb-4 border-b border-dashed border-g30 pt-4">
                        <div class="flex justify-start items-center gap-4">
                            <div
                                class="cursor-pointer rounded-full border border-g30 !leading-none size-10 flex justify-center items-center bg-g20">
                                <i class="ph ph-translate text-g60 text-xl"></i>
                            </div>
                            <p class="text-g60 font-medium">Language</p>
                        </div>

                        <i class="ph ph-caret-right text-g60 text-xl"></i>
                    </a>
                </li>

                <li>
                    <a href="javascript:void(0);" @click="siteStore.showHelpCenter = true"
                        class="flex justify-between items-center pb-4 border-b border-dashed border-g30 pt-4">
                        <div class="flex justify-start items-center gap-4">
                            <div
                                class="cursor-pointer rounded-full border border-g30 !leading-none size-10 flex justify-center items-center bg-g20">
                                <i class="ph ph-headset text-g60 text-xl"></i>
                            </div>
                            <p class="text-g60 font-medium">
                                Help &amp; Support
                            </p>
                        </div>

                        <i class="ph ph-caret-right text-g60 text-xl"></i>
                    </a>
                </li>

                <li>
                    <a @click="showLogout = true" href="javascript:void(0)"
                        class="flex justify-between items-center pt-4 logoutModalButton cursor-pointer">
                        <div class="flex justify-start items-center gap-4">
                            <div
                                class="cursor-pointer rounded-full border border-g30 !leading-none size-10 flex justify-center items-center bg-g20">
                                <i class="ph ph-sign-out text-g60 text-xl"></i>
                            </div>
                            <p class="text-g60 font-medium">Logout</p>
                        </div>
                    </a>
                    <van-dialog v-model:show="showLogout" title="Are you sure, you want to logout?" show-cancel-button
                        cancel-button-text="No" confirm-button-text="Yes" :beforeClose="toLogout"
                        :closeOnClickOverlay="true">
                        <div class="flex justify-center mt-4">
                            <img src="/app/assets/images/logout.png" width="100" />
                        </div>
                    </van-dialog>
                </li>
            </ul>
        </div>
        <!-- User Menu End -->
    </UserLayout>
</template>

<script setup>
import { computed, ref, markRaw, watch } from "vue";
import { router, usePage } from "@inertiajs/vue3";
import { useSiteStore } from "@/stores/site";
import { showLoadingToast } from "vant";

import UserLayout from "@/layouts/UserLayout.vue";
import AccountTop from "@/components/user/AccountTop.vue";
import TransacButtons from "@/components/user/TransacButtons.vue";
import RightModal from "@/components/user/RightModal.vue";
import EditProfile from "@/components/user/EditProfile.vue";
import PaymentMethods from "@/components/user/PaymentMethods.vue";
import Language from "@/components/user/Language.vue";
import Security from "@/components/user/Security.vue";

const page = usePage();
const siteStore = useSiteStore();
const showLogout = ref(false);
const modalToShow = ref(null);
const showModal = ref(false);

const currentModal = computed(() => {
    switch (modalToShow.value) {
        case "profile":
            return {
                title: "My Profile",
                component: markRaw(EditProfile),
                props: { user: page.props.auth.user },
            };
        case "pMethods":
            return {
                title: "Payment Methods",
                props: { section: "show" },
                component: markRaw(PaymentMethods)
            };
        case "language":
            return {
                title: "Language",
                component: markRaw(Language)
            };
        case "security":
            return {
                title: "Security",
                component: markRaw(Security)
            };
        default:
            return {
                title: "",
                component: null
            };
    }
})

watch(modalToShow, (val) => {
    showModal.value = val !== null;
});

function toLogout(action) {
    new Promise((resolve) => {
        if (action !== "confirm") showLogout.value = false;
        else {
            showLoadingToast({
                message: "Logging out...",
                forbidClick: true,
                duration: 1000,
            });
            router.post("/logout");
        }
    });
}
</script>
