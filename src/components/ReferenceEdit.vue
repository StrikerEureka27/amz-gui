<script setup lang="ts" >
import { ref } from 'vue';
import { useReferenceStore } from '@/stores/reference';
import type { IReferenceCreateDto } from '@/data/reference.model';


const referenceStore = useReferenceStore();
const showReferenceCreate = ref<boolean>(false);
const props = defineProps(['reference']);
let reference = ref<IReferenceCreateDto>({
    name: '',
    header: '',
    value: null,
    type: 0,
    level: 1
});

reference = props.reference;

</script>
<template>
    <v-dialog width="auto" v-model="showReferenceCreate">
        <template v-slot:activator="{ props }">
            <v-btn class="mr-2" icon="mdi-pencil" size="small" variant="tonal" color="info"
                @click="showReferenceCreate = true"></v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Edit reference
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="showReferenceCreate = false"
                    size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <form>
                    <v-text-field v-model="reference.name" label="Name" variant="solo-filled" density="compact" clearable
                        required></v-text-field>
                    <v-text-field v-model="reference.header" label="Column index" variant="solo-filled" density="compact"
                        clearable required></v-text-field>
                    <v-text-field v-model="reference.value" label="Value" variant="solo-filled" density="compact" clearable
                        required></v-text-field>
                    <v-select v-model="reference.type" :items="referenceStore.referenceTypes" item-title="name"
                        item-value="id" label="Type" variant="solo-filled" density="compact" required></v-select>
                </form>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" variant="tonal"
                    @click="referenceStore.updateReference(reference); showReferenceCreate = false" block>update</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped ></style>