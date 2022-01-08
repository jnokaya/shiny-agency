import Footer from './'
import { fireEvent, screen } from '@testing-library/react'
import { render } from '../../utils/test'

describe('Footer', () => {
    it('Should render without crashing', async () => {
        render(<Footer />)
    })
    it('Change theme', async () => {
        render(<Footer />)
        const nightModeButton = screen.getByRole('button')
        expect(nightModeButton.textContent).toMatch(`nuit`)
        fireEvent.click(nightModeButton)
        expect(nightModeButton.textContent).toMatch(`jour`)
    })
})