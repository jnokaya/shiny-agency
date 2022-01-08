import Card from "./Card"
import { ThemeProvider } from "../../utils/context"
import { render, screen, fireEvent } from "@testing-library/react"

describe(`Card`, () => {
    
    it('Should use the picture in props', async () => {
        render(
            <ThemeProvider>
                <Card
                    title="Harry Potter"
                    label="Magicien frontend"
                    picture="/asset/profile.png"
                />
            </ThemeProvider>
        )
        const cardImage = screen.getByRole('img')
        expect(cardImage.src).toBe('http://localhost/asset/profile.png')

        const cardTitle = screen.getByText(/Harry/i)
        expect(cardTitle.textContent).toBe("Harry Potter")
    })
    it('Should add stars around title', async () => {
        render(
            <ThemeProvider>
                <Card
                    title="Harry Potter"
                    label="Magicien frontend"
                    picture="/asset/profile.png"
                />
            </ThemeProvider>
        )
        const cardTitle = screen.getByText(/Harry/i)
        const parentNode = cardTitle.closest('div')
        fireEvent.click(parentNode)
        expect(cardTitle.textContent).toBe('Harry Potter')
    })
})