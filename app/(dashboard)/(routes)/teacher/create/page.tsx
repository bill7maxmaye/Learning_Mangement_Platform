"use client";
import * as z from "zod"; //this package is used for form validation with zod library. It's a powerful and user-friendly schema declaration language.

import axios from "axios"; //this package is used for making http requests

import { zodResolver } from "@hookform/resolvers/zod"; //this package is used for form validation with zod
import { useForm } from "react-hook-form"; //this package is used for form validation and handling form submission with react-hook-form. It's not required, you can use your own implementation of form handling
import { useRouter } from "next/navigation"; //this package is used for navigation between pages.
import Link from "next/link"; //this package is used for creating links between pages.
import toast from "react-hot-toast"; //this package is used for displaying notifications.

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button"; //this package is used for creating buttons.
import { Input } from "@/components/ui/input"; //
import { ApiError } from "next/dist/server/api-utils"; //this package is used for handling errors.

const formSchema = z.object({
  //this is a schema for form validation with zod library
  title: z.string().min(1, { message: "Title is Required" }), //this is a schema for form validation of the title field. It checks if it's not empty and has at least one character. using Zod library. It checks if the data entered by user matches the rules defined in this schema and returns an error message if it doesn't
});

const CreatePage = () => {
  //this is a functional component for creating a new course page
  const router = useRouter(); //this is a hook for navigation between pages.
  const form = useForm<z.infer<typeof formSchema>>({
    //this is a hook for form validation and handling form submission with react-hook-form.
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState; //this is a hook for form validation and handling form submission with react-hook-form. It's used to check if the form is currently submitting and if it's valid.

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control} //this is a hook for form validation and handling form submission with react-hook-form. It's used to get the value of the form field.
              name="title"
              render={(
                { field } //this is a hook for form validation and handling form submission with react-hook-form. It's used to render the form field.
              ) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 ">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>

              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
