import { render, screen } from "@testing-library/react";
import App from "../frontend/src/App";

test("renders dashboard", () => {
  render(<App />);
  const text = screen.getByText(/Dashboard/i);
  expect(text).toBeInTheDocument();
});