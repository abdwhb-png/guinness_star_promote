<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const page = usePage();
const toast = useToast();

const props = defineProps({
    datas: Object,
});

const form = useForm(props.datas);

const submit = () => {
    form.put(route(page.props.routePrefix + "setting.update", props.datas.id), {
        preserveScroll: true,
        onSuccess: (page) => {
            toast.add({
                severity: "success",
                summary: page.props.flash.status,
                life: 5000,
            });
        },
    });
};

const editorHeight = ref(200);
</script>

<template>
    <div class="grid grid-cols-3 gap-4 mx-3">
        <div class=""></div>
        <div class="col-span-3">
            <div class="mb-4">
                <h5 class="fw-bold">Terms And Conditions</h5>
                <Editor v-model="form.tcs" :editorStyle="`height: ${editorHeight + 200}px`" />
            </div>
            <div class="mb-4">
                <h5 class="fw-bold">About Us</h5>
                <Editor v-model="form.about_us" :editorStyle="`height: ${editorHeight + 200}px`" />
            </div>
            <div v-if="form.faq !== null" class="mb-4">
                <h5 class="fw-bold">FAQ</h5>
                <Editor v-model="form.faq" :editorStyle="`height: ${editorHeight + 200}px`" />
            </div>
            <div v-if="form.reg_agree !== null" class="mb-4">
                <h5 class="fw-bold">Registration Agreement</h5>
                <Editor v-model="form.reg_agree" :editorStyle="`height: ${editorHeight}px`" />
            </div>

            <div class="flex justify-center">
                <Button label="Update" :loading="form.processing" @click="submit" icon="pi pi-check" type="button"
                    class="w-2/3" />
            </div>
        </div>
    </div>
</template>
