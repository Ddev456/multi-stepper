import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { FormSchemaType } from "@/schema/schema";
import React from "react";
import { useFormContext } from "react-hook-form";

const PersonalInformation = () => {
  const { control } = useFormContext<FormSchemaType>();
  return (
    <div className="w-full grid grid-cols-4 gap-4">
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your first name"
                id="firstName"
                {...field}
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter Your last Name"
                id="lastName"
                {...field}
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                {...field}
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <PhoneInput
                international
                id="phone"
                defaultCountry="US"
                {...field}
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInformation;
