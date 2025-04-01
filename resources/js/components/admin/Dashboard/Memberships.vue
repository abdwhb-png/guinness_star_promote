<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { useToast } from "primevue/usetoast";

// Props
defineProps({
    datas: { type: Object, required: true },
});

const page = usePage();
const toast = useToast();

const form = useForm({});

const submit = (item) => {
    form.transform((data) => item).put(
        route(page.props.routePrefix + "membership.update", item.id),
        {
            preserveScroll: true,
            onSuccess: (page) => {
                toast.add({
                    severity: "success",
                    summary: page.props.flash.status,
                    life: 5000,
                });
            },
        }
    );
};
</script>

<template>
    <div class="w-full md:w-1/2 mx-auto shadow-xl">
        <Accordion value="" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
            <AccordionPanel
                v-for="(item, index) in datas"
                v-bind:key="index"
                :value="item.id.toString()"
            >
                <AccordionHeader>
                    <span class="flex items-center gap-2 w-full">
                        <Avatar :image="item.image" />
                        <span class="font-bold whitespace-nowrap text-lg">{{
                            item.levelName
                        }}</span>
                    </span>
                </AccordionHeader>
                <AccordionContent>
                    <div class="flex gap-4 justify-between mb-3">
                        <div class="">
                            <label for="" class="mx-2">Level Name :</label>
                            <InputText v-model="item.levelName" fluid />
                        </div>
                        <div class="">
                            <label for="" class="mx-2">Price :</label>
                            <InputNumber
                                fluid
                                v-model="item.price"
                                inputId="minmaxfraction"
                                :minFractionDigits="2"
                                :maxFractionDigits="5"
                            />
                        </div>
                    </div>
                    <div class="flex gap-4 justify-between mb-3">
                        <div class="">
                            <label for="" class="mx-2">Profit Ratio :</label>
                            <InputNumber
                                v-model="item.profit_ratio"
                                fluid
                                inputId="percent"
                                prefix="% "
                                :min="0.1"
                                :step="0.1"
                                :max="100"
                                mode="decimal"
                                showButtons
                            />
                        </div>
                        <div class="">
                            <label for="" class="mx-2">Max Deals :</label>
                            <InputNumber
                                v-model="item.max_tasks"
                                fluid
                                inputId="maxTasks"
                                showButtons
                                :min="20"
                            />
                        </div>
                    </div>
                    <div class="flex gap-4 justify-between mb-3">
                        <div class="">
                            <label for="" class="mx-2">Max Gain :</label>
                            <InputNumber
                                v-model="item.max_gain"
                                fluid
                                inputId="minmaxfraction"
                                :minFractionDigits="2"
                                :maxFractionDigits="5"
                            />
                        </div>

                        <div class="">
                            <label for="" class="mx-2">Level Weight :</label>
                            <InputNumber
                                v-model="item.levelWeight"
                                fluid
                                inputId="levelWeight"
                                showButtons
                                :min="1"
                                :max="10"
                            />
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="" class="mx-2">Description :</label>
                        <Editor
                            v-model="item.description"
                            editorStyle="height: 150px"
                        />
                    </div>
                    <div class="row">
                        <Button
                            label="UPDATE"
                            @click="submit(item)"
                            :disabled="!$page.props.canEdit"
                            size="small"
                        />
                    </div>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
</template>
