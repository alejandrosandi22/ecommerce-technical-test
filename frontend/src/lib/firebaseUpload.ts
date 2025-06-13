import { getDownloadURL, ref, storage, uploadBytes } from '@/lib/firebase';

export const uploadImageToFirebase = async (file: File): Promise<string> => {
  const uniqueFileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `images/products/${uniqueFileName}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
