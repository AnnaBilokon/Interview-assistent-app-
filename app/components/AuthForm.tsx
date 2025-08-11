"use client";
import React from "react";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(1, "Name is required")
        : z.string().optional(),
    email: z.email(),
    password: z.string().min(3),
  });
};

function AuthForm({ type }: { type: FormType }) {
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        console.log("Signing up with:", values);
      } else {
        console.log("Signing in with:", values);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`There was an error submitting the form: ${error}`);
    }

    const isSignIn = type === "sign-in";

    return (
      <div className="card-border lg:m-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <div className="flex flex-row gap-2 justify-center">
            <Image src="/logo.svg" alt="logo" height={32} width={38} />
            <h2 className="text-primary-100">Interview Buddy</h2>
          </div>
          <h3>Practice job interview with AI</h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 mt-4 form"
            >
              {!isSignIn && (
				<FormField
			  )}
              <p>Email</p>
              <p>Password</p>
              <Button className="btn" type="submit">
                {isSignIn ? "Sign In" : "Create an account"}
              </Button>
            </form>
          </Form>

          <p className="text-center">
            {isSignIn ? "No account yet?" : "Have an account already?"}
            <Link
              href={!isSignIn ? "/sign-up" : "/sign-in"}
              className="font-bold text-user-primary ml-1"
            >
              {" "}
              {!isSignIn ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default AuthForm;
