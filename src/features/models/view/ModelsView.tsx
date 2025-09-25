import React from "react";
import ModelHero from "../components/ModelHero";
import ModelListing from "../components/ModelListing";
import { ModelViewRecord } from "../services/models.service";

interface ModelsViewProps {
  initialModels: ModelViewRecord[];
  totalModels: number;
  currentPage: number;
  totalPages: number;
}

const ModelsView: React.FC<ModelsViewProps> = ({
  initialModels,
  totalModels,
  currentPage,
  totalPages,
}) => {
  return (
    <div>
      <ModelHero models={initialModels} />
      <ModelListing
        initialModels={initialModels}
        totalModels={totalModels}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ModelsView;
