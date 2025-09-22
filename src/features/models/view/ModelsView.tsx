import React from "react";
import ModelHero from "../components/ModelHero";
import ModelListing from "../components/ModelListing";
import { ModelViewRecord } from "../services/models.service";

interface ModelsViewProps {
  initialModels: ModelViewRecord[];
  totalModels: number;
  currentPage: number;
  totalPages: number;
  brands: string[];
  types: string[];
}

const ModelsView: React.FC<ModelsViewProps> = ({
  initialModels,
  totalModels,
  currentPage,
  totalPages,
  brands,
  types,
}) => {
  return (
    <div>
      <ModelHero models={initialModels} />
      <ModelListing
        initialModels={initialModels}
        totalModels={totalModels}
        currentPage={currentPage}
        totalPages={totalPages}
        brands={brands}
      />
    </div>
  );
};

export default ModelsView;
