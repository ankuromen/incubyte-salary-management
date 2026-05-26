import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { COUNTRIES } from "../../constants/employee-options";
import { SelectWithOther } from "./SelectWithOther";

describe("SelectWithOther", () => {
  it("filters options while searching", async () => {
    const user = userEvent.setup();

    render(
      <SelectWithOther
        ariaLabel="Country"
        label="Country"
        options={COUNTRIES}
        value=""
        onChange={vi.fn()}
      />
    );

    const combobox = screen.getByRole("combobox", { name: "Country" });
    await user.click(combobox);
    await user.type(combobox, "uni");

    expect(screen.getByRole("option", { name: "United Kingdom" })).toBeTruthy();
    expect(screen.queryByRole("option", { name: "India" })).toBeNull();
  });

  it("selects an option from the searchable list", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SelectWithOther
        ariaLabel="Country"
        label="Country"
        options={COUNTRIES}
        value=""
        onChange={onChange}
      />
    );

    await user.click(screen.getByRole("combobox", { name: "Country" }));
    await user.click(screen.getByRole("option", { name: "India" }));

    expect(onChange).toHaveBeenCalledWith("India");
  });

  it("shows manual input when Other is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SelectWithOther
        ariaLabel="Country"
        label="Country"
        options={COUNTRIES}
        value=""
        onChange={onChange}
      />
    );

    await user.click(screen.getByRole("combobox", { name: "Country" }));
    await user.click(screen.getByRole("option", { name: "Other (type manually)" }));

    expect(screen.getByLabelText("Country other")).toBeTruthy();
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("emits custom value from manual input", async () => {
    const user = userEvent.setup();

    const Controlled = () => {
      const [value, setValue] = useState("");
      return (
        <SelectWithOther
          ariaLabel="Country"
          label="Country"
          options={COUNTRIES}
          value={value}
          onChange={setValue}
        />
      );
    };

    render(<Controlled />);

    await user.click(screen.getByRole("combobox", { name: "Country" }));
    await user.click(screen.getByRole("option", { name: "Other (type manually)" }));
    await user.type(screen.getByLabelText("Country other"), "Brazil");

    expect(screen.getByLabelText("Country other")).toHaveValue("Brazil");
  });

  it("shows manual input for values not in the list", () => {
    render(
      <SelectWithOther
        ariaLabel="Country"
        label="Country"
        options={COUNTRIES}
        value="Brazil"
        onChange={vi.fn()}
      />
    );

    expect(screen.getByLabelText("Country other")).toHaveValue("Brazil");
  });
});
