<script setup>
import { useForm } from "@inertiajs/vue3";
import { onMounted } from "vue";
import { useSiteStore } from "@/stores/site";
import { showSuccessToast, showNotify } from "vant";
import { handlePwdInput } from "@/utils";
import UserLayout from "@/layouts/UserLayout.vue";

const props = defineProps({
    defaultEmail: {
        type: String,
        default: "",
    },
    canResetPassword: Boolean,
    status: String,
});

const siteStore = useSiteStore();

const form = useForm({
    username: props.defaultEmail || "",
    password: props.defaultEmail ? "password" : "",
    remember: false,
});

const submit = () => {
    form.transform((data) => ({
        ...data,
        remember: form.remember ? "on" : "",
    })).post(route("login"), {
        onSuccess: () => {
            showNotify({
                message: "Login successful",
                type: "success",
                duration: 1000,
            });
        },
        onFinish: () => {
            form.reset("password");
        },
    });
};

onMounted(() => {
    handlePwdInput();
});
</script>

<template>
    <UserLayout title="Log in" guest-title="Sign In"
        guest-text="Fill your username and password to log in into your account.">
        <form @submit.prevent="submit" class="pt-8 flex flex-col gap-4 px-6">
            <div class="">
                <p class="text-g60 font-semibold text-sm pb-2">
                    Phone or Username
                </p>
                <div class="p-4 rounded-xl bg-g20 border border-g30">
                    <input v-model="form.username" type="text"
                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                        placeholder="Enter username or email" autocomplete="username" />
                </div>
                <InputError class="mt-2" :message="form.errors.username" />
            </div>

            <div class="">
                <p class="text-g60 font-semibold text-sm pb-2">Password</p>
                <div class="p-4 rounded-xl bg-g20 border border-g30 flex justify-between items-center pwd-input-group">
                    <input v-model="form.password" type="password"
                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm passwordField w-full pr-3"
                        placeholder="******" />
                    <p class="">
                        <i class="ph ph-eye-closed text-g60 passwordShow"></i>
                    </p>
                </div>
                <InputError class="mt-2" :message="form.errors.password" />
                <div class="flex justify-between items-center pt-3">
                    <div class="">
                        <label
                            class="checkbox style-c relative pl-6 cursor-pointer select-none flex justify-start items-center">
                            <input @change="form.remember = $event.target.checked" type="checkbox"
                                class="absolute opacity-0 cursor-pointer h-0 w-0" />
                            <span
                                class="checkbox__checkmark absolute top-0.5 left-0 h-4 w-4 border bg-r50 border-r75 rounded after:absolute after:left-[5px] after:top-[0px] after:w-[5px] after:h-[12px] after:border-t-0 after:border-r-[2px] after:border-b-[2px] after:border-l-0 after:rotate-45 after:opacity-0 after:duration-500"></span>
                            <span class="text-sm font-medium text-g60">Remember Password</span>
                        </label>
                    </div>
                    <div class="text-sm font-medium text-g60 underline">
                        <a href="#help_center" @click="siteStore.showHelpCenter = true">
                            Forgot password?
                        </a>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <Button type="submit" label="Log In" class="primaryButton w-full" unstyled :loading="form.processing" />
            </div>
        </form>

        <div class="pb-7 pt-10 px-6">
            <div class="border-t border-dashed flex justify-center items-center">
                <p class="text-sm font-semibold text-center -mt-[11px] bg-white w-fit px-3 text-g60">
                    Don't have an account
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-4 px-6">
            <Link :href="route('register')" class="text-sm font-semibold text-g60">
            <div
                class="flex justify-center items-center gap-3 p-4 rounded-full bg-g20 border border-g30 cursor-pointer">
                Sign Up Now
            </div>
            </Link>
        </div>
    </UserLayout>
</template>
