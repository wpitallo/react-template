import { render, fireEvent, screen } from '@testing-library/react'
import UserProfilePhotoUpload from './UserProfilePhotoUpload'

describe('UserProfilePhotoUpload', () => {
  test('renders upload and take photo buttons', () => {
    render(<UserProfilePhotoUpload onPhotoUpload={() => {}} />)
    expect(screen.getByText(/upload photo/i)).toBeInTheDocument()
    expect(screen.getByText(/take photo/i)).toBeInTheDocument()
  })

  test('uploads a photo from file input', () => {
    const onPhotoUpload = jest.fn()
    render(<UserProfilePhotoUpload onPhotoUpload={onPhotoUpload} />)

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    })
    const input = screen.getByRole('button', { name: /upload photo/i })

    fireEvent.click(input)
    fireEvent.change(screen.getByLabelText('inputFile'), {
      target: { files: [file] },
    })

    expect(onPhotoUpload).toHaveBeenCalled()
  })
})
