import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {AppSidebar} from "@/features/app-sidebar";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("UserProfile", () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("fetches and displays the user data", async () => {
        render(<AppSidebar places={} />);
        await waitFor(() => {
            expect(screen.getByText(/john@gmail.com/i)).toBeInTheDocument();
        });
    });
});