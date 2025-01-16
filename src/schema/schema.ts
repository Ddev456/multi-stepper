import { z } from "zod";
import { isValidEmail } from "@/lib/utils";
import { isValidPhoneNumber } from "react-phone-number-input";
import { convertMetricsToBytes, FileExtension, getFormattedFileSize, getMimeTypes, MimeType } from "@/lib/files";

const EmailValidationSchema = z
  .string()
  .email()
  .superRefine(async (email, ctx) => {
    const isAvailable = await isValidEmail(email);
    if (!isAvailable) {
      ctx.addIssue({
        code: "custom",
        message: "Email is not valid",
      });
    }

    if (email) {
      const hasAddSign = email.includes("+");
      if (hasAddSign) {
        ctx.addIssue({
          code: "custom",
          message: "Email should not contain '+' sign",
        });
      }

      const isSubDomainEmail = email.split("@")[1].split(".").length > 2;
      if (isSubDomainEmail) {
        ctx.addIssue({
          code: "custom",
          message: "Email should not contain subdomains",
        });
      }
    }
  });

const jobSchema = z
  .object({
    title: z.string().min(2).max(70),
    company: z.string().min(2).max(90),
    from: z.date(),
    to: z.date(),
    description: z.string().min(2).max(500),
  })
  .refine((data) => !data.from || !data.to || data.from <= data.to, {
    message: "From date should be less than To date",
  });

  export const MAX_RESUME_SIZE_IN_BYTES = convertMetricsToBytes(10, "MB");
  export const VALID_RESUME_FILE_EXTENSIONS:FileExtension[] = [".pdf"]
  export const MAX_FILES = 2
  
  const ResumeValidationSchema = z
    .instanceof(File)
    .superRefine((file, ctx) => {
      if(file.size <= 0){
        ctx.addIssue({
          code:"custom",
          message:"Cannot upload empty file",
          path:["resume"]
        })
      }
  
      if(file.size >= MAX_RESUME_SIZE_IN_BYTES){
        ctx.addIssue({
          code:"custom",
          message:`File size cannot be greater than ${getFormattedFileSize(MAX_RESUME_SIZE_IN_BYTES)}`,
          path:["resume"]
        })
      }
  
  
      if(!getMimeTypes(VALID_RESUME_FILE_EXTENSIONS).includes(file.type as MimeType)){
        ctx.addIssue({
          code:"custom",
          message:`Only ${VALID_RESUME_FILE_EXTENSIONS.join(", ")} type are allowed`,
          path:["resume"]
        })
      }
    })
  

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(70, { message: "First name must be at most 70 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(70, { message: "Last name must be at most 70 characters long" }),
  email: EmailValidationSchema,
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" })
    .max(70, { message: "Country must be at most 70 characters" }),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters" })
    .max(70, { message: "State must be at most 70 characters" }),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters" })
    .max(70, { message: "City must be at most 70 characters" }),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters" })
    .max(100, { message: "Address must be at most 100 characters" }),
  zip: z.string().regex(/^\d{4,10}$/, {
    message: "ZIP code must be between 4 and 10 digits",
  }),
  timezone: z.string().optional(),
  jobs: z.array(jobSchema).min(1, {
    message: "At least one job should be added",
  }),
  github: z
    .string()
    .url({ message: "Invalid URL format" })
    .refine((url) => url.includes("github"), {
      message: "URL should be a GitHub profile",
    }),
 resume: z.array(ResumeValidationSchema),
 portfolio: z.string().url({ message: "Invalid URL format" }),
});

export type FormSchemaType = z.infer<typeof formSchema>;
