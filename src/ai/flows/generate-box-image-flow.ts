'use server';
/**
 * @fileOverview A flow to generate images for veggie boxes.
 *
 * - generateBoxImage - A function that generates an image for a veggie box.
 * - GenerateBoxImageInput - The input type for the generateBoxImage function.
 * - GenerateBoxImageOutput - The return type for the generateBoxImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBoxImageInputSchema = z.object({
  boxName: z
    .string()
    .describe('The name of the veggie box, e.g., "Essentials Box".'),
  description: z
    .string()
    .describe('A short description of the box contents.'),
});
export type GenerateBoxImageInput = z.infer<
  typeof GenerateBoxImageInputSchema
>;

const GenerateBoxImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateBoxImageOutput = z.infer<
  typeof GenerateBoxImageOutputSchema
>;

export async function generateBoxImage(
  input: GenerateBoxImageInput
): Promise<GenerateBoxImageOutput> {
  return generateBoxImageFlow(input);
}

const generateBoxImageFlow = ai.defineFlow(
  {
    name: 'generateBoxImageFlow',
    inputSchema: GenerateBoxImageInputSchema,
    outputSchema: GenerateBoxImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A high-quality, vibrant photograph of a rustic wicker basket filled with fresh, colorful seasonal vegetables, corresponding to the "${input.boxName}". The vegetables should look appealing and farm-fresh. The basket has a small, charming wooden tag attached with the brand "Shepherd Herder" elegantly engraved on it. The background is a clean, bright, out-of-focus rustic kitchen or farm setting, with natural light.`,
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    if (!media) {
      throw new Error('Image generation failed.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
