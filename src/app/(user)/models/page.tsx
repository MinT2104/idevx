import ModelsView from "@/features/models/view/ModelsView";
import {
  getModelsForView,
  getBrands,
  getTypes,
} from "@/features/models/services/models.service";

// Force dynamic rendering to avoid build-time issues
export const dynamic = "force-dynamic";

const page = async () => {
  try {
    // Fetch data server-side - sử dụng hàm tối ưu hóa
    const [modelsData, brands, types] = await Promise.all([
      getModelsForView(1, 1000), // page 1, limit 1000 - chỉ fetch fields cần thiết
      getBrands(),
      getTypes(),
    ]);

    console.log(types);

    return (
      <ModelsView
        initialModels={modelsData.models}
        totalModels={modelsData.total}
        currentPage={modelsData.page}
        totalPages={modelsData.totalPages}
        brands={brands}
        types={types}
      />
    );
  } catch (error) {
    console.error("Error fetching models data:", error);
    // Fallback với empty data
    return (
      <ModelsView
        initialModels={[]}
        totalModels={0}
        currentPage={1}
        totalPages={0}
        brands={[]}
        types={[]}
      />
    );
  }
};

export default page;
