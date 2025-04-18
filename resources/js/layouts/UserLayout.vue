<script setup>
import { usePage } from "@inertiajs/vue3";
import { ref, onMounted, onBeforeMount } from "vue";
import { router } from "@inertiajs/vue3";
import { useUserStore } from "@/stores/user";
import { usePusher } from "@/composables/usePusher";
import ApplicationLogo from "@/components/shared/ApplicationLogo.vue";
import TopSection from "@/components/user/TopSection.vue";
import BottomNav from "@/components/user/BottomNav.vue";
import HelpCenter from "@/components/user/HelpCenter.vue";
import Tcs from "@/components/user/Tcs.vue";
import BottomModal from "@/components/user/BottomModal.vue";
import BalanceInfo from "@/components/user/BalanceInfo.vue";

const props = defineProps({
    title: String,
    guestTitle: String,
    guestText: {
        type: String,
        default: "",
    },
});

const page = usePage();
const userStore = useUserStore();
const { subscribeToUser, subscribeToUserAccount } = usePusher(
    page.props.config.pusher,
    userStore
);

const isAuth = page.props.auth.user !== null;

onBeforeMount(async () => {
    if (isAuth) {
        await userStore.fetchUser().then(() => {
            const user = userStore.getData("user");

            subscribeToUser(user.id || page.props.auth.user.id);
            subscribeToUserAccount(
                user.account.id || page.props.auth.user.account.id
            );
        });
    }
});

onMounted(() => {
    userStore.unreadCount = page.props.auth.unreadCount;
    router.on('finish', () => {
        userStore.unreadCount = page.props.auth.unreadCount;
    });

    if (window.Tawk_API) {
        window.Tawk_API.visitor = {
            name: page.props.auth.user.username,
            email: page.props.auth.user.email,
        };
    }

    if (window.doGtranslate) {
        console.log(window.doGtranslate)
    }
});
</script>

<template>

    <Head :title="props.title || 'Welcome'" />

    <van-config-provider theme="light">
        <HelpCenter />
        <Tcs />
        <ScrollTop :threshold="200" :buttonProps="{ severity: 'contrast' }" />

        <!-- GUEST -->
        <main v-if="!isAuth" class="container bg-white min-h-screen pb-8">
            <div class="auth-card register">
                <div class="text-center pt-8 px-6">
                    <div class="flex justify-center items-center">
                        <ApplicationLogo style="max-width: 30px; max-height: 30px"
                            class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        <h1 class="heading-1 font-semibold text-g60" translate="no">
                            {{ page.props.name }}
                        </h1>
                    </div>
                    <h3 class="heading-3 font-semibold text-g60">
                        {{ props.guestTitle }}
                    </h3>
                    <p class="text-sm text-g50 pt-3">
                        {{ props.guestText }}
                    </p>
                </div>

                <!-- guest slot -->
                <slot />
            </div>
        </main>
        <!-- END GUEST -->

        <!-- AUTH -->
        <main v-else class="container bg-white min-h-screen" :class="isAuth ? 'pt-2 pb-24' : 'pb-8'">
            <TopSection :title="props.title || page.props.name" />

            <!-- auth slot -->
            <slot />

            <slot name="bottom">
                <BottomNav />
            </slot>

            <van-popup v-model:show="userStore.showAccount" round>
                <BottomModal title="Your balance info" @close="userStore.showAccount = false">
                    <template #content>
                        <BalanceInfo :account="$page.props.auth.user.account" />
                    </template>
                </BottomModal>
            </van-popup>
        </main>
        <!-- END AUTH -->
    </van-config-provider>

    <GradBeams />
    <GradBeams />
</template>
