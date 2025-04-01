<script setup>
import { useForm } from "@inertiajs/vue3";
import { useUserStore } from "@/stores/user";
import { showToast, showFailToast } from "vant";
import AskForPassword from "@/Components/User/AskForPassword.vue";

const userStore = useUserStore();

const form = useForm({
    password: null,
});

const logoutOther = (password) => {
    form.transform((data) => ({
        ...data,
        password: password,
    })).post(route("user.sessions.logout-other"), {
        preserveScroll: true,
        onSuccess: (page) => {
            showToast(page.props.flash.status);
            userStore.fetchSessions();
        },
        onError: (errors) => {
            showFailToast(errors.password);
        },
    });
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="pb-2">
            <AskForPassword
                @confirmed="logoutOther"
                :alwaysCheck="true"
                :pwdType="'login'"
            >
                <Button
                    label="Logout from other devices"
                    severity="secondary"
                    :disabled="userStore.data.sessions.length < 2"
                    class="w-full !py-2"
                    :loading="form.processing"
                />
            </AskForPassword>
        </div>
        <div
            v-for="(session, index) in userStore.data.sessions"
            :key="index"
            class="border border-g30 rounded-xl p-4"
        >
            <div
                class="flex justify-between items-center border-b border-dashed border-g30 pb-3"
            >
                <div class="flex justify-start items-center gap-2">
                    <p class="text-sm font-medium text-g60">
                        {{
                            `${session.device.platform} - ${session.device.browser}`
                        }}
                    </p>
                    <p
                        v-if="session.is_current_device"
                        class="text-xs text-g50 py-0.5 px-1 bg-g20 border border-g30 rounded-md"
                    >
                        This Device
                    </p>
                </div>
                <button>
                    <i
                        class="ph text-g60 text-xl"
                        :class="
                            session.device.desktop
                                ? 'ph-desktop'
                                : 'ph-device-mobile'
                        "
                    ></i>
                </button>
            </div>
            <p
                class="flex justify-start items-center gap-1 text-g50 text-xs pt-3"
            >
                <i class="ph ph-map-pin"></i>{{ session.ip_address }}
            </p>
            <p
                class="flex justify-start items-center gap-1 text-g50 text-xs pt-2"
            >
                <i class="ph ph-calendar-blank"></i>{{ session.last_active }}
            </p>
        </div>
    </div>
</template>
