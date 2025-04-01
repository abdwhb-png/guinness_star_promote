<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { useToast } from "primevue/usetoast";
import PaymentMethodForm from "@/components/admin/PaymentMethodForm.vue";

const page = usePage();
const toast = useToast();

const props = defineProps({
    datas: Object,
});

const form = useForm({});

const submit = (item) => {
    form.transform((data) => item).put(
        route(page.props.routePrefix + "pmethod.update", item.id),
        {
            onSuccess: () => {
                toast.add({
                    severity: "success",
                    summary: item.name + " payment method has been updated",
                    life: 5000,
                });
            },
        }
    );
};
</script>

<template>
    <Accordion value="">
        <AccordionPanel v-for="(item, index) in datas" :key="index" :value="index">
            <AccordionHeader>
                <div class="flex items-center gap-2">
                    <Avatar :image="item.image_url" />
                    {{ item.name }}
                </div>
            </AccordionHeader>
            <AccordionContent>
                <PaymentMethodForm :data="item" />
                <Button label="Save" icon="pi pi-save" size="small" :loading="form.processing" @click="submit(item)" />
            </AccordionContent>
        </AccordionPanel>
    </Accordion>
</template>
