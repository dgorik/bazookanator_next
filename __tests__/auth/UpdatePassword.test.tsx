import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UpdatePassword from '@/src/components/auth/UpdatePassword'
import { updateUser } from '@/src/app/api/auth/update_user/actions'
import '@testing-library/jest-dom'

jest.mock('@/src/app/api/auth/update_user/actions', () => ({
  updateUser: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
  })),
}))

describe('UpdatePassword - Vulnerability Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Input Validation', () => {
    it('should render password and confirm password inputs', () => {
      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      expect(passwordInputs).toHaveLength(2)
      expect(passwordInputs[0]).toBeInTheDocument()
      expect(passwordInputs[1]).toBeInTheDocument()
    })

    it('should require both password fields', () => {
      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      expect(passwordInputs[0]).toBeRequired()
      expect(passwordInputs[1]).toBeRequired()
    })

    it('should have password type for both inputs', () => {
      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      expect(passwordInputs[0]).toHaveAttribute('type', 'password')
      expect(passwordInputs[1]).toHaveAttribute('type', 'password')
    })
  })

  describe('User Interaction', () => {
    it('should update password input values when user types', async () => {
      const user = userEvent.setup()
      render(<UpdatePassword />)
      const passwordInput = screen.getByLabelText(/Enter Your New Password/i)
      const confirmPasswordInput = screen.getByLabelText(/Confirm your New Password/i)

      await user.type(passwordInput, 'newPassword123')
      await user.type(confirmPasswordInput, 'newPassword123')

      expect(passwordInput).toHaveValue('newPassword123')
      expect(confirmPasswordInput).toHaveValue('newPassword123')
    })

    it('should clear status when typing in password field', async () => {
      const user = userEvent.setup()
      ;(updateUser as jest.Mock).mockResolvedValue({
        error: 'Some error',
      })

      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], 'password123')
      await user.type(passwordInputs[1], 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Some error')).toBeInTheDocument()
      })

      await user.type(passwordInputs[0], '4')

      await waitFor(() => {
        expect(screen.queryByText('Some error')).not.toBeInTheDocument()
      })
    })
  })

  describe('Password Validation', () => {
    it('should show error when passwords do not match', async () => {
      const user = userEvent.setup()
      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], 'password123')
      await user.type(passwordInputs[1], 'differentPassword')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
      })
    })

    it('should show error when password is less than 6 characters', async () => {
      const user = userEvent.setup()
      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], '12345')
      await user.type(passwordInputs[1], '12345')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText('Password should be at least 6 characters long'),
        ).toBeInTheDocument()
      })
    })

    it('should not call updateUser when passwords do not match', async () => {
      const user = userEvent.setup()
      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], 'password123')
      await user.type(passwordInputs[1], 'password456')
      await user.click(submitButton)

      expect(updateUser).not.toHaveBeenCalled()
    })

    it('should not call updateUser when password is too short', async () => {
      const user = userEvent.setup()
      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], '123')
      await user.type(passwordInputs[1], '123')
      await user.click(submitButton)

      expect(updateUser).not.toHaveBeenCalled()
    })
  })

  describe('Form Submission', () => {
    it('should call updateUser with correct password on valid submit', async () => {
      const user = userEvent.setup()
      ;(updateUser as jest.Mock).mockResolvedValue({ success: 'Password updated' })

      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], 'newPassword123')
      await user.type(passwordInputs[1], 'newPassword123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(updateUser).toHaveBeenCalledWith({
          password: 'newPassword123',
        })
      })
    })

    it('should display success message on successful password update', async () => {
      const user = userEvent.setup()
      ;(updateUser as jest.Mock).mockResolvedValue({
        success: 'Password updated successfully',
      })

      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], 'newPassword123')
      await user.type(passwordInputs[1], 'newPassword123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText('Password updated successfully'),
        ).toBeInTheDocument()
      })
    })

    it('should display error message on failed password update', async () => {
      const user = userEvent.setup()
      ;(updateUser as jest.Mock).mockResolvedValue({
        error: 'Update failed',
      })

      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], 'newPassword123')
      await user.type(passwordInputs[1], 'newPassword123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Update failed')).toBeInTheDocument()
      })
    })

    it('should handle exceptions gracefully', async () => {
      const user = userEvent.setup()
      ;(updateUser as jest.Mock).mockRejectedValue(new Error('Network error'))

      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], 'newPassword123')
      await user.type(passwordInputs[1], 'newPassword123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument()
      })
    })
  })

  describe('URL Query Parameters', () => {
    it('should display success message from URL params', () => {
      const mockSearchParams = jest.fn((key) =>
        key === 'success' ? 'Email verified successfully' : null,
      )
      jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
        get: mockSearchParams,
      })

      render(<UpdatePassword />)
      expect(
        screen.getByText('Email verified successfully'),
      ).toBeInTheDocument()
    })
  })

  describe('Security & XSS Prevention', () => {
    it('should not execute script tags in error messages', async () => {
      const user = userEvent.setup()
      const maliciousError = '<script>alert("XSS")</script>'
      ;(updateUser as jest.Mock).mockResolvedValue({ error: maliciousError })

      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], 'newPassword123')
      await user.type(passwordInputs[1], 'newPassword123')
      await user.click(submitButton)

      await waitFor(() => {
        const errorElement = screen.getByText(maliciousError)
        expect(errorElement.innerHTML).not.toContain('<script>')
      })
    })

    it('should not execute script tags in success messages', async () => {
      const user = userEvent.setup()
      const maliciousSuccess = '<img src=x onerror="alert(1)">'
      ;(updateUser as jest.Mock).mockResolvedValue({ success: maliciousSuccess })

      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], 'newPassword123')
      await user.type(passwordInputs[1], 'newPassword123')
      await user.click(submitButton)

      await waitFor(() => {
        const successElement = screen.getByText(maliciousSuccess)
        expect(successElement.innerHTML).not.toContain('<img')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty password submission', async () => {
      const user = userEvent.setup()
      render(<UpdatePassword />)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText('Password should be at least 6 characters long'),
        ).toBeInTheDocument()
      })
    })

    it('should accept exactly 6 character password', async () => {
      const user = userEvent.setup()
      ;(updateUser as jest.Mock).mockResolvedValue({ success: 'Updated' })

      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      await user.type(passwordInputs[0], '123456')
      await user.type(passwordInputs[1], '123456')
      await user.click(submitButton)

      await waitFor(() => {
        expect(updateUser).toHaveBeenCalledWith({ password: '123456' })
      })
    })

    it('should handle very long passwords', async () => {
      const user = userEvent.setup()
      ;(updateUser as jest.Mock).mockResolvedValue({ success: 'Updated' })

      render(<UpdatePassword />)
      const passwordInputs = screen.getAllByLabelText(/password/i)
      const submitButton = screen.getByRole('button', {
        name: /reset password/i,
      })

      const longPassword = 'a'.repeat(100)
      await user.type(passwordInputs[0], longPassword)
      await user.type(passwordInputs[1], longPassword)
      await user.click(submitButton)

      await waitFor(() => {
        expect(updateUser).toHaveBeenCalledWith({ password: longPassword })
      })
    })
  })
})
