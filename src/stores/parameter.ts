import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IParameter,IParameterType, IParameterCreateDto, IParameterUpdateDto } from '@/data/parameter.model';


export const useParameterStore = defineStore('parameter', () => {
    const { getAccessTokenSilently } = useAuth0();
    const parameters = ref<IParameter[]>([]);
    const parameterTypes = ref<IParameterType[]>([]);

    async function getParameters(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            parameters.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };

    async function getParameterTypes(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/types`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            parameterTypes.value = await response.json();
        } catch (e) {
            console.error(e);
        }
    };

    async function createParameter(data: IParameterCreateDto): Promise<void> {
        console.log(data);
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            getParameters();
        } catch (e) {
            console.error(e);
        }
    };

    

    async function updateParameter(data: IParameterUpdateDto): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            getParameters();
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteParameter(parameterId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/${parameterId}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            getParameters();
        } catch (e) {
            console.error(e);
        }
    };

    return { parameters, parameterTypes, getParameterTypes, getParameters, createParameter, updateParameter, deleteParameter }
});
