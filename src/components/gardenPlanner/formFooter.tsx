import React from "react";
import { Step } from "./GardenPlannerForm";
import { useFormControls } from "./hooks/useForm";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

const FormFooter = ({ steps }: { steps: Step[] }) => {
  const {
    handleBack,
    handleNext,
    hasNextPage,
    hasPreviousPage,
    isFinalPage,
    currentPageIndex,
  } = useFormControls();
  const { trigger } = useFormContext();

  if (isFinalPage) {
    return (
      <div className="w-full flex justify-between px-7">
        <Button type="button" onClick={handleBack} disabled={!hasPreviousPage}>
          Retour
        </Button>
        <Button type="submit">Valider</Button>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-between px-7">
      <Button onClick={handleBack} type="button" disabled={!hasPreviousPage}>
        Retour
      </Button>
      <Button
        onClick={async () => {
          const res = await trigger(steps[currentPageIndex].inputs, {
            shouldFocus: true,
          });
          if (!res) {
            return;
          }
          handleNext();
        }}
        type="button"
        disabled={!hasNextPage}
      >
        Suivant
      </Button>
    </div>
  );
};

export default FormFooter;
