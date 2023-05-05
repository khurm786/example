import { render, screen } from '@testing-library/react'

import SimpleButton from './SimpleButton'

describe('SimpleButton', () => {
  it('renders button', () => {
    const { getByText } = render(<SimpleButton text="React" testId="btn" />)

    const button = screen.getByTestId('btn')
    expect(button).toBeVisible()
    expect(getByText('React')).toBeInTheDocument()
  })
})
