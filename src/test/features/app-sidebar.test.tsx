import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {AppSidebar} from "@/features/app-sidebar";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import {mockPlace1, mockPlace2} from "./../mock-data";
import {SidebarProvider} from "@/components/ui/sidebar";

describe("AppSidebar", () => {
    beforeEach(() => {
        global.fetch = vi.fn();

       
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
        render(<SidebarProvider><AppSidebar places={[mockPlace1, mockPlace2]} /></SidebarProvider>);
        await waitFor(() => {
            expect(screen.getByText("Place 1")).toBeInTheDocument();
            expect(screen.getByText("Place 2")).toBeInTheDocument();
        });
    });
});