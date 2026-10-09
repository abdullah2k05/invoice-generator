import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import CustomNumberInput from "@/app/component/ui/customNumberInput";

const renderNumeric = (initial = "") => {
  localStorage.clear();
  localStorage.setItem("discount", initial);
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({ defaultValues: { discount: initial } });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  render(
    <Wrapper>
      <CustomNumberInput label="Discount" placeholder="$0" variableName="discount" numeric />
    </Wrapper>
  );
  return screen.getByLabelText("Discount") as HTMLInputElement;
};

beforeEach(() => {
  localStorage.clear();
});

describe("CustomNumberInput numeric mode (VAL-001)", () => {
  it("accepts plain numbers and decimals", async () => {
    const user = userEvent.setup();
    const input = renderNumeric();
    await user.type(input, "12");
    expect(input).toHaveValue("12");
    await user.type(input, ".5");
    expect(input).toHaveValue("12.5");
    expect(localStorage.getItem("discount")).toBe("12.5");
  });

  it("rejects abc — value does not propagate", async () => {
    const user = userEvent.setup();
    const input = renderNumeric("10");
    await user.type(input, "abc");
    expect(input).toHaveValue("10");
    expect(localStorage.getItem("discount")).toBe("10");
  });

  it("rejects a second dot while typing 1.2.3", async () => {
    const user = userEvent.setup();
    const input = renderNumeric();
    await user.type(input, "1.2");
    await user.type(input, ".");
    expect(input).toHaveValue("1.2"); // the stray "." never lands
    await user.type(input, "3");
    expect(input).toHaveValue("1.23");
    expect(localStorage.getItem("discount")).toBe("1.23");
  });

  it("rejects a lone minus sign", async () => {
    const user = userEvent.setup();
    const input = renderNumeric("5");
    await user.type(input, "-");
    expect(input).toHaveValue("5");
  });

  it("rejects a lone dot (legacy wrote NaN via +'.')", async () => {
    const user = userEvent.setup();
    const input = renderNumeric("");
    await user.type(input, ".");
    expect(input).toHaveValue(""); // "." alone never lands
    expect(localStorage.getItem("discount")).toBe("");
  });

  it("allows empty input (module treats it as 0)", async () => {
    const user = userEvent.setup();
    const input = renderNumeric("9");
    await user.clear(input);
    expect(input).toHaveValue("");
    expect(localStorage.getItem("discount")).toBe("");
  });

  it("accepts 0", async () => {
    const user = userEvent.setup();
    const input = renderNumeric("4");
    await user.clear(input);
    await user.type(input, "0");
    expect(input).toHaveValue("0");
  });

  it("rejects pasted 1e5 scientific notation", async () => {
    const user = userEvent.setup();
    const input = renderNumeric("3");
    await user.click(input);
    await user.paste("1e5");
    expect(input).toHaveValue("3");
    expect(localStorage.getItem("discount")).toBe("3");
  });

  it("accepts pasted plain decimal", async () => {
    const user = userEvent.setup();
    const input = renderNumeric();
    await user.click(input);
    await user.paste("1234.56");
    expect(input).toHaveValue("1234.56");
  });

  it("accepts very large numbers (money module uses BigInt)", async () => {
    const user = userEvent.setup();
    const input = renderNumeric();
    const big = "999999999999999999999999";
    await user.click(input);
    await user.paste(big);
    expect(input).toHaveValue(big);
    expect(localStorage.getItem("discount")).toBe(big);
  });

  it("rejects grouped/prefixed pastes (1,000 and $5)", async () => {
    const user = userEvent.setup();
    const input = renderNumeric("1");
    await user.click(input);
    await user.paste("1,000");
    expect(input).toHaveValue("1");
    await user.paste("$5");
    expect(input).toHaveValue("1");
  });
});

describe("CustomNumberInput loose mode (zip fields stay permissive)", () => {
  it("still accepts free text when numeric is not set", async () => {
    localStorage.setItem("companyZip", "");
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({ defaultValues: { companyZip: "" } });
      return <FormProvider {...methods}>{children}</FormProvider>;
    };
    const user = userEvent.setup();
    render(
      <Wrapper>
        <CustomNumberInput label="ZIP" placeholder="00000" variableName="companyZip" />
      </Wrapper>
    );
    const input = screen.getByLabelText("ZIP") as HTMLInputElement;
    await user.type(input, "SW1A");
    expect(input).toHaveValue("SW1A");
    expect(localStorage.getItem("companyZip")).toBe("SW1A");
  });
});
