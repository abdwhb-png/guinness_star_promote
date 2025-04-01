<script setup>
import { ref, watch } from "vue";
import { useForm } from "@inertiajs/vue3";
import { useToast } from "primevue/usetoast";

const props = defineProps({
    item: {
        type: Object,
        default: null,
    },
    categories: {
        type: Array,
        default: () => [],
    },
});

const emits = defineEmits(["created", "updated"]);

const toast = useToast();
const fileName = ref(null);

const form = useForm({
    _method: props.item ? "PUT" : "POST",
    category: null,
    name: null,
    popularity: null,
    display_price: null,
    spotify_url: null,
    photo: null,
    description: null,
});

const onFileChange = (e) => {
    const file = e.target.files[0];
    fileName.value = file.name;
    form.photo = file;
};

const submit = () => {
    toast.removeGroup("editDeal");
    const url = props.item ? route("deal.update", props.item.id) : route("deal.store");

    form.post(url, {
        preserveScroll: true,
        onSuccess: (page) => {
            toast.add({
                summary: page.props.flash.status,
                severity: "success",
                life: 1000 * 3,
            });
            emits(props.item ? "updated" : "created");
        },
    });
};

watch(() => props.item, (newItem) => {
    if (newItem) {
        form.category = newItem.category;
        form.name = newItem.name;
        form.popularity = newItem.popularity;
        form.display_price = newItem.display_price;
        form.spotify_url = newItem.spotify_url;
        form.image = newItem.image;
        form.description = newItem.description;

        fileName.value = newItem.image ? newItem.image.split("/").pop() : null;
    }
}, { immediate: true, deep: true });
</script>

<template>
    <div>
        <form @submit.prevent="submit" class="flex flex-col gap-4 mt-3">
            <div class="flex flex-wrap space-x-3">
                <FloatLabel variant="on" class="">
                    <InputText v-model="form.name" id="name" fluid />
                    <label for="name">Deal Name</label>
                </FloatLabel>

                <FloatLabel variant="on" class="">
                    <InputNumber :min="1" :max="100" :show-buttons="true" v-model="form.popularity" id="popularity"
                        fluid />
                    <label for="popularity">Popularity</label>
                </FloatLabel>

                <FloatLabel variant="on" class="">
                    <InputNumber v-model="form.display_price" id="display_price" prefix="$ " :minFractionDigits="2"
                        :maxFractionDigits="2" />
                    <label for="display_price">Display Price</label>
                </FloatLabel>
            </div>

            <div class="flex space-x-3">
                <FloatLabel variant="on" class="min-w-56">
                    <Select v-model="form.category" id="category" :options="categories" fluid />
                    <label for="category">Deal Category</label>
                </FloatLabel>
                <FloatLabel variant="on" class="grow">
                    <IconField>
                        <InputIcon class="pi pi-link" />
                        <InputText v-model="form.spotify_url" id="spotify_url" fluid />
                    </IconField>
                    <label for="spotify_url">Url</label>
                </FloatLabel>
            </div>


            <input type="file" ref="photo" @input="onFileChange" class="hidden" accept="image/*" />
            <FloatLabel variant="on" class="">
                <IconField>
                    <InputIcon class="pi pi-image" />
                    <InputText v-model="fileName" id="image" @click="$refs.photo.click()" fluid readonly />
                </IconField>
                <label for="image">Deal Image</label>
            </FloatLabel>

            <div class="">
                <label for="description">Deal Description</label>
                <Editor v-model="form.description" id="description" :editorStyle="`height: 200px`" />
            </div>

            <ProgressBar v-if="form.progress" :value="form.progress.percentage" />
            <div class="flex justify-center">
                <Button label="Save" icon="pi pi-save" :loading="form.processing" class="w-1/2" type="submit" />
            </div>
        </form>
    </div>
</template>
