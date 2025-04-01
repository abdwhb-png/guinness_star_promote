<template>
    <div class="flex flex-col gap-3">
        <Message severity="secondary" closable
            >Item that have empty url won't be displayed</Message
        >

        <DataTable
            v-model:editingRows="editingRows"
            :value="list"
            editMode="row"
            dataKey="id"
            @row-edit-save="onRowEditSave"
            :pt
        >
            <Column
                :rowEditor="true"
                header="Edit"
                style="width: 10%"
                bodyStyle="text-align:center"
            ></Column>

            <Column field="title" header="Title" style="width: 30%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
            </Column>

            <Column field="url" header="URL" style="width: 60%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import { useToast } from "primevue/usetoast";
import { useForm } from "@inertiajs/vue3";
import { pt } from "@/utils/dataTable";

export default {
    props: {
        datas: { type: Object, required: true },
        canEdit: { type: Number, default: 1 },
    },

    setup() {
        return { toast: useToast() };
    },

    data(props) {
        return {
            list: props.datas,
            editingRows: [],
            pt: pt,
        };
    },

    methods: {
        async onRowEditSave(event) {
            const { data, index, newData } = event;

            if (data.title == newData.title && data.url == newData.url) return;

            const form = useForm({
                title: newData.title,
                url: newData.url,
            });

            form.put(
                route(
                    this.$page.props.routePrefix + "cservice.update",
                    data.id
                ),
                {
                    preserveScroll: true,
                    onSuccess: (page) => {
                        this.toast.add({
                            severity: "success",
                            summary: page.props.flash.status,
                            life: 5000,
                        });
                        this.list[index] = newData;
                    },
                }
            );
        },
    },
};
</script>
