import { z } from "zod";
export const drugSchema = z.object({
    code: z.string(),
    catagory: z.string(),
    name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
    price: z.number(),
    unit: z.string(),
    unitf: z.number(),  
    prices: z.number(),  
    units: z.string(),
    description: z.string()
});

export type DrugSchema = z.infer<typeof drugSchema>;
