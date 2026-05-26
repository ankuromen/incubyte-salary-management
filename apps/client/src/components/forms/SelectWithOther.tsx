import { useEffect, useId, useRef, useState } from "react";
import { isListedOption } from "../../constants/employee-options";
import { cn } from "../../lib/cn";
import { inputClassName, labelClassName } from "../ui/Input";

const OTHER_LABEL = "Other (type manually)";

type SelectWithOtherProps = {
  label: string;
  ariaLabel: string;
  options: readonly string[];
  value: string;
  error?: string;
  otherPlaceholder?: string;
  onChange: (value: string) => void;
};

export const SelectWithOther = ({
  label,
  ariaLabel,
  options,
  value,
  error,
  otherPlaceholder,
  onChange
}: SelectWithOtherProps) => {
  const listboxId = useId();
  const otherInputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOther, setIsOther] = useState(() => Boolean(value) && !isListedOption(value, options));
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsOther(Boolean(value) && !isListedOption(value, options));
  }, [value, options]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(normalizedSearch)
  );
  const showOtherOption =
    normalizedSearch.length === 0 || OTHER_LABEL.toLowerCase().includes(normalizedSearch);

  const selectOption = (option: string) => {
    setIsOther(false);
    onChange(option);
    setIsOpen(false);
    setSearch("");
  };

  const selectOther = () => {
    setIsOther(true);
    onChange("");
    setIsOpen(false);
    setSearch("");
  };

  if (isOther) {
    return (
      <div ref={containerRef}>
        <label className={labelClassName} htmlFor={otherInputId}>
          {label}
        </label>
        <input
          aria-label={`${ariaLabel} other`}
          className={inputClassName}
          id={otherInputId}
          placeholder={otherPlaceholder ?? `Enter ${label.toLowerCase()}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          type="button"
          onClick={() => {
            setIsOther(false);
            onChange("");
          }}
        >
          ← Back to list
        </button>
        {error ? <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p> : null}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <label className={labelClassName} htmlFor={listboxId}>
        {label}
      </label>
      <input
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={inputClassName}
        id={listboxId}
        placeholder={`Search ${label.toLowerCase()}…`}
        role="combobox"
        value={isOpen ? search : value}
        onChange={(event) => {
          setSearch(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
          setSearch(value);
        }}
      />

      {isOpen ? (
        <ul
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-elevated"
          id={`${listboxId}-options`}
          role="listbox"
        >
          {filteredOptions.length === 0 ? (
            <li className="px-4 py-2 text-sm text-slate-500">No matches found</li>
          ) : (
            filteredOptions.map((option) => (
              <li key={option} role="presentation">
                <button
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50",
                    value === option && "bg-indigo-50 font-medium text-indigo-700"
                  )}
                  role="option"
                  type="button"
                  aria-selected={value === option}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                >
                  {option}
                </button>
              </li>
            ))
          )}
          {showOtherOption ? (
            <li className="border-t border-slate-100" role="presentation">
              <button
                className="w-full px-4 py-2 text-left text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                role="option"
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={selectOther}
              >
                {OTHER_LABEL}
              </button>
            </li>
          ) : null}
        </ul>
      ) : null}

      {error ? <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
};
