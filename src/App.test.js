import axios from "axios";
import { render, screen, waitFor, act } from "@testing-library/react";
import renderer from "react-test-renderer";

import App from "./App";

jest.mock("axios");

const fakeUsers = [
  {
    id: 1,
    name: "Test User 1",
    username: "testuser1"
  },
  {
    id: 2,
    name: "Test User 2",
    username: "testuser2"
  }
];

describe("App component", () => {
  beforeEach(async () => {
    axios.get.mockResolvedValue({ data: fakeUsers });
  });

  test("it renders", async () => {
    // axios.get.mockResolvedValue({ data: fakeUsers });
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText("Users:")).toBeInTheDocument();
  });

  test("it displays a list of users", async () => {
    // axios.get.mockResolvedValue({ data: fakeUsers });
    await act(async () => {
      render(<App />);
    });

    const userList = await waitFor(() => screen.findByTestId("user-list"));
    expect(userList).toBeInTheDocument();
  });

  test("it displays a row for each user", async () => {
    // axios.get.mockResolvedValue({ data: fakeUsers });
    await act(async () => {
      render(<App />);
    });

    const userList = await waitFor(() => screen.findAllByTestId("user-item"));
    expect(userList).toHaveLength(2);
  });

  test("it renders a correct snapshot", async () => {
    axios.get.mockResolvedValue({ data: fakeUsers });
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
