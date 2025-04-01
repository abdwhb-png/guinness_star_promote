<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { ref, watch } from "vue";
import { useToast } from "primevue";

const props = defineProps({
    item: {
        type: Object,
        required: false,
        default: null,
    },
    id: {
        type: Number,
        default: null,
    },
});

const emits = defineEmits(["hide", "updated"]);

const page = usePage();

const visible = ref(props.show);

const toast = useToast();

console.lo;

const form = useForm({
    amount: null,
});

const submit = () => {
    form.put(
        route(`${page.props.routePrefix}set-negative`, props.item.pivot_id),
        {
            onSuccess: (page) => {
                toast.add({
                    severity: "success",
                    summary: page.props.flash.status,
                    detail:
                        "Negative balance updated for deal " + props.item.name,
                    life: 5000,
                });

                emits("updated", form.amount);

                visible.value = false;
            },
        }
    );
};

watch(
    () => props.id,
    (newId) => {
        visible.value = newId !== null;
        form.amount = props.item?.pivot.frozen
            ? props.item?.pivot.frozen * -1
            : null;
    },
    { immediate: true }
);
</script>

<template>
    <div>
        <Dialog
            @hide="
                form.reset();
                emits('hide');
            "
            v-model:visible="visible"
            :header="`Set negative balance for deal ${item?.name || 'N/A'}`"
            position="bottomright"
            :draggable="false"
            modal
            :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
            <Message severity="secondary" closable
                >If you want to remove the negative balance, click on set null
                and then save.</Message
            >
            <div class="my-10">
                <FloatLabel class="w-full">
                    <InputGroup>
                        <InputNumber
                            v-model="form.amount"
                            locale="en-US"
                            :min-fraction-digits="2"
                            prefix="$ "
                            :step="10"
                            :show-buttons="true"
                            :min="0"
                            id="amount"
                            class="flex-auto"
                            autocomplete="off"
                        />
                        <InputGroupAddon>
                            <Button
                                @click="form.amount = null"
                                type="button"
                                label="Set Null"
                                icon="pi pi-times"
                                severity="secondary"
                            />
                        </InputGroupAddon>
                    </InputGroup>
                    <label for="amount">Amount</label>
                </FloatLabel>
            </div>
            <div class="flex justify-end gap-2">
                <Button
                    type="button"
                    label="Cancel"
                    severity="secondary"
                    @click="visible = false"
                ></Button>
                <Button
                    type="button"
                    label="Save"
                    :loading="form.processing"
                    @click="submit"
                ></Button>
            </div>
        </Dialog>
    </div>
</template>
