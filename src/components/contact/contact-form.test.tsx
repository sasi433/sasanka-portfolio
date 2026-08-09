import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ContactForm,
  TurnstileWidget,
} from "@/components/contact/contact-form";

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("next/script", () => ({
  default: ({ onReady }: { onReady?: () => void }) => (
    <button type="button" onClick={onReady}>
      Load challenge
    </button>
  ),
}));

afterEach(() => {
  delete window.turnstile;
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("TurnstileWidget", () => {
  it("renders explicitly, manages tokens, and removes its widget", async () => {
    const user = userEvent.setup();
    const onToken = vi.fn();
    const renderWidget = vi.fn().mockReturnValue("widget-1");
    const removeWidget = vi.fn();
    window.turnstile = {
      render: renderWidget,
      remove: removeWidget,
      reset: vi.fn(),
    };

    const view = render(
      <TurnstileWidget siteKey="test-site-key" onToken={onToken} />,
    );
    await user.click(screen.getByRole("button", { name: "Load challenge" }));

    await waitFor(() => expect(renderWidget).toHaveBeenCalledOnce());
    expect(renderWidget.mock.calls[0][1].sitekey).toBe("test-site-key");

    act(() => renderWidget.mock.calls[0][1].callback("verified-token"));
    expect(onToken).toHaveBeenLastCalledWith("verified-token");

    act(() => renderWidget.mock.calls[0][1]["expired-callback"]());
    expect(onToken).toHaveBeenLastCalledWith("");

    view.unmount();
    expect(removeWidget).toHaveBeenCalledWith("widget-1");
  });

  it("shows a safe fallback and resets the challenge after a network failure", async () => {
    const user = userEvent.setup();
    const renderWidget = vi.fn().mockReturnValue("widget-2");
    const resetWidget = vi.fn();
    window.turnstile = {
      render: renderWidget,
      remove: vi.fn(),
      reset: resetWidget,
    };
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    render(<ContactForm turnstileSiteKey="test-site-key" />);
    await user.click(screen.getByRole("button", { name: "Load challenge" }));
    await waitFor(() => expect(renderWidget).toHaveBeenCalledOnce());
    act(() => renderWidget.mock.calls[0][1].callback("verified-token"));

    await user.type(screen.getByLabelText("Name"), "Test Sender");
    await user.type(screen.getByLabelText("Email"), "sender@example.com");
    await user.type(screen.getByLabelText("Subject"), "Portfolio message");
    await user.type(
      screen.getByLabelText("Message"),
      "This is a sufficiently detailed test message.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(
      await screen.findByText(
        "The message could not be sent. Please try again or use the email link below.",
      ),
    ).toHaveAttribute("role", "alert");
    expect(resetWidget).toHaveBeenCalledOnce();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
