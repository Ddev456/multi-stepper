import ApplicationForm from "@/components/applicationForm/form";
import GardenPlannerForm from "@/components/gardenPlanner/GardenPlannerForm";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <GardenPlannerForm />
    </div>
  )
}