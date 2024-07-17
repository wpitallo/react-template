import UserProfilePhotoUpload from './UserProfilePhotoUpload'

export default {
  title: 'UserProfilePhotoUpload',
  component: UserProfilePhotoUpload,
}

export const Default = () => <UserProfilePhotoUpload onPhotoUpload={(base64) => console.log(base64)} />
