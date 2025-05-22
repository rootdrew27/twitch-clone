'use server';

import { revalidatePath } from 'next/cache';

import {
  S3Client,
  PutObjectCommand,
  NoSuchKey,
  S3ServiceException,
} from '@aws-sdk/client-s3';

import { getSelf } from '@/lib/auth-service';

const BUCKET_NAME = 'twitch-clone-thumbnail-bucket';
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const updateThumbnail = async (thumbnailFile: File) => {
  try {
    if (!ALLOWED_MIME_TYPES.includes(thumbnailFile.type)) {
      throw new Error(
        `Invalid File type. Please use: ${ALLOWED_MIME_TYPES.join(', or ')}`
      );
    }

    const self = await getSelf();

    if (!self) {
      throw new Error('Unauthorized!');
    }

    // open db connection
    const s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
      },
    });

    const contentType = thumbnailFile.type;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${self.id}`,
      Body: await thumbnailFile.bytes(),
      ContentType: contentType,
    });

    try {
      await s3Client.send(command);
    } catch (error) {
      if (error instanceof NoSuchKey) {
        console.error(
          `Error from S3 while updating object "${self.id}" from "${BUCKET_NAME}". No such key exists.`
        );
      } else if (error instanceof S3ServiceException) {
        console.error(
          `Error from S3 while updating object from ${BUCKET_NAME}.  ${error.name}: ${error.message}`
        );
      } else {
        throw error;
      }
    } finally {
      s3Client.destroy();
    }

    revalidatePath('/');
    revalidatePath('/(dashboard)/');
  } catch (error) {
    throw error;
  }
};
