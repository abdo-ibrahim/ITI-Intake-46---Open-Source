import { ref } from "vue";

export function useApi<T>(baseUrl: string) {
  const data = ref<T | null>(null);
  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const handleRequest = async (requestFn: () => Promise<T>): Promise<T> => {
    isLoading.value = true;
    isError.value = false;

    try {
      const result = await requestFn();
      data.value = result;
      return result;
    } catch (err: any) {
      isError.value = true;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getAll = (): Promise<T> => {
    return handleRequest(async () => {
      const res = await fetch(baseUrl);

      if (!res.ok) {
        throw new Error(`GET ALL failed: ${res.status}`);
      }

      return await res.json();
    });
  };

  const getOne = (id: number | string): Promise<T> => {
    return handleRequest(async () => {
      const res = await fetch(`${baseUrl}/${id}`);

      if (!res.ok) {
        throw new Error(`GET ONE failed: ${res.status}`);
      }

      return await res.json();
    });
  };

  const update = (id: number | string, updatedObject: T): Promise<T> => {
    return handleRequest(async () => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedObject),
      });

      if (!res.ok) {
        throw new Error(`UPDATE failed: ${res.status}`);
      }

      return await res.json();
    });
  };

  return {
    data,
    isError,
    isLoading,
    getAll,
    getOne,
    update,
  };
}