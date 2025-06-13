'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { uploadImageToFirebase } from '@/lib/firebaseUpload';
import { showToast } from '@/lib/toast';
import { productFormSchema } from '@/schemas/productSchema';
import Image from 'next/image';

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}

export const ProductForm = ({
  defaultValues,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    defaultValues?.image || null,
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      price: defaultValues?.price || 0,
      image: defaultValues?.image || '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (values: ProductFormValues) => {
    let imageUrl = values.image;

    if (file) {
      const loadingToastId = showToast.loading('Uploading image...');
      try {
        imageUrl = await uploadImageToFirebase(file);
        showToast.dismiss(loadingToastId);
        showToast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        showToast.dismiss(loadingToastId);
        showToast.error('Failed to upload image');
        return;
      }
    }

    const finalValues = { ...values, image: imageUrl };
    onSubmit(finalValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        {/* Name */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Product name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Product description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='0.01'
                  placeholder='0.00'
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === '' ? '' : parseFloat(val));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name='image'
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className='space-y-2'>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                  {preview && (
                    <Image
                      src={preview}
                      alt='Preview'
                      className='max-h-40 rounded border'
                      width={160}
                      height={160}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className='flex gap-2'>
          <Button type='submit'>Save</Button>
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
