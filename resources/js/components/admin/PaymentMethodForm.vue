<template>
    <div class="flex-none md:flex gap-4">
        <FloatLabel variant="in" class="mb-4">
            <InputText :id="'label_' + item.id" v-model="item.label" fluid />
            <label :for="'label_' + item.id">Label</label>
        </FloatLabel>
        <FloatLabel variant="in" class="mb-4">
            <InputText :id="'name_' + item.id" v-model="item.name" fluid />
            <label :for="'name_' + item.id">Name</label>
        </FloatLabel>
    </div>

    <div v-if="item.type == 'momo'" class="flex-none md:flex gap-4">
        <FloatLabel variant="in" class="mb-4">
            <InputText :id="'owner_' + item.id" v-model="item.owner" fluid />
            <label :for="'owner_' + item.id">Owner Name</label>
        </FloatLabel>
        <FloatLabel variant="in" class="mb-4">
            <InputText :id="'number_' + item.id" v-model="item.phone_number" fluid />
            <label :for="'number_' + item.id">Phone number</label>
        </FloatLabel>
    </div>

    <FloatLabel v-if="item.type == 'crypto'" variant="in" class="mb-4">
        <InputText :id="'address_' + item.id" v-model="item.address" fluid />
        <label :for="'address_' + item.id">Wallet Address</label>
    </FloatLabel>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    data: Object,
});

const item = ref(props.data);
if (!props.data.label) {
    item.value.label = props.data.method?.label;
}
if (!props.data.name) {
    item.value.name = props.data.method?.name;
}
</script>