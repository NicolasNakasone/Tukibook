import { UploadApiResponse } from 'cloudinary'
import { cloudinary } from 'src/cloudinary'
import { IUser } from 'src/models/User'

interface UploadAvatarToCloudinaryProps {
  currentImage?: IUser['avatar']
  newFile?: Express.Multer.File
}

export const uploadAvatarToCloudinary = async ({
  currentImage,
  newFile,
}: UploadAvatarToCloudinaryProps): Promise<IUser['avatar']> => {
  if (!newFile) return currentImage

  let updatedAvatar: IUser['avatar'] = currentImage
  const buffer = newFile.buffer

  const uploadResult: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: 'Tukibook/users', resource_type: 'image', format: 'webp' },
        (err, result) => {
          if (err) reject(err)
          else resolve(result)
        }
      )
      .end(buffer)
  })

  updatedAvatar = {
    url: uploadResult?.secure_url || '',
    publicId: uploadResult?.public_id || '',
  }

  if (currentImage?.publicId) await cloudinary.uploader.destroy(currentImage.publicId)

  return updatedAvatar
}
