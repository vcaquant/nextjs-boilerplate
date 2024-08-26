"use server";

import { userAction } from "@/lib/safe-action";
import { put } from "@vercel/blob";
import { z } from "zod";

export const uploadImageAction = userAction(
  z.instanceof(FormData),
  async (formData: FormData) => {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file found in form data");
    }

    const name = file.name;

    const result = await put(name, file, {
      access: "public",
    });

    return result;
  }
);
