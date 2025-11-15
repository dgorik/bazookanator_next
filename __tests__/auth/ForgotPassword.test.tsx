import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgotPasswordForm from '@/src/components/auth/ForgotPassword'
import { resetPassword } from '@/src/app/api/auth/reset-password/actions'
import '@testing-library/jest-dom'

jest.mock('@/src/app/api/auth/reset-password/actions', () => ({
  resetPassword: jest.fn(),
}))

describe('ForgotPasswordForm - Vulnerability Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Input Validation', () => {
    it('should render email input', () => {
      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toBeInTheDocument()
    })

    it('should require email field', () => {
      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toBeRequired()
    })

    it('should have email type for email input', () => {
      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toHaveAttribute('type', 'email')
    })
  })

  describe('User Interaction', () => {
    it('should update email input value when user types', async () => {
      const user = userEvent.setup()
      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)

      await user.type(emailInput, 'test@bazooka-inc.com')
      expect(emailInput).toHaveValue('test@bazooka-inc.com')
    })
  })

  describe('Client-Side Validation', () => {
    it('should show error when email is missing on submit', async () => {
      const user = userEvent.setup()
      render(<ForgotPasswordForm />)
      const form = screen.getByRole('form')
      form.setAttribute('novalidate', 'true')
      const submitButton = screen.getByRole('button', { name: /reset/i })
      await user.click(submitButton)

      expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    })

    it('should not call resetPassword when email is missing', async () => {
      const user = userEvent.setup()
      render(<ForgotPasswordForm />)
      const submitButton = screen.getByRole('button', { name: /reset/i })

      await user.click(submitButton)

      expect(resetPassword).not.toHaveBeenCalled()
    })
  })

  describe('Form Submission', () => {
    it('should call resetPassword with correct email on valid submit', async () => {
      const user = userEvent.setup()
      ;(resetPassword as jest.Mock).mockResolvedValue({ success: true })

      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /reset/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(resetPassword).toHaveBeenCalledWith({
          email: 'test@bazooka-inc.com',
        })
      })
    })

    it('should display success message after successful reset request', async () => {
      const user = userEvent.setup()
      ;(resetPassword as jest.Mock).mockResolvedValue({ success: true })

      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /reset/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.click(submitButton)

      expect(
        await screen.findByText(
          'If the email exists, a reset link has been sent.',
        ),
      ).toBeInTheDocument()
    })

    it('should display error message on failed reset request', async () => {
      const user = userEvent.setup()
      ;(resetPassword as jest.Mock).mockResolvedValue({
        error: 'Service unavailable',
      })

      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /reset/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Service unavailable')).toBeInTheDocument()
      })
    })

    it('should handle network errors gracefully', async () => {
      const user = userEvent.setup()
      ;(resetPassword as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      )

      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /reset/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument()
      })
    })
  })

  describe('Security & Privacy', () => {
    it('should show generic success message to prevent email enumeration', async () => {
      const user = userEvent.setup()
      ;(resetPassword as jest.Mock).mockResolvedValue({ success: true })

      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /reset/i })

      await user.type(emailInput, 'nonexistent@bazooka-inc.com')
      await user.click(submitButton)

      await waitFor(() => {
        const successMessage = screen.getByText(
          /If the email exists, a reset link has been sent/i,
        )
        expect(successMessage).toBeInTheDocument()
      })
    })

    it('should not execute script tags in error messages', async () => {
      const user = userEvent.setup()
      const maliciousError = '<script>alert("XSS")</script>'
      ;(resetPassword as jest.Mock).mockResolvedValue({ error: maliciousError })

      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /reset/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.click(submitButton)

      await waitFor(() => {
        const errorElement = screen.getByText(maliciousError)
        expect(errorElement.innerHTML).not.toContain('<script>')
      })
    })
  })

  describe('Status Management', () => {
    it('should clear previous status before new submission', async () => {
      const user = userEvent.setup()
      ;(resetPassword as jest.Mock)
        .mockResolvedValueOnce({ error: 'First error' })
        .mockResolvedValueOnce({ success: true })

      render(<ForgotPasswordForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /reset/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('First error')).toBeInTheDocument()
      })

      await user.clear(emailInput)
      await user.type(emailInput, 'another@bazooka-inc.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.queryByText('First error')).not.toBeInTheDocument()
        expect(
          screen.getByText('If the email exists, a reset link has been sent.'),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    const emailFormats = [
      'user@bazooka-inc.com',
      'user.name@bazooka-inc.com',
      'user+tag@bazooka-inc.com',
      'user_123@bazooka-inc.com',
    ]

    test.each(emailFormats)('should handle email format: %s', async (email) => {
      const user = userEvent.setup()
      ;(resetPassword as jest.Mock).mockResolvedValue({ success: true })

      render(<ForgotPasswordForm />)

      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /reset/i })
      await user.type(emailInput, email)
      await user.click(submitButton)

      expect(resetPassword).toHaveBeenCalledWith({ email })
    })
  })

  it('should trim whitespace from email input', async () => {
    const user = userEvent.setup()
    ;(resetPassword as jest.Mock).mockResolvedValue({ success: true })

    render(<ForgotPasswordForm />)
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /reset/i })

    await user.type(emailInput, '  test@bazooka-inc.com  ')

    expect(emailInput).toHaveValue('test@bazooka-inc.com')
  })
})

describe('Multiple Submissions', () => {
  it('should allow multiple reset requests', async () => {
    const user = userEvent.setup()
    ;(resetPassword as jest.Mock).mockResolvedValue({ success: true })

    render(<ForgotPasswordForm />)
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /reset/i })

    await user.type(emailInput, 'test1@bazooka-inc.com')
    await user.click(submitButton)

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledTimes(1)
    })

    await user.clear(emailInput)
    await user.type(emailInput, 'test2@bazooka-inc.com')
    await user.click(submitButton)

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledTimes(2)
    })
  })
})
