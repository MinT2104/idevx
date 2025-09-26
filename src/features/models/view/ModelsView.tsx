import React from "react";
import ModelHero from "../components/ModelHero";
import ModelListing from "../components/ModelListing";
import { ModelViewRecord } from "../services/models.service";
import {
  SlideUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/features/shared/components/ScrollAnimation";
import { CardHover } from "@/features/shared/components/HoverAnimation";

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
      <SlideUp delay={0.1}>
        <ModelHero models={initialModels} />
      </SlideUp>
      <SlideUp delay={0.2}>
        <ModelListing
          initialModels={initialModels}
          totalModels={totalModels}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </SlideUp>
    </div>
  );
};

export default ModelsView;
