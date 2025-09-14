import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/src/components/layout/sections/header/Header'
import '@testing-library/jest-dom'

it('Sign In and Sign Up buttons navigate correctly', () => {
  const user = userEvent.setup()

  render(
    <>
      <Header />
    </>,
  )
  const signInLink = screen.getByRole('link', { name: /sign in/i })
  const signUpLink = screen.getByRole('link', { name: /sign up/i })

  expect(signInLink).toHaveAttribute('href', '/auth/login')
  expect(signUpLink).toHaveAttribute('href', '/auth/signup')
})
