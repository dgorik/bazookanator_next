import { render, screen } from '@testing-library/react'
import Header from '@/src/components/layout/sections/header/Header'
import '@testing-library/jest-dom'

it('Sign In and Sign Up buttons work', () => {
  render(<Header />)
  const signInLink = screen.getByRole('link', { name: /sign in/i })
  const signUpLink = screen.getByRole('link', { name: /sign up/i })

  expect(signInLink).toBeInTheDocument()
  expect(signUpLink).toBeInTheDocument()
})
