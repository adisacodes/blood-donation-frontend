import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, test, expect, beforeEach } from "vitest"
import DonorList from "../DonorList"

vi.mock("../../components/Navbar", () => ({
    default: () => <div data-testid="mock-navbar">Navbar</div>
}))

const mockDonors = [
    { name: "Prince", blood_type: "O+", location: "Nairobi", is_logged_in: true },
    { name: "Marie", blood_type: "A-", location: "Nairobi", is_logged_in: false }
]

beforeEach(() => {
    global.fetch = vi.fn()
})

test("renders donor cards and correctly displays availability status", async () => {
    global.fetch.mockResolvedValueOnce({
        json: async () => mockDonors,
    })

    render(<DonorList />)

    await waitFor(() => {
        expect(screen.getByText("Prince")).toBeInTheDocument()
    })

    expect(screen.getByText("Marie")).toBeInTheDocument()

    const princeCard = screen.getByText("Prince").closest('div')

    expect(princeCard).toHaveTextContent("Available")


    const marieCard = screen.getByText("Marie").closest('div')

    expect(marieCard).toHaveTextContent("Not Available")
})

test("filters donor cards based on blood type search input", async () => {
    global.fetch.mockResolvedValueOnce({
        json: async () => mockDonors,
    })

    render(<DonorList />)

    await waitFor(() => expect(screen.getByText("Prince")).toBeInTheDocument())

    const searchInput = screen.getByPlaceholderText("Search by blood type e.g O+")
    await userEvent.type(searchInput, "O+")

    expect(screen.getByText("Prince")).toBeInTheDocument()
    expect(screen.queryByText("Marie")).not.toBeInTheDocument()
})