<script setup>
import { ref, reactive, nextTick, onMounted } from "vue";
import { showFailToast } from "vant";
import { handlePwdInput } from "@/utils";

const emit = defineEmits(["confirmed"]);

const props = defineProps({
    title: {
        type: String,
        default: "Confirm Password",
    },
    content: {
        type: String,
        default: "For your security, please confirm your password to continue.",
    },
    button: {
        type: String,
        default: "Confirm",
    },
    alwaysCheck: {
        type: Boolean,
        default: false,
    },
    pwdType: {
        type: String,
        default: "login",
    },
});

const inputPassword = defineModel({
    type: String,
});

const confirmingPassword = ref(false);

const form = reactive({
    password: inputPassword,
    error: "",
    processing: false,
});

const startConfirmingPassword = () => {
    axios
        .post(route("password.confirmation"), { type: props.pwdType })
        .then((response) => {
            if (!props.alwaysCheck && response.data.confirmed) {
                emit("confirmed");
            } else {
                confirmingPassword.value = true;
            }
        });
};

const confirmPassword = () => {
    form.processing = true;

    axios
        .post(route("password.confirm"), {
            type: props.pwdType,
            password: form.password,
        })
        .then(() => {
            form.processing = false;
            const pwd = form.password;
            closeModal();
            nextTick().then(() => emit("confirmed", pwd));
        })
        .catch((error) => {
            form.processing = false;
            form.error = error.response.data.errors.password[0];
        });
};

const closeModal = () => {
    confirmingPassword.value = false;
    form.password = "";
    form.error = "";
};

onMounted(() => {
    handlePwdInput();
});
</script>

<template>
    <div>
        <span @click="startConfirmingPassword">
            <slot />
        </span>

        <van-popup v-model:show="confirmingPassword" round @closed="closeModal">
            <BottomModal :title="title" @close="confirmingPassword = false">
                <template #content>
                    <div class="md:p-16 line-bt">
                        <p class="mt-2 text-center text-large">
                            <i class="pi pi-lock"></i>
                            {{ props.content }}
                        </p>
                        <form @submit.prevent="confirmPassword" class="flex flex-col gap-4 px-6">
                            <div class="mt-3">
                                <p class="text-g60 font-semibold text-sm pb-2">
                                    Password
                                </p>
                                <div
                                    class="p-4 rounded-xl bg-g20 border border-g30 flex justify-between items-center pwd-input-group">
                                    <input v-model="form.password" type="password"
                                        class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm passwordField w-full pr-3"
                                        placeholder="******" />
                                    <p class="">
                                        <i class="ph ph-eye-closed text-g60 currentPasswordShow"></i>
                                    </p>
                                </div>
                                <InputError class="mt-2" :message="form.error" />
                            </div>
                            <div class="w-full">
                                <Button type="submit" label="Submit" class="primaryButton w-full" unstyled
                                    :loading="form.processing" />
                            </div>
                        </form>
                    </div>
                </template>
            </BottomModal>
        </van-popup>
    </div>
</template>
