"use client";

import { formSchema, FormSchemaType } from '@/schema/schema';
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { title } from 'process';
import PersonalInformation from './steps/personalInformation';
import SocialLinks from './steps/socialLinks';
import ResumeUploader from './steps/resumeUploader';
import WorkExperience from './steps/workExperience';
import AddressInformation from './steps/addressInformation';
import { Form } from '../ui/form';
import { FormControlsProvider } from './hooks/useForm';
import FormHeader from './formHeader';
import FormFooter from './formFooter';
import RenderComponent from './renderComponent';


export type Step = {
    id: string;
    title: string;
    description: string;
    component: () => React.JSX.Element;
    inputs: (keyof FormSchemaType)[];
}

const steps = [
    {
        id: "1",
        title: "Personal Information",
        description: "Tell us about yourself",
        component: PersonalInformation,
        inputs: ["firstName", "lastName", "email", "phone"]
    },
    {
        id: "2",
        title: "Address",
        description: "Enter your address information.",
        component: AddressInformation,
        inputs: ["country", "state", "city", "address", "zip", "timezone"],
      },
      {
        id: "3",
        title: "Work Experience",
        description:
          "Enter your work experience. This information will be used to evaluate your application.",
        component: WorkExperience,
        inputs: ["jobs"],
      },
      {
        id: "4",
        title: "Social Links",
        description:
          "Enter your social links. This information helps us to know more about you.",
        component: SocialLinks,
        inputs: ["github", "portfolio"],
      },
      {
        id: "5",
        title: "Resume",
        description:
          "Upload your resume. This information helps us to know more about you.",
        component: ResumeUploader,
        inputs: ["resume"],
      },
] satisfies Step[];

const ApplicationForm = () => {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            country: "",
            state: "",
            city: "",
            address: "",
            zip: "",
            jobs: [],
            github: "",
            portfolio: "",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
    })

    const onSubmit = (values: FormSchemaType) => {
        console.log(values);
    }

  return (
    <FormControlsProvider steps={steps}>
        <Form {...form}>
           <form
           onSubmit={form.handleSubmit(onSubmit)}
           className='space-y-8 h-svh py-20 flex flex-col justify-between'
           >
           <FormHeader steps={steps} />
              <RenderComponent steps={steps} />
           <FormFooter steps={steps} />
           </form>
        </Form>
    </FormControlsProvider>
  )
}

export default ApplicationForm