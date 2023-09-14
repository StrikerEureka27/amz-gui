import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IFilter, IFilterType, IFilterCreateDto, IFilterUpdateDto } from '@/data/filter.model';

export const useFilterStore = defineStore('filter', () => {
    const { getAccessTokenSilently } = useAuth0();
    const filters = ref<IFilter[]>([]);
    const filtersTypes = ref<IFilterType[]>([]);

    async function getFilters(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            filters.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };

    async function getFilterTypes(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/types`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            filtersTypes.value = await response.json();
        } catch (e) {
            console.error(e);
        }
    };

    async function createFilter(data: IFilterCreateDto): Promise<void> {
        console.log(data);
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            getFilters();
        } catch (e) {
            console.error(e);
        }
    };

    async function updateFilter(data: IFilterUpdateDto): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            getFilters();
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteFilter(filterId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/${filterId}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            getFilters();
        } catch (e) {
            console.error(e);
        }
    };

    return { filters, filtersTypes, getFilters, createFilter, getFilterTypes, updateFilter, deleteFilter }
});