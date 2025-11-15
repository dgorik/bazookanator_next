import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignupForm from '@/src/components/auth/SignupForm'
import { signup } from '@/src/app/api/auth/signup/actions'
import '@testing-library/jest-dom'

jest.mock('@/src/app/api/auth/signup/actions', () => ({
  signup: jest.fn(),
}))

describe('SignupForm - Vulnerability Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Input Validation', () => {
    it('should render all required input fields', () => {
      render(<SignupForm />)
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    })

    it('should require all input fields', () => {
      render(<SignupForm />)
      expect(screen.getByLabelText(/first name/i)).toBeRequired()
      expect(screen.getByLabelText(/last name/i)).toBeRequired()
      expect(screen.getByLabelText(/email/i)).toBeRequired()
      expect(screen.getByLabelText(/^password$/i)).toBeRequired()
    })

    it('should have correct input types', () => {
      render(<SignupForm />)
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email')
      expect(screen.getByLabelText(/^password$/i)).toHaveAttribute(
        'type',
        'password',
      )
    })
  })

  describe('User Interaction', () => {
    it('should update input values when user types', async () => {
      const user = userEvent.setup()
      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john@bazooka-inc.com')
      await user.type(passwordInput, 'password123')

      expect(firstNameInput).toHaveValue('John')
      expect(lastNameInput).toHaveValue('Doe')
      expect(emailInput).toHaveValue('john@bazooka-inc.com')
      expect(passwordInput).toHaveValue('password123')
    })
  })

  describe('Client-Side Validation', () => {
    it('should show error when email is missing', async () => {
      const user = userEvent.setup()
      render(<SignupForm />)

      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Email is required.')).toBeInTheDocument()
      })
    })

    it('should show error when password is less than 6 characters', async () => {
      const user = userEvent.setup()
      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)
      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john@bazooka-inc.com')
      await user.type(passwordInput, '12345')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 6 characters.'),
        ).toBeInTheDocument()
      })
    })

    it('should not call signup with invalid password length', async () => {
      const user = userEvent.setup()
      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)
      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john@bazooka-inc.com')
      await user.type(passwordInput, '123')
      await user.click(submitButton)

      expect(signup).not.toHaveBeenCalled()
    })
  })

  describe('Form Submission', () => {
    it('should call signup action with correct data on valid submit', async () => {
      const user = userEvent.setup()
      ;(signup as jest.Mock).mockResolvedValue({ success: true })

      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)
      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(signup).toHaveBeenCalledWith({
          email: 'john@bazooka-inc.com',
          password: 'password123',
          first_name: 'John',
          last_name: 'Doe',
        })
      })
    })

    it('should display success message on successful signup', async () => {
      const user = userEvent.setup()
      ;(signup as jest.Mock).mockResolvedValue({ success: true })

      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)
      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(
            /If this email is not registered yet, you'll receive a confirmation email shortly./i,
          ),
        ).toBeInTheDocument()
      })
    })

    it('should clear form fields after successful signup', async () => {
      const user = userEvent.setup()
      ;(signup as jest.Mock).mockResolvedValue({ success: true })

      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)
      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(firstNameInput).toHaveValue('')
        expect(lastNameInput).toHaveValue('')
        expect(emailInput).toHaveValue('')
        expect(passwordInput).toHaveValue('')
      })
    })

    it('should display error message on failed signup', async () => {
      const user = userEvent.setup()
      ;(signup as jest.Mock).mockResolvedValue({
        error: 'Email already exists',
      })

      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)
      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'existing@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument()
      })
    })

    it('should handle network errors gracefully', async () => {
      const user = userEvent.setup()
      ;(signup as jest.Mock).mockRejectedValue(new Error('Network error'))

      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)
      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument()
      })
    })
  })

  describe('Loading State', () => {
    it('should show loading state during submission', async () => {
      const user = userEvent.setup()
      ;(signup as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      )

      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)
      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('Security & XSS Prevention', () => {
    it('should not execute script tags in error messages', async () => {
      const user = userEvent.setup()
      const maliciousError = '<script>alert("XSS")</script>'
      ;(signup as jest.Mock).mockResolvedValue({ error: maliciousError })

      render(<SignupForm />)

      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/^password$/i)
      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      })

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        const errorElement = screen.getByText(maliciousError)
        expect(errorElement.innerHTML).not.toContain('<script>')
      })
    })
  })
})
