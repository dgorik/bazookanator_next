import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '@/src/components/auth/LoginForm'
import { login } from '@/src/app/api/auth/login/actions'
import '@testing-library/jest-dom'

//here we are mocking the login action
jest.mock('@/src/app/api/auth/login/actions', () => ({
  login: jest.fn(),
}))

//here we are mocking the next/navigation module
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
  })),
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}))

//describe create a test suite (names "LoginForm - Vulnerability Tests" in this case)
describe('LoginForm - Vulnerability Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  //this line ensures that after each test the mocks are cleared to avoid interference between tests
  //beforeEach(() runs before each test in the suite

  describe('Input Validation', () => {
    it('should render email and password inputs', () => {
      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )
      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
    })

    it('should require email field', () => {
      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)
      expect(emailInput).toBeRequired()
    })

    it('should require password field', () => {
      render(<LoginForm />)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )
      expect(passwordInput).toBeRequired()
    })

    it('should have email type for email input', () => {
      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)
      expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('should have password type for password input', () => {
      render(<LoginForm />)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )
      expect(passwordInput).toHaveAttribute('type', 'password')
    })
  })

  describe('User Interaction', () => {
    it('should update email input value when user types', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)

      await user.type(emailInput, 'test@bazooka-inc.com')
      expect(emailInput).toHaveValue('test@bazooka-inc.com')
    })

    it('should update password input value when user types', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )

      await user.type(passwordInput, 'password123')
      expect(passwordInput).toHaveValue('password123')
    })
  })

  describe('Form Submission', () => {
    it('should call login action with correct credentials on submit', async () => {
      const user = userEvent.setup()
      ;(login as jest.Mock).mockResolvedValue({ message: 'Success' })

      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )
      const submitButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(login).toHaveBeenCalledWith({
          email: 'test@bazooka-inc.com',
          password: 'password123',
        })
      })
    })

    it('should redirect to /analytics on successful login', async () => {
      const user = userEvent.setup()
      ;(login as jest.Mock).mockResolvedValue({ message: 'Success' })

      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )
      const submitButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/analytics')
      })
    })

    it('should display error message on failed login', async () => {
      const user = userEvent.setup()
      ;(login as jest.Mock).mockResolvedValue({
        error: 'Invalid credentials',
      })

      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )
      const submitButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
      })
    })

    it('should display error message when login throws exception', async () => {
      const user = userEvent.setup()
      ;(login as jest.Mock).mockRejectedValue(new Error('Network error'))

      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )
      const submitButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument()
      })
    })

    it('should show loading state during form submission', async () => {
      const user = userEvent.setup()
      ;(login as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      )

      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )
      const submitButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('Security & XSS Prevention', () => {
    it('should not execute script tags in error messages', async () => {
      const user = userEvent.setup()
      const maliciousError = '<script>alert("XSS")</script>'
      ;(login as jest.Mock).mockResolvedValue({ error: maliciousError })

      render(<LoginForm />)
      const emailInput = screen.getByPlaceholderText(/@bazooka-inc.com/i)
      const passwordInput = screen.getByPlaceholderText(
        /enter your password.../i,
      )
      const submitButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, 'test@bazooka-inc.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        const errorElement = screen.getByText(maliciousError)
        expect(errorElement.innerHTML).not.toContain('<script>')
      })
    })
  })

  describe('Navigation Links', () => {
    it('should have link to signup page', () => {
      render(<LoginForm />)
      const signupLink = screen.getByRole('link', { name: /sign up/i })
      expect(signupLink).toHaveAttribute('href', '/auth/signup')
    })

    it('should have link to forgot password page', () => {
      render(<LoginForm />)
      const forgotPasswordLink = screen.getByRole('link', {
        name: /forgot password/i,
      })
      expect(forgotPasswordLink).toHaveAttribute(
        'href',
        '/auth/forgot-password',
      )
    })
  })

  describe('URL Query Parameters', () => {
    it('should display success message from URL params', () => {
      const mockSearchParams = jest.fn((key) =>
        key === 'success' ? 'Password reset successful' : null,
      )
      jest
        .spyOn(require('next/navigation'), 'useSearchParams')
        .mockReturnValue({
          get: mockSearchParams,
        })

      render(<LoginForm />)
      expect(screen.getByText('Password reset successful')).toBeInTheDocument()
    })

    it('should display error message from URL params', () => {
      const mockSearchParams = jest.fn((key) =>
        key === 'error' ? 'Session expired' : null,
      )
      jest
        .spyOn(require('next/navigation'), 'useSearchParams')
        .mockReturnValue({
          get: mockSearchParams,
        })

      render(<LoginForm />)
      expect(screen.getByText('Session expired')).toBeInTheDocument()
    })
  })
})
