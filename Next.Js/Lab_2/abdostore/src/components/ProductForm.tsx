import { useActionState } from "react";
import { Product } from "@/types/index";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

type ActionState = {
  success: boolean;
  message: string;
  data?: any;
};

export default function ProductForm({ product, onSuccess }: { product?: Product, onSuccess?: () => void }) {
  const isEditing = !!product;
  const router = useRouter();

  const submitAction = async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
    const data = {
      title: formData.get("title") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as string,
      brand: formData.get("brand") as string,
      description: formData.get("description") as string,
    };

    const url = isEditing ? `/api/products/${product.id}` : `/api/products`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      
      if (res.ok) {
        toast.success(isEditing ? "Product updated!" : "Product created!");
        if (onSuccess) onSuccess();
        router.replace(router.asPath); // Refresh SSR data
        return { success: true, message: "Success", data: result.data };
      } else {
        toast.error(result.message || result.error || "An error occurred");
        return { success: false, message: result.message || result.error || "An error occurred" };
      }
    } catch (e: any) {
      toast.error(e.message);
      return { success: false, message: e.message };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, { success: false, message: "" });

  return (
    <form action={formAction} className="space-y-4 bg-white p-6 rounded shadow border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{isEditing ? "Edit Product" : "Add New Product"}</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" name="title" defaultValue={product?.title || ""} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" defaultValue={product?.description || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={3}></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="price" defaultValue={product?.price || ""} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" name="category" defaultValue={product?.category || ""} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        <input type="text" name="brand" defaultValue={product?.brand || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <button disabled={isPending} type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          {isPending ? "Saving..." : (isEditing ? "Update Product" : "Create Product")}
        </button>
      </div>
      
      {state.message && !state.success && (
        <p className="text-red-500 text-sm mt-2 font-medium">{state.message}</p>
      )}
    </form>
  );
}
