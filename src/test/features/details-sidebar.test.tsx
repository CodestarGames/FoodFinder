import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { mockPlaceDetails} from "./../mock-data";
import {SidebarProvider} from "@/components/ui/sidebar";
import {DetailsSidebar} from "@/features/details-sidebar";
import {setupIntersectionObserverMock} from "@/test/setup";

describe("DetailsSidebar", () => {
    beforeEach(() => {
        global.fetch = vi.fn();
        setupIntersectionObserverMock()

        // Mock the ResizeObserver
        const ResizeObserverMock = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        // Stub the global ResizeObserver
        vi.stubGlobal('ResizeObserver', ResizeObserverMock);

        vi.mock('@tanstack/react-router', () => ({
            useNavigate: () => {},
            useLoaderDeps: () => ({keywords:"", sortBy:"RELEVANCE", lucky:false}),
            useSearch: () => ({keywords:"", sortBy:"RELEVANCE", lucky:false}),
        }));

    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("displays the data", async () => {
        render(<SidebarProvider><DetailsSidebar place={mockPlaceDetails} /></SidebarProvider>);
        await waitFor(() => {
            expect(screen.getByText("Place details 1")).toBeInTheDocument();
        });
    });
});