<script setup>
import { useForm } from "@inertiajs/vue3";

const emits = defineEmits(["sended"]);
const props = defineProps({
    user: {
        type: Object,
        default: null,
    },
});

const { username, email, phone, name } = props.user;
const { id, user_id, created_at, updated_at, ...info } = props.user?.info;

const form = useForm({
    phone,
    username,
    email,
    name,
    ...info
});

const send = () => {
    form.transform((data) => {
        return {
            section: "info",
            ...data,
        };
    });
    emits("sended", form);
};
</script>

<template>
    <div class="md:flex flex-wrap gap-2" v-if="user">
        <FloatLabel v-for="(item, index) in form.data()" :key="index" variant="on" class="mb-4">
            <InputText v-model="form[index]" :id="index" fluid />

            <label :for="index" class="uppercase">
                {{ index.replace("_", " ") }}
                <span class="lowercase" v-if="index == 'gender'">
                    (male, female, other)
                </span>
            </label>
        </FloatLabel>
    </div>

    <div class="flex justify-end">
        <Button label="Save" icon="pi pi-save" size="small" :loading="form.processing" @click="send" />
    </div>
</template>
