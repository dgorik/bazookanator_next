import { render, screen } from '@testing-library/react'
import LoginForm from '@/src/app/auth/login/components/LoginForm'

jest.mock('@/src/app/api/auth/login/actions', () => ({
  login: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}))

describe('LoginForm', () => {
  it('should render an input element', () => {
    render(<LoginForm />)
    const inputElementEmail = screen.getByPlaceholderText(/@bazooka-inc.com/i)
    const inputElementPassword = screen.getByPlaceholderText(
      /enter your password.../i,
    )
    expect(inputElementEmail).toBeInTheDocument()
    expect(inputElementPassword).toBeInTheDocument()
  })
})
