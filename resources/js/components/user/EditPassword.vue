<script setup>
import { useForm } from "@inertiajs/vue3";
import { watch, onMounted } from "vue";
import { showSuccessToast, showFailToast } from "vant";
import { handlePwdInput } from "@/utils";

const props = defineProps({
    type: {
        type: String,
        default: "login",
    },
});

const form = useForm({
    type: props.type,
    current_password: "",
    password: "",
    password_confirmation: "",
});

const submit = () => {
    form.put(route("user.password.update"), {
        preserveScroll: true,
        onSuccess: (page) => {
            showSuccessToast(page.props.flash.status);
            form.reset();
        },
        onError: (errors) => {
            showFailToast("Something went wrong, please check.");

            if (form.errors.password) {
                form.reset("password", "password_confirmation");
            }

            if (form.errors.current_password) {
                form.reset("current_password");
            }
        },
    });
};

onMounted(() => {
    handlePwdInput();
});

watch(
    () => props.type,
    () => {
        form.reset();
        form.clearErrors();
    }
);
</script>

<template>
    <form @submit.prevent="submit" class="flex flex-col gap-4 px-6">
        <div class="">
            <p class="text-g60 font-semibold text-sm pb-2">Current Password</p>
            <div
                class="p-4 rounded-xl bg-g20 border border-g30 flex justify-between items-center pwd-input-group"
            >
                <input
                    v-model="form.current_password"
                    type="password"
                    class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm passwordField w-full pr-3"
                    placeholder="******"
                />
                <p class="">
                    <i
                        class="ph ph-eye-closed text-g60 currentPasswordShow"
                    ></i>
                </p>
            </div>
            <InputError class="mt-2" :message="form.errors.current_password" />
        </div>
        <div class="">
            <p class="text-g60 font-semibold text-sm pb-2">New Password</p>
            <div
                class="p-4 rounded-xl bg-g20 border border-g30 flex justify-between items-center pwd-input-group"
            >
                <input
                    v-model="form.password"
                    type="password"
                    class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm passwordField w-full pr-3"
                    placeholder="******"
                />
                <p class="">
                    <i class="ph ph-eye-closed text-g60 passwordShow"></i>
                </p>
            </div>
            <InputError class="mt-2" :message="form.errors.password" />
        </div>
        <div class="">
            <p class="text-g60 font-semibold text-sm pb-2">
                Confirm New Password
            </p>
            <div
                class="p-4 rounded-xl bg-g20 border border-g30 flex justify-between items-center pwd-input-group"
            >
                <input
                    v-model="form.password_confirmation"
                    type="password"
                    class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm passwordField w-full pr-3 confirmPasswordField"
                    placeholder="******"
                />
                <p class="">
                    <i
                        class="ph ph-eye-closed text-g60 confirmPasswordShow"
                    ></i>
                </p>
            </div>
            <InputError
                class="mt-2"
                :message="form.errors.password_confirmation"
            />
        </div>
        <div class="w-full">
            <Button
                type="submit"
                label="Update Password"
                class="primaryButton w-full"
                unstyled
                :loading="form.processing"
            />
        </div>
    </form>
</template>
