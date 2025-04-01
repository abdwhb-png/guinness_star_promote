<script setup>
import { useForm } from "@inertiajs/vue3";
import { showSuccessToast, showFailToast } from "vant";

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    username: props.user.username,
    email: props.user.email,
    phone: props.user.phone,
    gender: props.user.info.gender,
});

const submit = () => {
    form.put(route("user.info.update"), {
        preserveScroll: true,
        onSuccess: (page) => {
            showSuccessToast(page.props.flash.status);
        },
        onError: (errors) => {
            console.log(errors);
            showFailToast("Something went wrong, please check.");
        },
    });
};
</script>

<template>
    <form @submit.prevent="submit" class="flex flex-col gap-4 px-6">
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
            <p class="text-g60 font-semibold text-sm pb-2">Username</p>
            <div class="p-4 rounded-xl bg-g20 border border-g30">
                <input v-model="form.username" type="text"
                    class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                    placeholder="Enter Username" />
            </div>
            <InputError class="mt-2" :message="form.errors.username" />
        </div>

        <div class="">
            <p class="text-g60 font-semibold text-sm pb-2">Email</p>
            <div class="p-4 rounded-xl bg-g20 border border-g30">
                <input v-model="form.email" type="email"
                    class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                    placeholder="Enter Email" />
            </div>
            <InputError class="mt-2" :message="form.errors.email" />
        </div>


        <div class="">
            <p class="text-g60 font-semibold text-sm pb-2">Gender</p>
            <div class="p-4 rounded-xl bg-g20 border border-g30">
                <!-- <input
                    v-model="form.gender"
                    type="text"
                    class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                    placeholder="Enter your gender"
                /> -->
                <select v-model="form.gender"
                    class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm">
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <InputError class="mt-2" :message="form.errors.gender" />
        </div>

        <div class="w-full">
            <Button type="submit" label="Update" class="primaryButton w-full" unstyled :loading="form.processing" />
        </div>
    </form>
</template>
