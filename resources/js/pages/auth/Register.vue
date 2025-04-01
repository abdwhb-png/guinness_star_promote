<script setup>
import { useForm } from "@inertiajs/vue3";
import { onMounted } from "vue";
import { useSiteStore } from "@/stores/site";
import { showNotify } from "vant";
import { handlePwdInput } from "@/utils";
import UserLayout from "@/layouts/UserLayout.vue";

const siteStore = useSiteStore();

const referral = route().params.ref || null;

const form = useForm({
    phone: "",
    password: "",
    password_confirmation: "",
    invitation_code: referral,
    // username: "",
    // email: "",
    // withdrawal_password: "",
    terms: false,
});

const submit = () => {
    form.post(route("register"), {
        onError: () => {
            showNotify("Something went wrong, please check the fileds.");
        },
        onFinish: () => form.reset("password", "password_confirmation"),
    });
};

onMounted(() => {
    handlePwdInput();
});
</script>

<template>
    <UserLayout title="Register" guestTitle="Create Account" guestText="Signing up is easy. It only takes a few steps.">
        <form @submit.prevent="submit" class="pt-8 flex flex-col gap-4 px-6">
            <div class="hidden">
                <p class="text-g60 font-semibold text-sm pb-2">Username</p>
                <div class="p-4 rounded-xl bg-g20 border border-g30">
                    <input v-model="form.username" type="text"
                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                        placeholder="Enter a username" />
                </div>
                <InputError class="mt-2" :message="form.errors.username" />
            </div>
            <div class="hidden">
                <p class="text-g60 font-semibold text-sm pb-2">Email</p>
                <div class="p-4 rounded-xl bg-g20 border border-g30">
                    <input v-model="form.email" type="email"
                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                        placeholder="Enter your email address" />
                </div>
                <InputError class="mt-2" :message="form.errors.email" />
            </div>
            <div class="">
                <p class="text-g60 font-semibold text-sm pb-2">Phone Number</p>
                <div class="p-4 rounded-xl bg-g20 border border-g30">
                    <input v-model="form.phone" type="text"
                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                        placeholder="Enter your phone number" />
                </div>
                <InputError class="mt-2" :message="form.errors.phone" />
            </div>
            <div class="">
                <p class="text-g60 font-semibold text-sm pb-2">
                    Password
                </p>
                <div class="p-4 rounded-xl bg-g20 border border-g30 flex justify-between items-center pwd-input-group">
                    <input v-model="form.password" type="password"
                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm passwordField w-full pr-3"
                        placeholder="******" />
                    <p class="">
                        <i class="ph ph-eye-closed text-g60 passwordShow"></i>
                    </p>
                </div>
                <InputError class="mt-2" :message="form.errors.password" />
            </div>
            <div class="">
                <p class="text-g60 font-semibold text-sm pb-2">
                    Confirm Password
                </p>
                <div class="p-4 rounded-xl bg-g20 border border-g30 flex justify-between items-center pwd-input-group">
                    <input v-model="form.password_confirmation" type="password"
                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm passwordField w-full pr-3 confirmPasswordField"
                        placeholder="******" />
                    <p class="">
                        <i class="ph ph-eye-closed text-g60 confirmPasswordShow"></i>
                    </p>
                </div>
                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>
            <div class="hidden">
                <p class="text-g60 font-semibold text-sm pb-2">
                    Withdrawal Password
                </p>
                <div class="p-4 rounded-xl bg-g20 border border-g30 flex justify-between items-center pwd-input-group">
                    <input v-model="form.withdrawal_password" type="password"
                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm passwordField w-full pr-3"
                        placeholder="******" />
                    <p class="">
                        <i class="ph ph-eye-closed text-g60 withdrawalPasswordShow"></i>
                    </p>
                </div>
                <InputError class="mt-2" :message="form.errors.withdrawal_password" />
            </div>
            <div class="">
                <p class="text-g60 font-semibold text-sm pb-2">
                    Invidation Code
                </p>
                <div class="p-4 rounded-xl bg-g20 border border-g30">
                    <input v-model="form.invitation_code" type="text"
                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                        placeholder="Enter the invitation code" />
                </div>
                <InputError class="mt-2" :message="form.errors.invitation_code" />
            </div>
            <div class="flex justify-between items-center">
                <div class="">
                    <label
                        class="checkbox style-c relative pl-6 cursor-pointer select-none flex justify-start items-center">
                        <input @change="form.terms = $event.target.checked" type="checkbox"
                            class="absolute opacity-0 cursor-pointer h-0 w-0" />
                        <span
                            class="checkbox__checkmark absolute top-0.5 left-0 h-4 w-4 border bg-r50 border-r75 rounded after:absolute after:left-[5px] after:top-[0px] after:w-[5px] after:h-[12px] after:border-t-0 after:border-r-[2px] after:border-b-[2px] after:border-l-0 after:rotate-45 after:opacity-0 after:duration-500"></span>
                        <span class="text-sm font-medium text-g60">
                            I have read and agree to the
                            <a href="javascript:void(0);" @click="siteStore.showTCS = true" class="underline">
                                terms and conditions
                            </a>
                        </span>
                    </label>
                    <InputError class="mt-2" :message="form.errors.terms" />
                </div>
            </div>
            <div class="w-full">
                <Button type="submit" label="Sign Up" class="primaryButton w-full" unstyled
                    :loading="form.processing" />
            </div>
        </form>

        <div class="pb-7 pt-10 px-6">
            <div class="border-t border-dashed flex justify-center items-center">
                <p class="text-sm font-semibold text-center -mt-[11px] bg-white w-fit px-3 text-g60">
                    Already registered ?
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-4 px-6">
            <Link :href="route('login')" class="text-sm font-semibold text-g60">
            <div
                class="flex justify-center items-center gap-3 p-4 rounded-full bg-g20 border border-g30 cursor-pointer">
                Sign In
            </div>
            </Link>
        </div>
    </UserLayout>
</template>
