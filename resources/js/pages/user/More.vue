<template>
    <UserLayout title="More Information">
        <div class="p-4 border border-g30 rounded-xl flex flex-col gap-4 mx-4 mt-4">
            <a href="#help_center" @click="siteStore.showHelpCenter = true"
                class="flex justify-between items-center text-g60 border-b border-dashed border-g30 pb-4 myQrCodeModal">
                <p class="text-sm font-medium">Help Center</p>
                <i class="ph ph-caret-right"></i>
            </a>
            <a href="javascript:void(0);" @click="showMemberships('vips')"
                class="hidden justify-between items-center text-g60 border-b border-dashed border-g30 pb-4">
                <p class="text-sm font-medium">VIPs</p>
                <i class="ph ph-caret-right"></i>
            </a>
            <a href="javascript:void(0);" @click="showMemberships('salaries')"
                class="hidden justify-between items-center text-g60 border-b border-dashed border-g30 pb-4">
                <p class="text-sm font-medium">Salaries</p>
                <i class="ph ph-caret-right"></i>
            </a>
            <a href="javascript:void(0);" @click="show('about_us')"
                class="flex justify-between items-center text-g60 border-b border-dashed border-g30 pb-4">
                <p class="text-sm font-medium">About Us</p>
                <i class="ph ph-caret-right"></i>
            </a>
            <a href="javascript:void(0);" @click="show('tcs')"
                class="flex justify-between items-center text-g60 border-b border-dashed border-g30 pb-4">
                <p class="text-sm font-medium">Terms of Service</p>
                <i class="ph ph-caret-right"></i>
            </a>
            <a href="javascript:void(0);" @click="show('faq')" class="flex justify-between items-center text-g60">
                <p class="text-sm font-medium">FAQs</p>
                <i class="ph ph-caret-right"></i>
            </a>
        </div>

        <van-popup v-model:show="showMembership" position="right" :style="{ width: '100%', height: '100%' }">
            <RightModal :title="getTitle(membershipSection)" @close="showMembership = false">
                <template #content>
                    <Vips v-if="membershipSection === 'vips'" />
                    <img v-else-if="membershipSection === 'salaries'" :src="$page.props.config.salariesImg"
                        class="screenWidth" alt="Salaries Image" />
                </template>
            </RightModal>
        </van-popup>

        <van-popup v-model:show="showPopup" position="right" :style="{ width: '100%', height: '100%' }">
            <RightModal :title="title" @close="showPopup = false">
                <template #content>
                    <div class="px-4">
                        <p class="text-g60 font-medium text-sm">
                            Last Updated:
                            {{
                                settings.updated_at
                                    .replace("T", " ")
                                    .replace(".000000Z", "")
                            }}
                        </p>
                        <div class="mt-4 p-4 border border-g30 rounded-xl flex flex-col gap-4">
                            <div v-html="content"></div>
                        </div>
                    </div>
                </template>
            </RightModal>
        </van-popup>
    </UserLayout>
</template>

<script setup>
import { ref } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useSiteStore } from "@/stores/site";
import UserLayout from "@/layouts/UserLayout.vue";
import RightModal from "@/components/user/RightModal.vue";
import Vips from "@/components/user/Vips.vue";

const page = usePage();
const settings = page.props.config.settings;

const siteStore = useSiteStore();

const showMembership = ref(false);
const membershipSection = ref("");

const showPopup = ref(false);
const content = ref(null);
const title = ref("");

const getTitle = (key) => {
    switch (key) {
        case "about_us":
            return "About Us";
        case "tcs":
            return "Terms of Service";
        case "faq":
            return "Frequently Asked Questions";
        case "reg_agree":
            return "Registration Agreement";
        case "vips":
            return "Memberships";
        case "salaries":
            return "Salaries";
        default:
            return "";
    }
};

const showMemberships = (key) => {
    showMembership.value = true;
    membershipSection.value = key;
};

const show = (key) => {
    showPopup.value = true;
    content.value = settings[key];
    title.value = getTitle(key);
};
</script>
